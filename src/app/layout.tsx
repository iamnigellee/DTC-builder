import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DTC Builder — AI 驱动的独立站构建平台',
  description:
    '用 AI 对话描述你的业务，自动生成带精美动效、电商模块、Stripe 支付的 Next.js 独立站。由 Claude Sonnet 4.6 驱动。',
  keywords: ['独立站', 'AI建站', 'Next.js', 'Claude AI', '电商', 'DTC'],
  openGraph: {
    title: 'DTC Builder — 把想法变成精美独立站',
    description: '用 AI 对话描述你的业务，10 分钟生成生产级独立站代码',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06060a]">{children}</body>
    </html>
  )
}
