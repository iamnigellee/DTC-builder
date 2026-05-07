'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MessageBubble } from './MessageBubble'
import { ChatInput } from './ChatInput'
import { StepIndicator } from './StepIndicator'
import { useBuilderStore } from '@/store/builderStore'
import { Sparkles } from 'lucide-react'

interface ChatPanelProps {
  onSend: (message: string) => void
}

export function ChatPanel({ onSend }: ChatPanelProps) {
  const { messages, isStreaming, context } = useBuilderStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">AI 建站助手</h2>
            <p className="text-xs text-slate-500">
              {isStreaming ? '正在思考...' : '随时开始对话'}
            </p>
          </div>
        </div>
        <StepIndicator currentStep={context.step} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-violet-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">开始构建你的网站</h3>
              <p className="text-slate-500 text-sm max-w-xs">
                告诉我你想要什么样的网站，我会引导你一步步打造出来
              </p>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-5 pb-5">
        <ChatInput
          onSend={onSend}
          isStreaming={isStreaming}
          placeholder={
            context.step === 'welcome' || messages.length === 0
              ? '例如：我想做一个卖手工咖啡豆的独立站...'
              : '继续描述你的想法...'
          }
        />
      </div>
    </div>
  )
}
