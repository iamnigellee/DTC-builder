export const PRODUCT_GRID_TEMPLATE = `
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Heart } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  badge?: string
  gradient: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: '产品名称 A', price: 299, rating: 4.9, reviews: 128, badge: '热销', gradient: 'from-violet-500 to-indigo-600' },
  { id: 2, name: '产品名称 B', price: 199, rating: 4.7, reviews: 86, gradient: 'from-rose-500 to-pink-600' },
  { id: 3, name: '产品名称 C', price: 399, rating: 4.8, reviews: 203, badge: '新品', gradient: 'from-amber-500 to-orange-600' },
  { id: 4, name: '产品名称 D', price: 149, rating: 4.6, reviews: 61, gradient: 'from-emerald-500 to-teal-600' },
  { id: 5, name: '产品名称 E', price: 499, rating: 5.0, reviews: 42, badge: '限量', gradient: 'from-sky-500 to-blue-600' },
  { id: 6, name: '产品名称 F', price: 259, rating: 4.7, reviews: 97, gradient: 'from-purple-500 to-violet-600' },
]

export function ProductGrid() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [liked, setLiked] = useState<number[]>([])

  const addToCart = (id: number) => {
    setCartItems(prev => prev.includes(id) ? prev : [...prev, id])
  }

  return (
    <section className="py-24 bg-[var(--bg)]" id="products">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            精选<span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">产品</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">每一件产品都经过严格筛选，只为给你带来最好的体验</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--primary)]/30 transition-all duration-300"
            >
              {/* Product image placeholder */}
              <div className={\`relative h-56 bg-gradient-to-br \${product.gradient} flex items-center justify-center\`}>
                <div className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm" />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => setLiked(prev => prev.includes(product.id) ? prev.filter(x => x !== product.id) : [...prev, product.id])}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-black/70"
                >
                  <Heart className={\`w-4 h-4 transition-colors \${liked.includes(product.id) ? 'fill-rose-400 text-rose-400' : 'text-white'}\`} />
                </button>
              </div>

              {/* Product info */}
              <div className="p-5">
                <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={\`w-3.5 h-3.5 \${j < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}\`} />
                    ))}
                  </div>
                  <span className="text-slate-500 text-xs">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-white">¥{product.price}</span>
                  <button
                    onClick={() => addToCart(product.id)}
                    className={\`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 \${
                      cartItems.includes(product.id)
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                        : 'bg-[var(--primary)] text-white hover:opacity-90 hover:scale-105'
                    }\`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cartItems.includes(product.id) ? '已加入' : '加购'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}`

export const STRIPE_CHECKOUT_TEMPLATE = `
// Stripe 支付集成示例
// 需要安装: npm install @stripe/stripe-js @stripe/react-stripe-js

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export async function createCheckoutSession(items: { id: string; quantity: number }[]) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
  const { sessionId } = await res.json()
  const stripe = await stripePromise
  await stripe?.redirectToCheckout({ sessionId })
}

// API Route: app/api/checkout/route.ts
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { items } = await req.json()
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'alipay', 'wechat_pay'],
    line_items: items.map((item: { id: string; quantity: number }) => ({
      price: item.id,
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/success\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cancel\`,
  })
  return Response.json({ sessionId: session.id })
}`
