'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChatPanel } from '@/components/chat/ChatPanel'
import { PreviewPanel } from '@/components/preview/PreviewPanel'
import { useBuilder } from '@/hooks/useBuilder'
import { useBuilderStore } from '@/store/builderStore'

export default function BuilderPage() {
  const { sendMessage } = useBuilder()
  const { addMessage, setStep } = useBuilderStore()

  // Send welcome message on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('collecting')
      addMessage(
        'assistant',
        `嗨，我是你的建站搭档。

跟我说说你在做什么？随便说，我来帮你变成网站。`
      )
    }, 400)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
      {/* Top bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-shrink-0 h-12 border-b border-white/5 flex items-center justify-between px-4 bg-black/40 backdrop-blur-xl"
      >
        <a href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">D</span>
          </div>
          <span className="text-white font-bold text-sm">DTC Builder</span>
        </a>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Claude claude-sonnet-4-6 已连接
        </div>
      </motion.div>

      {/* Main split panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chat */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-[420px] flex-shrink-0 border-r border-white/5 flex flex-col overflow-hidden"
        >
          <ChatPanel onSend={sendMessage} />
        </motion.div>

        {/* Right: Preview */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <PreviewPanel />
        </motion.div>
      </div>
    </div>
  )
}
