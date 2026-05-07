'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShoppingCart,
  CreditCard,
  Palette,
  Code2,
  MessageSquare,
  Eye,
  Star,
  Check,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: MessageSquare,
    title: '对话式需求收集',
    desc: '只需描述你的想法，AI 通过自然对话理解你的业务需求，无需填表格。',
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    icon: Palette,
    title: '智能设计系统',
    desc: '自动生成配色方案、排版规范、组件风格，每个网站都是独一无二的。',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Code2,
    title: '高质量代码输出',
    desc: '生成 Next.js 15 + TypeScript + Tailwind 的生产级代码，直接可部署。',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Zap,
    title: 'Framer Motion 动效',
    desc: '所有页面自带精美入场动画、悬停交互，视觉效果媲美顶级设计工作室。',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: ShoppingCart,
    title: '电商模块内置',
    desc: '产品展示、购物车、库存管理，一键开启你的 DTC 电商业务。',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    icon: CreditCard,
    title: 'Stripe 支付集成',
    desc: '支持信用卡、支付宝、微信支付，完整的支付流程开箱即用。',
    gradient: 'from-purple-500 to-violet-600',
  },
]

const STEPS = [
  { step: '01', title: '描述你的想法', desc: '用自然语言告诉 AI 你想要什么样的网站', icon: MessageSquare },
  { step: '02', title: 'AI 设计方案', desc: '自动生成配色、布局、功能模块规划', icon: Palette },
  { step: '03', title: '实时生成代码', desc: '流式输出完整 Next.js 项目代码', icon: Code2 },
  { step: '04', title: '预览 & 导出', desc: '查看代码，导出项目，部署上线', icon: Eye },
]

const SHOWCASE = [
  { name: '咖啡品牌独立站', tags: ['电商', '订阅', 'Stripe'], gradient: 'from-amber-900 to-stone-900' },
  { name: '设计师作品集', tags: ['画廊', '联系', '博客'], gradient: 'from-slate-900 to-zinc-900' },
  { name: 'SaaS 产品官网', tags: ['定价', 'FAQ', '注册'], gradient: 'from-violet-950 to-indigo-950' },
  { name: '健身教练预约站', tags: ['预约', '课程', '支付'], gradient: 'from-emerald-950 to-teal-950' },
]

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="min-h-screen bg-[#06060a] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-6 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-black text-base text-white">DTC Builder</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {['功能', '案例', '定价', '文档'].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-500/20"
        >
          开始构建 <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-sm text-violet-300 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            由 Claude Sonnet 4.6 驱动 · 生产级代码输出
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-[1.03] mb-6"
          >
            <span className="text-white">把想法变成</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              精美独立站
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            用 AI 对话描述你的业务，自动生成带{' '}
            <span className="text-white font-medium">精美动效</span>、
            <span className="text-white font-medium">电商模块</span>、
            <span className="text-white font-medium">Stripe 支付</span>
            的 Next.js 独立站，下载即可部署。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/builder"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              免费开始构建
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#demo"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-slate-300 font-semibold text-lg hover:border-white/20 hover:text-white transition-all duration-300"
            >
              查看演示
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['#7c3aed', '#4f46e5', '#7e22ce', '#1d4ed8'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#06060a]" style={{ background: c }} />
                ))}
              </div>
              <span>已有 2,000+ 用户在使用</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">4.9 / 5 评分</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="py-24 relative" id="demo">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">四步完成网站构建</h2>
            <p className="text-slate-400 text-lg">从想法到代码，最快 10 分钟</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] right-[calc(-50%+32px)] h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
                  )}
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-violet-400" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-black flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-transparent to-slate-950/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              一切你需要的{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                都已内置
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              从视觉设计到功能开发，DTC Builder 覆盖独立站建设的每个环节
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">生成案例展示</h2>
            <p className="text-slate-400 text-lg">这些都是 AI 在 10 分钟内生成的网站</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {SHOWCASE.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-white/10 p-8 h-48 flex flex-col justify-between hover:border-white/20 transition-all duration-300 cursor-pointer group`}
              >
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-xs group-hover:text-white/60 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  查看详情
                  <ChevronRight className="w-3 h-3" />
                </div>
                <div className="absolute top-4 right-4 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 rotate-12 group-hover:rotate-6 transition-transform duration-500" />
                <div className="absolute top-8 right-8 w-16 h-16 rounded-xl bg-white/5 rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-600 text-sm mb-8">生成的代码基于业界最佳技术栈</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Stripe', 'Vercel'].map(
              (tech) => (
                <span key={tech} className="text-slate-400 font-semibold text-sm">
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24" id="pricing">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">简单定价</h2>
            <p className="text-slate-400 text-lg">按需付费，无订阅绑定</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: '体验版',
                price: '免费',
                period: '',
                features: ['3 次网站生成', '基础模板', '代码下载', '社区支持'],
                cta: '免费开始',
                highlight: false,
              },
              {
                name: '专业版',
                price: '¥199',
                period: '/月',
                features: ['无限次生成', '全部模板', '电商 & 支付模块', '优先支持', '版本历史'],
                cta: '立即升级',
                highlight: true,
              },
              {
                name: '团队版',
                price: '¥599',
                period: '/月',
                features: ['团队协作', '私有部署方案', '自定义模块', '专属客服', 'API 访问'],
                cta: '联系我们',
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 flex flex-col ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-violet-600/20 to-indigo-600/10 border-2 border-violet-500/50 scale-105'
                    : 'bg-white/[0.03] border border-white/10'
                }`}
              >
                {plan.highlight && (
                  <div className="text-center mb-3">
                    <span className="px-3 py-1 bg-violet-600 rounded-full text-white text-xs font-bold">
                      最受欢迎
                    </span>
                  </div>
                )}
                <h3 className="text-white font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/builder"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105'
                      : 'bg-white/8 text-white hover:bg-white/12'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-purple-600/10 border border-violet-500/20 p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.15),transparent_60%)]" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/30">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                现在就开始构建
                <br />
                你的独立站
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                无需技术背景，无需设计经验，只需告诉 AI 你的想法
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                免费开始构建
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-black text-white text-sm">DTC Builder</span>
          </div>
          <p className="text-slate-600 text-sm">
            Powered by Claude Sonnet 4.6 · Built with Next.js 15
          </p>
        </div>
      </footer>
    </div>
  )
}
