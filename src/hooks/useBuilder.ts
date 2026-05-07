'use client'

import { useCallback } from 'react'
import { useBuilderStore } from '@/store/builderStore'
import { extractStateUpdate, generateId, parseGeneratedFiles } from '@/lib/utils'
import { SiteRequirements } from '@/lib/types'

export function useBuilder() {
  const store = useBuilderStore()

  const sendMessage = useCallback(
    async (userText: string) => {
      if (store.isStreaming) return

      // Add user message
      store.addMessage('user', userText)
      store.setStreaming(true)

      // Add empty assistant message (will stream into it)
      store.addMessage('assistant', '')

      // Build message history for API
      const history = store.messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

      // Add the new user message
      history.push({ role: 'user', content: userText })

      // Remove the empty assistant message from history
      const apiMessages = history.filter((m) => m.content.trim() !== '' || m.role === 'user')

      let fullResponse = ''

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        })

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) throw new Error('No response body')

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

          for (const line of lines) {
            const data = JSON.parse(line.slice(6))

            if (data.type === 'text') {
              fullResponse += data.content
              store.updateLastMessage(fullResponse)

              // Check for state updates in the response
              const stateUpdate = extractStateUpdate(fullResponse)
              if (stateUpdate) {
                if (stateUpdate.step) {
                  store.setStep(stateUpdate.step as Parameters<typeof store.setStep>[0])
                }
                if (stateUpdate.requirements) {
                  store.updateRequirements(stateUpdate.requirements as Partial<SiteRequirements>)
                }
                // Trigger code generation when ready
                if (stateUpdate.readyToGenerate && store.generatedFiles.length === 0) {
                  store.setStreamingDone()
                  setTimeout(() => triggerCodeGeneration(), 800)
                  return
                }
              }
            } else if (data.type === 'done') {
              break
            } else if (data.type === 'error') {
              store.updateLastMessage(`抱歉，发生了错误：${data.error}`)
              break
            }
          }
        }
      } catch (err) {
        store.updateLastMessage(`连接错误，请检查 API Key 配置是否正确。`)
      }

      store.setStreamingDone()
    },
    [store]
  )

  const triggerCodeGeneration = useCallback(async () => {
    store.setStep('generating')
    store.setStreaming(true)
    store.addMessage('assistant', '')

    const requirements = store.context.requirements as SiteRequirements

    let fullResponse = ''

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('No response body')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

        for (const line of lines) {
          const data = JSON.parse(line.slice(6))
          if (data.type === 'text') {
            fullResponse += data.content
            store.updateLastMessage(
              `正在生成代码...\n\n\`\`\`\n${fullResponse.slice(-200)}\n\`\`\``
            )
          } else if (data.type === 'done') {
            break
          }
        }
      }

      // Parse generated files
      const files = parseGeneratedFiles(fullResponse)
      if (files.length > 0) {
        store.setGeneratedFiles(files)
        store.setStep('preview')
        store.updateLastMessage(
          `✅ 网站代码已生成完成！共生成 **${files.length} 个文件**。\n\n右侧可以查看完整代码，点击「导出项目」下载源码。\n\n你还可以告诉我需要调整什么，我会帮你修改。`
        )
      } else {
        store.updateLastMessage(
          `代码生成完成！以下是你的网站代码：\n\n${fullResponse}`
        )
        store.setStep('preview')
      }
    } catch (err) {
      store.updateLastMessage(`代码生成失败，请重试。`)
    }

    store.setStreamingDone()
  }, [store])

  return { sendMessage, triggerCodeGeneration }
}
