export const TESTIMONIALS_TEMPLATE = `
'use client'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const TESTIMONIALS = [
  { name: '用户姓名', role: '职位 / 来自', text: '这个产品完全改变了我的工作方式，效率提升了三倍，强烈推荐！', rating: 5, gradient: 'from-violet-500 to-indigo-500' },
  { name: '用户姓名', role: '职位 / 来自', text: '品质超出预期，客服也非常贴心，已经回购第三次了。', rating: 5, gradient: 'from-rose-500 to-pink-500' },
  { name: '用户姓名', role: '职位 / 来自', text: '设计精美，用料扎实，是我用过最好的同类产品之一。', rating: 5, gradient: 'from-amber-500 to-orange-500' },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-[var(--bg)]" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">用户怎么说</h2>
          <p className="text-slate-400 text-lg">真实用户的真实评价</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
            >
              <Quote className="w-8 h-8 text-[var(--primary)]/40 mb-4" />
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={\`w-10 h-10 rounded-full bg-gradient-to-br \${t.gradient}\`} />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`

export const PRICING_TEMPLATE = `
'use client'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const PLANS = [
  {
    name: '基础版',
    price: 99,
    period: '月',
    features: ['功能一', '功能二', '功能三', '邮件支持'],
    cta: '免费试用',
    popular: false,
  },
  {
    name: '专业版',
    price: 299,
    period: '月',
    features: ['基础版全部功能', '高级功能一', '高级功能二', '优先客服', 'API 访问'],
    cta: '立即升级',
    popular: true,
  },
  {
    name: '企业版',
    price: 999,
    period: '月',
    features: ['专业版全部功能', '定制开发', '专属客户经理', 'SLA 保障', '私有部署'],
    cta: '联系我们',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 bg-[var(--bg)]" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">简单透明的定价</h2>
          <p className="text-slate-400 text-lg">选择最适合你的方案</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={\`relative rounded-2xl p-6 flex flex-col \${
                plan.popular
                  ? 'bg-gradient-to-b from-[var(--primary)]/20 to-[var(--secondary)]/10 border-2 border-[var(--primary)]/50 scale-105'
                  : 'bg-white/5 border border-white/10'
              }\`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-[var(--primary)] rounded-full text-white text-xs font-bold">
                  <Zap className="w-3 h-3" /> 最受欢迎
                </div>
              )}
              <h3 className="text-white font-bold text-lg mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">¥{plan.price}</span>
                <span className="text-slate-500">/{plan.period}</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 \${
                plan.popular
                  ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:opacity-90 hover:scale-105'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }\`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`

export const FAQ_TEMPLATE = `
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  { q: '常见问题一是什么？', a: '这里是对问题一的详细解答，帮助用户了解相关信息。' },
  { q: '常见问题二是什么？', a: '这里是对问题二的详细解答，帮助用户了解相关信息。' },
  { q: '常见问题三是什么？', a: '这里是对问题三的详细解答，帮助用户了解相关信息。' },
  { q: '常见问题四是什么？', a: '这里是对问题四的详细解答，帮助用户了解相关信息。' },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 bg-[var(--bg)]" id="faq">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4">常见问题</h2>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-white font-medium hover:bg-white/5 transition-colors"
              >
                {faq.q}
                {open === i ? <Minus className="w-4 h-4 text-[var(--primary)] flex-shrink-0" /> : <Plus className="w-4 h-4 text-slate-500 flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`

export const FOOTER_TEMPLATE = `
import { Sparkles, Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--bg)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-white">BRAND_NAME</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">BRAND_TAGLINE</p>
          </div>
          {[
            { title: '产品', links: ['功能', '定价', '更新日志', '路线图'] },
            { title: '公司', links: ['关于我们', '博客', '招聘', '联系'] },
            { title: '法律', links: ['隐私政策', '服务条款', 'Cookie 政策'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-slate-600 text-sm">© 2024 BRAND_NAME. 保留所有权利。</p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-600 hover:text-slate-400 transition-colors"><Icon className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}`
