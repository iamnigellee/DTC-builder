export const TESTIMONIALS_TEMPLATE = `
'use client'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const TESTIMONIALS = [
  { name: '用户姓名', role: '职位 / 来自', text: '这个产品完全改变了我的工作方式，效率提升了三倍，强烈推荐！', rating: 5 },
  { name: '用户姓名', role: '职位 / 来自', text: '品质超出预期，客服也非常贴心，已经回购第三次了。', rating: 5 },
  { name: '用户姓名', role: '职位 / 来自', text: '设计精美，用料扎实，是我用过最好的同类产品之一。', rating: 5 },
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
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4">用户怎么说</h2>
          <p className="text-[var(--text-muted)] text-lg">真实用户的真实评价</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--border-strong)] transition-colors"
            >
              <Quote className="w-8 h-8 text-[var(--primary)]/40 mb-4" />
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                  <span className="text-[var(--primary)] font-bold text-sm">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-[var(--text)] font-semibold text-sm">{t.name}</p>
                  <p className="text-[var(--text-subtle)] text-xs">{t.role}</p>
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
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const PLANS = [
  {
    name: '基础版',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: ['功能一', '功能二', '功能三', '邮件支持'],
    cta: '免费试用',
    popular: false,
  },
  {
    name: '专业版',
    monthlyPrice: 299,
    yearlyPrice: 239,
    features: ['基础版全部功能', '高级功能一', '高级功能二', '优先客服', 'API 访问'],
    cta: '立即升级',
    popular: true,
  },
  {
    name: '企业版',
    monthlyPrice: 999,
    yearlyPrice: 799,
    features: ['专业版全部功能', '定制开发', '专属客户经理', 'SLA 保障', '私有部署'],
    cta: '联系我们',
    popular: false,
  },
]

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="py-24 bg-[var(--bg)]" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4">简单透明的定价</h2>
          <p className="text-[var(--text-muted)] text-lg mb-8">选择最适合你的方案</p>
          <div className="inline-flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={\`px-4 py-1.5 rounded-full text-sm font-medium transition-all \${!isAnnual ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}\`}
            >月付</button>
            <button
              onClick={() => setIsAnnual(true)}
              className={\`px-4 py-1.5 rounded-full text-sm font-medium transition-all \${isAnnual ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}\`}
            >年付 <span className="text-[var(--accent)] font-bold">省20%</span></button>
          </div>
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
                  ? 'bg-[var(--primary)]/10 border-2 border-[var(--primary)]/50 scale-105'
                  : 'bg-[var(--bg-card)] border border-[var(--border)]'
              }\`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-[var(--primary)] rounded-full text-white text-xs font-bold">
                  <Zap className="w-3 h-3" /> 最受欢迎
                </div>
              )}
              <h3 className="text-[var(--text)] font-bold text-lg mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <motion.span
                  key={isAnnual ? 'annual' : 'monthly'}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black text-[var(--text)]"
                >
                  ¥{isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </motion.span>
                <span className="text-[var(--text-subtle)]">/月</span>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                    <Check className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 \${
                plan.popular
                  ? 'bg-[var(--primary)] text-white hover:opacity-90 hover:scale-105'
                  : 'bg-[var(--bg-secondary)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--border-strong)]'
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
          <h2 className="text-4xl font-black text-[var(--text)] mb-4">常见问题</h2>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="border border-[var(--border)] rounded-xl overflow-hidden"
            >
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-[var(--text)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
              >
                {faq.q}
                {open === i
                  ? <Minus className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                  : <Plus className="w-4 h-4 text-[var(--text-subtle)] flex-shrink-0" />
                }
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-5 pb-4 text-[var(--text-muted)] text-sm leading-relaxed">{faq.a}</p>
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
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-[var(--text)]">BRAND_NAME</span>
            </div>
            <p className="text-[var(--text-subtle)] text-sm leading-relaxed">BRAND_TAGLINE</p>
          </div>
          {[
            { title: '产品', links: ['功能', '定价', '更新日志', '路线图'] },
            { title: '公司', links: ['关于我们', '博客', '招聘', '联系'] },
            { title: '法律', links: ['隐私政策', '服务条款', 'Cookie 政策'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-[var(--text)] font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-[var(--text-subtle)] hover:text-[var(--text-muted)] text-sm transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--border)] gap-4">
          <p className="text-[var(--text-subtle)] text-sm">© 2024 BRAND_NAME. 保留所有权利。</p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-[var(--text-subtle)] hover:text-[var(--text-muted)] transition-colors"><Icon className="w-4 h-4" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}`

export const NEWSLETTER_TEMPLATE = `
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-24 bg-[var(--bg-secondary)]" id="newsletter">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-[var(--primary)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text)]">订阅我们的通讯</h2>
          <p className="text-[var(--text-muted)] text-lg">第一时间获取最新内容、产品更新和独家优惠</p>
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-[var(--primary)] font-semibold"
            >
              <CheckCircle className="w-5 h-5" /> 已订阅成功，感谢你的支持！
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="你的邮箱地址" required
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm"
              />
              <button type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? '订阅中...' : (<>订阅 <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>
          )}
          <p className="text-[var(--text-subtle)] text-xs">无垃圾邮件，随时可取消订阅</p>
        </motion.div>
      </div>
    </section>
  )
}`

