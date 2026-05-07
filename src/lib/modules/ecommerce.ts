export const CART_STORE_TEMPLATE = `
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  productId: number
  name: string
  price: number
  quantity: number
  variants?: Record<string, string>
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId)
          if (existing) {
            return { items: state.items.map((i) => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i) }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.productId !== productId)
            : state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)`

export const PRODUCT_GRID_TEMPLATE = `
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface ProductVariant {
  label: string
  values: string[]
}

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  badge?: string
  image: string
  variants?: ProductVariant[]
}

const PRODUCTS: Product[] = [
  { id: 1, name: '产品名称 A', price: 299, rating: 4.9, reviews: 128, badge: '热销', image: '/images/product-1.jpg', variants: [{ label: '规格', values: ['50ml', '100ml'] }] },
  { id: 2, name: '产品名称 B', price: 199, rating: 4.7, reviews: 86, image: '/images/product-2.jpg', variants: [{ label: '颜色', values: ['米白', '深棕', '哑黑'] }] },
  { id: 3, name: '产品名称 C', price: 399, rating: 4.8, reviews: 203, badge: '新品', image: '/images/product-3.jpg' },
  { id: 4, name: '产品名称 D', price: 149, rating: 4.6, reviews: 61, image: '/images/product-4.jpg' },
  { id: 5, name: '产品名称 E', price: 499, rating: 5.0, reviews: 42, badge: '限量', image: '/images/product-5.jpg' },
  { id: 6, name: '产品名称 F', price: 259, rating: 4.7, reviews: 97, image: '/images/product-6.jpg' },
]

export function ProductGrid() {
  const { addItem, items } = useCartStore()
  const [liked, setLiked] = useState<number[]>([])
  const [selectedVariants, setSelectedVariants] = useState<Record<number, Record<string, string>>>({})

  const isInCart = (id: number) => items.some(item => item.productId === id)

  const selectVariant = (productId: number, label: string, value: string) =>
    setSelectedVariants(prev => ({ ...prev, [productId]: { ...(prev[productId] || {}), [label]: value } }))

  return (
    <section className="py-24 bg-[var(--bg)]" id="products">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text)] mb-4">
            精选<span className="text-[var(--primary)]">产品</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">每一件产品都经过严格筛选，只为给你带来最好的体验</p>
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
              className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--primary)]/30 transition-all duration-300"
            >
              <div className="relative h-56 bg-[var(--bg-secondary)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--primary)] rounded-full text-white text-xs font-semibold">{product.badge}</span>
                )}
                <button
                  onClick={() => setLiked(prev => prev.includes(product.id) ? prev.filter(x => x !== product.id) : [...prev, product.id])}
                  className="absolute top-3 right-3 w-8 h-8 bg-[var(--bg)]/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[var(--bg)] transition-colors"
                >
                  <Heart className={\`w-4 h-4 transition-colors \${liked.includes(product.id) ? 'fill-rose-400 text-rose-400' : 'text-[var(--text-muted)]'}\`} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[var(--text)] mb-1">{product.name}</h3>
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={\`w-3.5 h-3.5 \${j < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-[var(--border-strong)]'}\`} />
                    ))}
                  </div>
                  <span className="text-[var(--text-subtle)] text-xs">({product.reviews})</span>
                </div>
                {product.variants?.map(variant => (
                  <div key={variant.label} className="mb-3">
                    <p className="text-[var(--text-subtle)] text-xs mb-1.5">{variant.label}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {variant.values.map(val => (
                        <button key={val} onClick={() => selectVariant(product.id, variant.label, val)}
                          className={\`px-2.5 py-1 rounded-lg text-xs border transition-all \${
                            selectedVariants[product.id]?.[variant.label] === val
                              ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                              : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                          }\`}
                        >{val}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-[var(--text)]">¥{product.price}</span>
                  <button
                    onClick={() => addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1, variants: selectedVariants[product.id] })}
                    className={\`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 \${
                      isInCart(product.id)
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-[var(--primary)] text-white hover:opacity-90 hover:scale-105'
                    }\`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart(product.id) ? '已加入' : '加购'}
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

export const STRIPE_CLIENT_TEMPLATE = `
'use client'
import { loadStripe } from '@stripe/stripe-js'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function CheckoutButton() {
  const { items, total } = useCartStore()

  async function handleCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })) }),
    })
    const { sessionId } = await res.json()
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({ sessionId })
  }

  if (items.length === 0) return null

  return (
    <button onClick={handleCheckout}
      className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
    >
      <ShoppingCart className="w-4 h-4" />
      结账 · ¥{total().toFixed(2)}
    </button>
  )
}`

export const STRIPE_API_ROUTE_TEMPLATE = `
// src/app/api/checkout/route.ts
import Stripe from 'stripe'
import { NextRequest } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { items } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'cny',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/success\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/cart\`,
  })

  return Response.json({ sessionId: session.id })
}`

// Keep combined template for backwards compatibility
export const STRIPE_CHECKOUT_TEMPLATE = `
// === 客户端组件 (src/components/CheckoutButton.tsx) ===
${STRIPE_CLIENT_TEMPLATE}

// === API Route (src/app/api/checkout/route.ts) ===
${STRIPE_API_ROUTE_TEMPLATE}`
