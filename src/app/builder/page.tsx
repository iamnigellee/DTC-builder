'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChatPanel } from '@/components/chat/ChatPanel'
import { PreviewPanel } from '@/components/preview/PreviewPanel'
import { useBuilder } from '@/hooks/useBuilder'
import { useBuilderStore } from '@/store/builderStore'

export default function BuilderPage() {
  const { sendMessage } = useBuilder()
  const { addMessage } = useBuilderStore()

  // Send welcome message on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addMessage(
        'assistant',
        `你好！我是你的 AI 建站助手 ✨

我可以帮你从零开始构建一个**视觉精美、功能齐备**的独立站网站，包括：

- 🎨 **精美视觉设计** — 渐变、动效、玻璃拟态
- 🛍️ **电商模块** — 产品展示、购物车、结账
- 💳 **支付集成** — Stripe / 支付宝 / 微信支付
- 📱 **响应式设计** — 完美适配手机和桌面

告诉我你想建什么样的网站？可以从你的业务类型说起，比如：
*"我想做一个卖手工咖啡豆的独立站"* 或 *"我想为我的设计工作室建一个作品集网站"*

\`\`\`json
{"step": "collecting", "requirements": {}, "readyToGenerate": false}
\`\`\``
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
