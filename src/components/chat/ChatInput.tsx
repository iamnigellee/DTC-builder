'use client'

import { useRef, useState, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  isStreaming: boolean
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  isStreaming,
  disabled,
  placeholder = '描述你的想法...',
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || isStreaming || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleInput() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  const canSend = value.trim().length > 0 && !isStreaming && !disabled

  return (
    <div className="relative">
      <div
        className={cn(
          'flex items-end gap-2 rounded-2xl border bg-white/5 backdrop-blur-sm px-4 py-3 transition-all duration-200',
          isStreaming
            ? 'border-violet-500/30'
            : 'border-white/10 hover:border-white/20 focus-within:border-violet-500/50'
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={isStreaming || disabled}
          placeholder={placeholder}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none min-h-[24px] max-h-40 leading-relaxed disabled:opacity-50"
        />

        <AnimatePresence mode="wait">
          {isStreaming ? (
            <motion.div
              key="loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600/30 flex items-center justify-center"
            >
              <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.button
              key="send"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={handleSubmit}
              disabled={!canSend}
              className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
                canSend
                  ? 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105'
                  : 'bg-white/5 cursor-not-allowed'
              )}
            >
              <ArrowUp
                className={cn(
                  'w-4 h-4',
                  canSend ? 'text-white' : 'text-slate-600'
                )}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-2 text-xs text-slate-600 text-center flex items-center justify-center gap-1">
        <Sparkles className="w-3 h-3" />
        按 Enter 发送，Shift+Enter 换行
      </p>
    </div>
  )
}
