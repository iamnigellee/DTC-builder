export const HERO_VARIANTS = {
  // Full-bleed gradient with animated particles
  gradient: `
'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--secondary)]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-sm text-[var(--primary)] mb-8"
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          BRAND_TAGLINE_BADGE
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.05]"
        >
          HEADLINE_LINE1
          <br />
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            HEADLINE_LINE2
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          SUBLINE_TEXT
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-[var(--primary)]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center">
            CTA_PRIMARY
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            CTA_SECONDARY
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-6 text-slate-500 text-sm"
        >
          <div className="flex -space-x-2">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] border-2 border-[var(--bg)]" />
            ))}
          </div>
          <span>SOCIAL_PROOF_TEXT</span>
        </motion.div>
      </div>
    </section>
  )
}`,

  // Asymmetric split layout
  split: `
'use client'
import { motion } from 'framer-motion'
export function Hero() {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 bg-[var(--bg)]">
      <div className="flex items-center px-8 lg:px-16 py-24">
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
          <h1 className="text-6xl font-black text-white mb-6 leading-tight">HEADLINE</h1>
          <p className="text-slate-400 text-lg mb-8">SUBLINE</p>
          <button className="px-8 py-4 bg-[var(--primary)] rounded-xl text-white font-bold hover:opacity-90 transition">CTA</button>
        </motion.div>
      </div>
      <div className="bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 flex items-center justify-center">
        <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] opacity-80" />
      </div>
    </section>
  )
}`,
}

export const NAVBAR_TEMPLATE = `
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = ['产品', '关于', '定价', '联系']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      className={\`fixed top-0 inset-x-0 z-50 transition-all duration-300 \${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : ''
      }\`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <span className="text-xl font-black text-white">BRAND_NAME</span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className="text-slate-400 hover:text-white text-sm transition-colors">{link}</a>
          ))}
          <button className="px-5 py-2 bg-[var(--primary)] rounded-xl text-white text-sm font-semibold hover:opacity-90 transition">
            开始使用
          </button>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </motion.nav>
  )
}`