export const STATS_TEMPLATE = `
'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 10000, suffix: '+', label: '活跃用户', description: '来自全球各地的用户' },
  { value: 99.9, suffix: '%', label: '服务可用性', description: '业界领先的稳定性' },
  { value: 4.9, suffix: '', label: '用户评分', description: '来自真实用户评价' },
  { value: 3, suffix: '倍', label: '效率提升', description: '平均效率提升幅度' },
]

function CountUp({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) return
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, value)
      setDisplay(current)
      if (current >= value) clearInterval(timer)
    }, 1500 / steps)
    return () => clearInterval(timer)
  }, [value, active])
  return <span>{value % 1 === 0 ? Math.floor(display).toLocaleString() : display.toFixed(1)}{suffix}</span>
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="py-24 bg-[var(--bg-secondary)]" id="stats">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-[var(--primary)] mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <div className="text-[var(--text)] font-semibold mb-1">{stat.label}</div>
              <div className="text-[var(--text-subtle)] text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`

export const MENU_TEMPLATE = `
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Category = '全部' | '前菜' | '主菜' | '甜品' | '饮品'

const MENU_ITEMS = [
  { name: '招牌菜名 A', description: '食材描述，口感描述', price: 88, category: '前菜' as const, image: '/images/dish-1.jpg', tag: '招牌' },
  { name: '招牌菜名 B', description: '食材描述，口感描述', price: 168, category: '主菜' as const, image: '/images/dish-2.jpg', tag: '主厨推荐' },
  { name: '招牌菜名 C', description: '食材描述，口感描述', price: 128, category: '主菜' as const, image: '/images/dish-3.jpg' },
  { name: '招牌菜名 D', description: '食材描述，口感描述', price: 58, category: '甜品' as const, image: '/images/dish-4.jpg', tag: '季节限定' },
  { name: '特色饮品 A', description: '食材描述，口感描述', price: 38, category: '饮品' as const, image: '/images/drink-1.jpg' },
  { name: '特色饮品 B', description: '食材描述，口感描述', price: 42, category: '饮品' as const, image: '/images/drink-2.jpg' },
]

const CATEGORIES: Category[] = ['全部', '前菜', '主菜', '甜品', '饮品']

export function Menu() {
  const [active, setActive] = useState<Category>('全部')
  const filtered = active === '全部' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === active)

  return (
    <section className="py-24 bg-[var(--bg)]" id="menu">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4">精选菜单</h2>
          <p className="text-[var(--text-muted)]">每道菜都是厨师用心之作</p>
        </motion.div>
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={\`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 \${
                active === cat
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
              }\`}
            >{cat}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div key={item.name} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--border-strong)] transition-colors group"
            >
              <div className="relative h-48">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                {item.tag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--primary)] rounded-full text-white text-xs font-semibold">{item.tag}</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[var(--text)]">{item.name}</h3>
                  <span className="text-[var(--primary)] font-black text-lg ml-3">¥{item.price}</span>
                </div>
                <p className="text-[var(--text-subtle)] text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`

export const BOOKING_FORM_TEMPLATE = `
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Phone, CheckCircle } from 'lucide-react'

const TIME_SLOTS = ['11:30', '12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']

export function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', partySize: '2', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  const cls = "w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--primary)] transition-colors text-sm"

  return (
    <section className="py-24 bg-[var(--bg-secondary)]" id="booking">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl font-black text-[var(--text)] mb-4">预约订座</h2>
          <p className="text-[var(--text-muted)]">提前预约，为你保留最佳位置</p>
        </motion.div>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 space-y-4">
            <CheckCircle className="w-16 h-16 text-[var(--primary)] mx-auto" />
            <h3 className="text-2xl font-bold text-[var(--text)]">预约成功！</h3>
            <p className="text-[var(--text-muted)]">我们将在24小时内通过电话或短信确认您的预约</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[var(--text)] text-sm font-medium mb-2">姓名 *</label>
                <input type="text" required placeholder="您的姓名" value={form.name} onChange={update('name')} className={cls} />
              </div>
              <div>
                <label className="block text-[var(--text)] text-sm font-medium mb-2"><Phone className="w-3.5 h-3.5 inline mr-1" />手机号 *</label>
                <input type="tel" required placeholder="用于确认预约" value={form.phone} onChange={update('phone')} className={cls} />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-[var(--text)] text-sm font-medium mb-2"><Calendar className="w-3.5 h-3.5 inline mr-1" />日期 *</label>
                <input type="date" required value={form.date} onChange={update('date')} min={new Date().toISOString().split('T')[0]} className={cls} />
              </div>
              <div>
                <label className="block text-[var(--text)] text-sm font-medium mb-2"><Clock className="w-3.5 h-3.5 inline mr-1" />时间 *</label>
                <select required value={form.time} onChange={update('time')} className={cls}>
                  <option value="">选择时段</option>
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[var(--text)] text-sm font-medium mb-2"><Users className="w-3.5 h-3.5 inline mr-1" />人数 *</label>
                <select required value={form.partySize} onChange={update('partySize')} className={cls}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} 人</option>)}
                  <option value="8+">8人以上（请电话联系）</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[var(--text)] text-sm font-medium mb-2">备注（可选）</label>
              <textarea placeholder="如有特殊要求或过敏信息，请在此说明" value={form.notes} onChange={update('notes')} rows={3} className={cls + ' resize-none'} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl bg-[var(--primary)] text-white font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-60"
            >{loading ? '提交中...' : '确认预约'}</button>
          </form>
        )}
      </div>
    </section>
  )
}`
