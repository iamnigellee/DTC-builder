'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Copy, Check } from 'lucide-react'
import { GeneratedFile } from '@/lib/types'

interface CodeViewerProps {
  file: GeneratedFile
}

export function CodeViewer({ file }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(file.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const langMap: Record<string, string> = {
    tsx: 'typescript',
    ts: 'typescript',
    css: 'css',
    json: 'json',
    md: 'markdown',
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* File bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/3 border-b border-white/5 flex-shrink-0">
        <span className="text-xs text-slate-400 font-mono">{file.path}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 text-emerald-400"
              >
                <Check className="w-3.5 h-3.5" /> 已复制
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> 复制
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto text-xs">
        <SyntaxHighlighter
          language={langMap[file.language] || 'typescript'}
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '12px',
            lineHeight: '1.6',
            height: '100%',
          }}
          showLineNumbers
          lineNumberStyle={{ color: '#374151', minWidth: '2.5em' }}
        >
          {file.content}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
