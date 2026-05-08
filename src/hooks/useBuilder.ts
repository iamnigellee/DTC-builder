'use client'

import { useCallback } from 'react'
import { useBuilderStore } from '@/store/builderStore'
import { extractStateUpdate, parseGeneratedFiles } from '@/lib/utils'
import { SiteRequirements } from '@/lib/types'

export function useBuilder() {
  const store = useBuilderStore()

  const triggerCodeGeneration = useCallback(async () => {
    store.setStep('generating')
    store.setStreaming(true)
    store.addMessage('assistant', '正在生成网站代码...')

    const requirements = store.context.requirements as SiteRequirements
    let fullResponse = ''

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120_000)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements }),
        signal: controller.signal,
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('No response body')

      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.type === 'text') {
              fullResponse += data.content
              const fileCount = (fullResponse.match(/```\w+:/g) || []).length
              store.updateLastMessage(
                fileCount > 0
                  ? `正在生成网站代码...（已完成 ${fileCount} 个文件）`
                  : '正在生成网站代码...'
              )
            } else if (data.type === 'done') {
              break
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }

      const files = parseGeneratedFiles(fullResponse)
      if (files.length > 0) {
        store.setGeneratedFiles(files)
        store.setStep('preview')
        store.updateLastMessage(
          `✅ 已生成 **${files.length} 个文件**。\n\n右侧查看完整代码，点击「导出项目」下载 ZIP。\n\n需要调整什么，直接告诉我。`
        )
      } else {
        store.updateLastMessage('代码生成完成，但未能解析文件结构，请重试。')
        store.setStep('preview')
      }
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        store.updateLastMessage('代码生成超时，请重试。')
      } else {
        store.updateLastMessage('代码生成失败，请重试。')
      }
    } finally {
      clearTimeout(timeoutId)
    }
    store.setStreamingDone()
  }, [store])

  const triggerRefinement = useCallback(
    async (userRequest: string) => {
      store.setStep('refining')
      store.setStreaming(true)
      store.addMessage('assistant', '正在修改...')

      const currentFiles = store.generatedFiles
      let fullResponse = ''

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120_000)
      try {
        const res = await fetch('/api/refine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files: currentFiles, userRequest }),
          signal: controller.signal,
        })

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) throw new Error('No response body')

        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === 'text') {
                fullResponse += data.content
                const displayText = fullResponse.replace(/```[\s\S]*?```/g, '').trim()
                store.updateLastMessage(displayText || '正在修改...')
              } else if (data.type === 'done') {
                break
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }

        const changedFiles = parseGeneratedFiles(fullResponse)
        if (changedFiles.length > 0) {
          store.mergeGeneratedFiles(changedFiles)
          const displayText = fullResponse.replace(/```[\s\S]*?```/g, '').trim()
          store.updateLastMessage(
            (displayText ? displayText + '\n\n' : '') +
              `✅ 已更新 **${changedFiles.length} 个文件**。还需要调整什么？`
          )
        } else {
          const displayText = fullResponse.replace(/```[\s\S]*?```/g, '').trim()
          store.updateLastMessage(displayText || '修改完成。')
        }
        store.setStep('preview')
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          store.updateLastMessage('请求超时，请重试。')
        } else {
          store.updateLastMessage('修改失败，请重试。')
        }
      } finally {
        clearTimeout(timeoutId)
      }

      store.setStreamingDone()
    },
    [store]
  )

  const sendMessage = useCallback(
    async (userText: string) => {
      if (store.isStreaming) return

      // Capture history BEFORE mutating store — prevents duplicate user message in API call
      const apiMessages = store.messages
        .filter((m) => m.role !== 'system' && m.content.trim() !== '')
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      apiMessages.push({ role: 'user', content: userText })

      // Update store for display
      store.addMessage('user', userText)
      store.setStreaming(true)
      store.addMessage('assistant', '')

      let fullResponse = ''

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120_000)
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
          signal: controller.signal,
        })

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) throw new Error('No response body')

        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === 'text') {
                fullResponse += data.content
                store.updateLastMessage(fullResponse)
                const stateUpdate = extractStateUpdate(fullResponse)
                if (stateUpdate) {
                  if (stateUpdate.step) {
                    store.setStep(stateUpdate.step as Parameters<typeof store.setStep>[0])
                  }
                  if (stateUpdate.requirements) {
                    store.updateRequirements(stateUpdate.requirements as Partial<SiteRequirements>)
                  }
                  if (stateUpdate.readyToGenerate) {
                    store.setStreamingDone()
                    const hasFiles = store.generatedFiles.length > 0
                    if (hasFiles) {
                      // Incremental patch — only re-generate changed files
                      setTimeout(() => triggerRefinement(userText), 800)
                    } else {
                      // First generation — full site build
                      setTimeout(() => triggerCodeGeneration(), 800)
                    }
                    return
                  }
                }
              } else if (data.type === 'done') {
                break
              } else if (data.type === 'error') {
                store.updateLastMessage(`抱歉，发生了错误：${data.error}`)
                break
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          store.updateLastMessage('请求超时，请重试。')
        } else {
          store.updateLastMessage('连接错误，请检查 API Key 配置是否正确。')
        }
      } finally {
        clearTimeout(timeoutId)
      }

      store.setStreamingDone()
    },
    [store, triggerCodeGeneration, triggerRefinement]
  )

  return { sendMessage, triggerCodeGeneration, triggerRefinement }
}
