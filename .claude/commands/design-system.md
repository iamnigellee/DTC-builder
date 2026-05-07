# DTC Builder 设计系统参考

> 这是 /build-site skill 的设计规范文档。
> 构建任何网站时，Claude 必须严格遵循本文档的所有规范。

---

## 一、设计风格预设（Vibe Selection）

在阶段 3 设计方案中，根据用户业务和调性，**从以下 5 种风格中选择一种**作为基准，然后在其基础上定制。

### Vibe A — 深空极简（Dark Luxury）
**适合：** 高端品牌、科技产品、SaaS、潮牌
**参照感：** Linear、Vercel、Craft、Resend
```
背景：#050508（近黑，带一丝蓝调，不要纯黑）
主色：#6d28d9 或 #0ea5e9
边框：rgba(255,255,255,0.07)
卡片：rgba(255,255,255,0.03) 背景 + rgba(255,255,255,0.07) 边框
文字层次：白 / slate-300 / slate-500 / slate-700
光晕：用 blur-[120px] 的大光斑，不要小光圈
特征：极度克制，大量留白，字重对比强烈
```

### Vibe B — 明亮专业（Clean Pro）
**适合：** 工具类产品、企业服务、咨询、教育
**参照感：** Notion、Figma、Tailwind CSS 官网
```
背景：#ffffff / #f8fafc
主色：#2563eb 或 #7c3aed
边框：#e2e8f0
卡片：#ffffff + border #e2e8f0 + shadow-sm
文字层次：gray-900 / gray-600 / gray-400
特征：清晰、可信、内容密度适中
```

### Vibe C — 大胆张扬（Bold Expressive）
**适合：** 潮玩、创意机构、年轻消费品、音乐
**参照感：** Framer、Raycast、Rainbow Wallet
```
背景：#09090b（深黑）
主色：大胆撞色，如 #ff3d00 + #00ff87
边框：渐变描边（border-image 或 outline 渐变方案）
文字：超大字重（font-black）+ 倾斜/变形
特征：有个性，允许不对称，允许"打破规则"
```

### Vibe D — 温暖有机（Warm Organic）
**适合：** 食品、生活方式、健康、手工品牌
**参照感：** Italic、Oura Ring、Graza
```
背景：#faf7f2（暖白）或 #1c1612（暖棕深色）
主色：#d97706（琥珀）/ #15803d（橄榄绿）/ #9f1239（深玫）
字体：衬线（Playfair Display / Lora）混搭无衬线
特征：质感、温度、有机形状（圆角大、blob 图形）
```

### Vibe E — 极简留白（Ultra Minimal）
**适合：** 设计师作品集、摄影、高端个人品牌
**参照感：** Bruno Simon、Stripe Press、Awwwards 获奖站
```
背景：#ffffff 或 #0d0d0d
主色：几乎不用主色，靠排版和留白
排版：超大标题占满屏幕，正文极小
动效：缓慢、流畅，几乎是环境感而非提示感
特征：敢用空间，字体即设计
```

### Vibe F — 暖白奢感（Warm Ivory Luxury）
**适合：** 医美诊所、高端护肤、精品餐饮、婚礼/活动策划、高端咨询
**参照感：** Sisu Clinic、Augustinus Bader、Graza、La Mer
```
背景：#faf8f4（象牙白）或 #f5f0e8（奶油白）
主色：#b08d57（哑金）/ #8b6f4e（暖棕）/ #c9a882（浅金）
辅色：#2c2418（深棕，用于文字）
强调：极少量主色，配合留白使用
字体：衬线（Cormorant Garamond / Playfair Display）+ 无衬线辅助
边框：rgba(176, 141, 87, 0.2)（金色半透明）
卡片：#ffffff + 极细金色边框
特征：质感纸张感、暖光、奢而不冷、信任 + 情绪消费并存
```

**注意**：此 Vibe 适合有品牌色约束（深咖/金/暖白）的精品品牌。Vibe D（温暖有机）偏向大众生活方式，Vibe F 偏向高端消费 + 专业性并重。

---

## 二、排版系统（Typography）

### 字号比例（Type Scale）
使用 Major Third (1.25) 或 Perfect Fourth (1.333) 比例：

```
display：  clamp(56px, 8vw, 120px)  font-black tracking-[-0.03em]
h1：       clamp(40px, 5vw, 72px)   font-black tracking-[-0.02em]
h2：       clamp(28px, 3vw, 48px)   font-bold  tracking-[-0.015em]
h3：       20px - 24px              font-semibold
body-lg：  18px                     font-normal leading-[1.75]
body：     16px                     font-normal leading-[1.7]
caption：  13px - 14px              font-medium tracking-[0.02em]
label：    11px - 12px              font-semibold tracking-[0.08em] uppercase
```

### 字重使用规则
- **标题**：必须用 800 或 900（font-extrabold / font-black）
- **副标题**：600-700
- **正文**：400，不要用 300（太轻，低对比度）
- **标签/badge**：600，配合 uppercase + 字间距
- **禁止**：同一个页面出现超过 3 种字重

### 行距规则
- 大标题：line-height 1.0 - 1.1（紧凑，有力）
- 副标题：line-height 1.3 - 1.4
- 正文段落：line-height 1.65 - 1.75（宽松，易读）
- 卡片内文字：line-height 1.5

### 字间距规则
- 大标题：tracking-[-0.03em]（负字间距，更有力）
- 正文：tracking-normal（0）
- 小标签/label：tracking-[0.06em] 到 tracking-[0.1em]（宽字间距）

---

## 三、间距系统（Spacing）

### 8px 基础网格
所有间距必须是 8 的倍数：8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128px

对应 Tailwind：2 / 4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 32

### Section 间距规范
```
section 上下 padding：  py-24 md:py-32  （不要 py-16，太紧）
section 内容 max-width： max-w-7xl mx-auto px-4 md:px-6 lg:px-8
相邻元素间距：          gap-5（卡片）/ gap-12（大块）/ gap-3（密集列表）
标题与内容间距：        mb-4（紧） / mb-6（标准） / mb-16（宽）
```

### 卡片内部间距
```
padding：    p-6（标准）/ p-8（宽松）
icon 到标题：mb-4
标题到正文：  mb-2
内容到按钮：  mt-6
```

---

## 三点五、字体选择指南（Font Selection）

### 按风格分类的推荐字体（Google Fonts）

**工业 / 街头 / 潮牌**
- `Space Grotesk` — 几何感，略带粗糙，现代
- `Barlow Condensed` — 压缩感，工业力量
- `Bebas Neue` — 全大写，极强力量感（只用于标题）
- `Rajdhani` — 科技感几何，适合潮牌副标题
- `DM Mono` — 等宽感，技术/极客风

**高端 / 奢华 / 精品**
- `Cormorant Garamond` — 纤细衬线，极致优雅（Vibe F 首选）
- `Playfair Display` — 高对比衬线，经典奢华
- `Libre Baskerville` — 可读性强的衬线，适合内容类
- `Lora` — 温暖的现代衬线

**干净 / 现代 / 科技**
- `Inter` — 全能选手，屏幕可读性最佳（默认推荐）
- `Geist` — Next.js 官方字体，极简现代
- `Plus Jakarta Sans` — 友好的几何无衬线
- `Outfit` — 圆润，年轻感

**有机 / 温暖 / 手作**
- `Nunito` — 圆润友好，适合亲子/食品
- `Quicksand` — 轻盈有机感
- `Poppins` — 几何圆润，活力

**混搭规则：**
- 标题用 Display/Serif + 正文用 Sans-serif = 高级感
- 两种字体最多，超过两种显乱
- 同类型（两种 sans-serif）混用时，字重对比必须拉开 3 级以上

### 自定义字体技术集成

```tsx
// src/app/layout.tsx — 加载 Google Font
import { Cormorant_Garamond, Inter } from 'next/font/google'

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* src/app/globals.css */
:root {
  --font-heading: var(--font-heading);  /* 来自 next/font */
  --font-body: var(--font-body);
}
```

```js
// tailwind.config.ts
extend: {
  fontFamily: {
    heading: ['var(--font-heading)', 'serif'],
    body: ['var(--font-body)', 'sans-serif'],
  }
}
```

```tsx
{/* 使用 */}
<h1 className="font-heading font-bold">标题</h1>
<p className="font-body">正文</p>
```

---

## 三点七、背景纹理与质感（Surface Texture）

**何时使用：** 用户要求"磨砂感""纸张感""有质感""不要平"时，以及 Vibe D / Vibe F 场景。

### 方案 A — CSS Noise（轻量，推荐）

```css
/* globals.css */
.texture-noise {
  position: relative;
}
.texture-noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}
```

```tsx
{/* 使用 */}
<section className="relative texture-noise bg-[#faf8f4]">
  <div className="relative z-10">内容</div>
</section>
```

### 方案 B — Tailwind 内联（更快）

```tsx
<div className="relative">
  {/* 噪点纹理叠加层 */}
  <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }}
  />
  内容
</div>
```

### 方案 C — 渐变纹理（纸张/布料感）

```tsx
<section style={{
  background: `
    radial-gradient(ellipse at 20% 50%, rgba(176,141,87,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(201,168,130,0.06) 0%, transparent 50%),
    #faf8f4
  `
}}>
```

**纹理使用原则：**
- opacity 不超过 0.05（太明显变粗糙）
- 只在大块背景区域用，不在卡片内用
- 纹理层必须加 `pointer-events: none`

---

## 四、颜色使用规则

### 颜色层次（深色系）

```
层 0 - 页面背景：     var(--bg)          （最深）
层 1 - 区块背景：     white/3 到 white/5
层 2 - 卡片背景：     white/4 到 white/7
层 3 - 悬停态：       white/8 到 white/10
层 4 - 边框：         white/7 到 white/12
层 5 - 禁用文字：     slate-600
层 6 - 辅助文字：     slate-400 到 slate-500
层 7 - 次要文字：     slate-300
层 8 - 主文字：       white
```

### 主色使用规则
- 主色**只用于**：主 CTA 按钮、强调图标、激活状态、进度指示、渐变文字
- 不要把主色大面积铺背景（会显得廉价）
- 主色的低透明度变体（primary/10 到 primary/20）可以用于卡片背景、角标
- 渐变要用**相邻色相**（同色系深浅），不要用对比色渐变（除非 Vibe C）

### 渐变规范
```css
/* ✅ 好的渐变：同色相，有深度 */
from-violet-600 to-indigo-700
from-[#6d28d9] to-[#4338ca]

/* ✅ 好的渐变文字 */
bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent

/* ❌ 避免：彩虹渐变（除非刻意风格） */
from-pink-500 via-yellow-400 to-cyan-400
```

### 边框处理
```tsx
// ✅ 深色系标准边框
className="border border-white/8"
// ✅ 悬停高亮
className="border border-white/8 hover:border-white/16 transition-colors"
// ✅ 主色高亮边框（聚焦/选中状态）
className="border border-[var(--primary)]/40"
// ❌ 不要用 border-gray-700（太硬，不通透）
```

---

## 五、动效规范（Motion）

### 贝塞尔曲线标准库

```ts
const easings = {
  // 主力：出场感强，有弹性收尾
  out:       [0.22, 1, 0.36, 1],          // 快速加速，缓慢停止
  // 弹性：适合卡片、模态框
  spring:    { type: 'spring', stiffness: 280, damping: 22 },
  // 柔和：适合背景、遮罩
  smooth:    [0.4, 0, 0.2, 1],
  // 强调：适合 Hero 标题
  dramatic:  [0.76, 0, 0.24, 1],
}
// 对应使用：
// transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
```

### 动效时长规范
```
微交互（hover/focus）：  150ms - 200ms，用 CSS transition
小元素入场（icon/badge）：300ms - 400ms
标准入场（卡片/段落）：  500ms - 650ms
大元素入场（Hero标题）： 700ms - 900ms
页面级过渡：             400ms - 500ms
禁止超过：               1000ms（除非是背景氛围动效）
```

### 动效场景对应规范

**场景 1：页面滚动入场（最常用）**
```tsx
// 基础：上移淡入
initial={{ opacity: 0, y: 32 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-80px' }}  // 提前 80px 触发
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

**场景 2：列表交错（stagger）**
```tsx
// 父容器
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
// 子元素
const listItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}
// 使用
<motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
  <motion.li variants={listItem}>...</motion.li>
</motion.ul>
```

**场景 3：Hero 标题逐词入场**
```tsx
function SplitTitle({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <motion.span
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      initial="hidden" animate="show"
    >
      {words.map((word, i) => (
        <motion.span key={i} className="inline-block mr-[0.2em]"
          variants={{
            hidden: { opacity: 0, y: '0.5em', skewX: '-3deg' },
            show: { opacity: 1, y: 0, skewX: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
          }}
        >{word}</motion.span>
      ))}
    </motion.span>
  )
}
```

**场景 4：卡片悬停**
```tsx
<motion.div
  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
  className="... transition-[border-color,background-color] duration-200
    hover:border-[var(--primary)]/25 hover:bg-white/[0.06]"
>
```
注意：y 偏移用 spring，颜色变化用 CSS transition（更高效）

**场景 5：按钮点击反馈**
```tsx
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
```

**场景 6：数字计数器**
```tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion'

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const val = useMotionValue(0)
  const display = useTransform(val, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`)

  useEffect(() => {
    if (inView) animate(val, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1] })
  }, [inView])

  return <motion.span ref={ref}>{display}</motion.span>
}
```

**场景 7：背景滚动视差**
```tsx
'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

function ParallaxSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
```

**场景 8：渐进式图片加载（占位过渡）**
```tsx
function ImageCard() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-xl aspect-square">
      <motion.div
        animate={{ opacity: loaded ? 0 : 1 }}
        className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 animate-pulse"
      />
      <motion.img
        onLoad={() => setLoaded(true)}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full object-cover"
        src="..."
      />
    </div>
  )
}
```

### 禁止使用的动效
- `transition: all`（性能差，会触发 layout）
- 只动 `width` / `height` / `top` / `left`（用 transform 替代）
- 超过 1 秒的普通 UI 交互动效
- bounce 过于强烈（stiffness > 400 且 damping < 15 会显廉价）
- 同时触发超过 8 个 stagger 子元素（用虚拟化或分批）

### 无障碍与性能强制规则

**useReducedMotion — 所有动效组件必须接入：**
```tsx
import { useReducedMotion } from 'framer-motion'

function AnimatedCard() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
    />
  )
}
```
- **规则**：`y` / `scale` / `rotate` 偏移量在 `shouldReduce` 为 true 时归零
- **规则**：`duration` 在 `shouldReduce` 为 true 时设为 `0.01`（不可设 0，framer 会跳帧）
- **规则**：parallax、stagger、counter 类动效在 `shouldReduce` 下完全禁用

**CSS 基线（globals.css 必须包含）：**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**移动端性能目标（Lighthouse）：**
| 指标 | 目标 |
|------|------|
| Performance | ≥ 85 |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| FID / INP | < 200 ms |
- Hero 区背景视频禁止自动播放（用 poster 静态图代替，移动端检测用 `window.innerWidth < 768`）
- 粒子数量移动端 ≤ 30，桌面端 ≤ 80
- 渐变 mesh / blob 动效：移动端降级为静态渐变

---

## 五·五、next/image 使用规范（强制）

### 基础规则
```tsx
import Image from 'next/image'

// ✅ Hero / LCP 图像：必须加 priority
<Image src="/hero.jpg" alt="..." fill priority sizes="100vw" />

// ✅ fill 模式容器必须有 position: relative + 明确尺寸
<div className="relative w-full h-[600px]">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

// ✅ 列表图像：必须写 sizes 避免下载过大图
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
  className="object-cover rounded-xl"
/>

// ❌ 禁止
<img src="..." />                    // 直接用 img 标签
<Image src="..." width={400} height={400} />  // fill 模式漏写 sizes
```

### 外部域名白名单（next.config.ts）
```ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.pexels.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
    ],
  },
}
```

### 占位符（blur placeholder）
```tsx
// 本地图片自动生成 blurDataURL
import heroImg from '@/public/hero.jpg'
<Image src={heroImg} alt="..." fill priority placeholder="blur" />

// 外部图片用 shimmer base64
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#1a1a2e"/>
</svg>`
const toBase64 = (str: string) => Buffer.from(str).toString('base64')
<Image
  src={url}
  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}`}
  placeholder="blur"
/>
```

---

## 六、微交互清单（每个交互元素必须覆盖）

### 按钮（Button）
```
默认：    渐变背景 + 清晰文字 + 适当 padding
Hover：   scale(1.03) + 加深阴影 + 内部光晕变亮
Active：  scale(0.96) + 阴影收缩
Focus：   ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--bg)]
Disabled：opacity-40 cursor-not-allowed（不要 hover 效果）
Loading： 按钮内显示 spinner，文字变"处理中..."，禁用点击
```

### 输入框（Input）
```
默认：    border border-white/10 bg-white/5 rounded-xl
Focus：   border-[var(--primary)]/50 ring-1 ring-[var(--primary)]/20
Error：   border-red-500/50 bg-red-500/5
Success： border-emerald-500/50 bg-emerald-500/5
Disabled：opacity-40 cursor-not-allowed bg-white/3
```

### 卡片（Card）
```
默认：    bg-white/[0.04] border border-white/[0.08] rounded-2xl
Hover：   y: -6px + border-[var(--primary)]/20 + bg-white/[0.06]
Active：  y: -2px（轻按感）
Focus within：border-[var(--primary)]/30
```

### 链接（Link）
```
默认：    text-slate-400 无下划线
Hover：   text-white + 下划线（underline-offset-4）
Active：  opacity-70
Visited： text-slate-500（可选，看场景）
```

### 导航项
```
默认：    text-slate-400 text-sm
Hover：   text-white
Active：  text-white font-medium + 可选底部线条指示器
当前页：  text-white + 背景色标记
```

### 图标按钮（Icon Button）
```
默认：    text-slate-500 w-9 h-9 rounded-lg
Hover：   text-slate-200 bg-white/8
Active：  scale(0.9)
```

---

## 七、布局规范

### 内容宽度
```
最大内容宽：   max-w-7xl（1280px）
文章/介绍：    max-w-3xl（重要：不要让正文行宽超过 70 字符）
Hero 标题：    max-w-5xl（居中时）
全宽区块：     不设 max-w，但内容仍在 container 内
```

### 网格布局
```
2 列等分：     grid-cols-1 md:grid-cols-2
3 列卡片：     grid-cols-1 md:grid-cols-2 lg:grid-cols-3
4 列小卡：     grid-cols-2 md:grid-cols-4
非对称双列：   grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] 或 [2fr_1fr]
```

### 视觉对齐规则
- 同一区块内，文字对齐方式必须统一（不能标题居中、正文左对齐）
- 宽容器内（>768px）长段落正文必须左对齐，不要居中（影响可读性）
- Hero 区居中没问题，但正文段落居中的字数不超过 40 个字

### Z 轴层次（创造深度感）
```
背景光晕：     z-0
纹理层：       z-0
装饰图形：     z-0 或 absolute（不影响布局）
内容：         relative z-10（确保在光晕上方）
浮动元素：     z-20
Navbar：       z-50
模态/抽屉：    z-[100]
Toast：        z-[200]
```

---

## 八、反模式清单（禁止出现）

### 视觉反模式
```
❌ 纯黑背景 #000000（用 #050508 / #0a0a0f 等带色调的深色）
❌ 默认灰色图片占位（用品牌渐变色替代）
❌ box-shadow: 0 2px 4px rgba(0,0,0,0.3)（2015 年风格）
❌ 渐变超过 3 个颜色停止点（过于花哨）
❌ 页面内使用超过 4 种不同圆角值（统一用 rounded-xl 或 rounded-2xl）
❌ 段落文字用 opacity: 0.5（用 text-slate-400 等语义颜色）
❌ 所有文字都居中（只有 Hero、CTA 区居中）
❌ 按钮宽度撑满全行（除非是 modal 内或移动端）
```

### 代码反模式
```
❌ 内联样式 style={{ color: '#xxx' }}（改用 CSS 变量 + Tailwind）
❌ transition: all（改用具体属性：transition-[transform,opacity]）
❌ 用 img 标签（改用 next/image）
❌ 不给交互元素加 aria-label
❌ 颜色硬编码在组件内（应从 CSS 变量读取）
❌ 用 setTimeout 模拟 loading（用真实 async 状态）
❌ 忘记 loading / error / empty 三个状态
```

### 动效反模式
```
❌ 每个元素都加动效（视觉噪音，适可而止）
❌ duration > 1s 的常规入场动效（背景氛围除外）
❌ 用 animate 而不是 whileInView（首屏之外的内容不该立即动）
❌ 过度 bounce（stiffness 超高，damping 超低）
❌ 动效方向不一致（有些从下、有些从左，显混乱）
```

### 文案反模式
```
❌ 使用 "Lorem ipsum" 或任何占位文字
❌ 特性描述式标题（"支持多种格式"）← 改成利益式（"格式不是问题"）
❌ "了解更多" / "点击这里" 这类无意义 CTA
❌ 在 Hero 里堆砌超过 3 个 feature badge
❌ 同一个页面出现超过 2 次 "立即" 开头的 CTA
```

---

## 九、文案规范

### Hero 标题公式
```
公式 1 - 结果式：[用户想要的结果]，[不需要/不用] [痛点]
  例：「卖出更多，不用靠广告」

公式 2 - 身份转变式：从 [现状] 到 [理想]
  例：「从小摊主到独立品牌」

公式 3 - 大胆承诺式：[极致结果] 的 [核心方法]
  例：「10 分钟，一个让人记住的网站」

公式 4 - 对比式：[竞品弱点] 已经过时，[你的方案] 才是未来
  例：「模板站已过时，专属独立站才是品牌」
```

### CTA 按钮规范
```
主 CTA：动词 + 结果（"免费开始构建" / "立即获取方案" / "7 天免费试用"）
次 CTA：柔和探索（"查看案例" / "了解定价" / "先看看效果"）
危险操作：明确说明后果（"确认删除" 不要只写 "确认"）
```

### 数字和社会证明
```
优先展示具体数字："2,340 个品牌在用" > "数千个品牌在用"
评分必须真实感：4.8 / 5 > 5 / 5（太完美反而不可信）
评价内容要具体：说出具体使用场景，不要泛泛称赞
```

---

## 十、组件模式速查

### 渐变描边卡片
```tsx
<div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/20 to-white/5">
  <div className="bg-[var(--bg)] rounded-[15px] p-6">
    内容
  </div>
</div>
```

### Badge / 标签
```tsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
  bg-[var(--primary)]/10 border border-[var(--primary)]/20
  text-[var(--primary)] text-xs font-semibold tracking-wide">
  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
  标签文字
</span>
```

### 磨砂玻璃 Navbar
```tsx
<nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
  scrolled
    ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-white/6 shadow-lg shadow-black/20'
    : 'bg-transparent'
}`}>
```

### 数据统计区（Stats Row）
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
  {stats.map(stat => (
    <div key={stat.label} className="bg-[var(--bg)] px-6 py-8 flex flex-col gap-1">
      <span className="text-3xl font-black text-white">
        <Counter to={stat.value} suffix={stat.suffix} />
      </span>
      <span className="text-sm text-slate-500">{stat.label}</span>
    </div>
  ))}
</div>
```

### 功能对比表（Comparison）
```tsx
// 竞品 vs 你的产品，用对勾和叉号展示
<div className="grid grid-cols-[1fr_auto_auto] gap-0 border border-white/10 rounded-2xl overflow-hidden">
  <div className="p-4 border-b border-white/10 text-slate-500 text-sm">功能</div>
  <div className="p-4 border-b border-l border-white/10 text-center text-slate-500 text-sm">竞品</div>
  <div className="p-4 border-b border-l border-[var(--primary)]/30 bg-[var(--primary)]/5 text-center text-[var(--primary)] text-sm font-semibold">你的品牌</div>
  {features.map(f => (/* 每行 */))}
</div>
```

### Toast 通知
```tsx
// 使用 Framer Motion AnimatePresence 实现滑入
<AnimatePresence>
  {toast && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]
        bg-white/10 backdrop-blur-xl border border-white/15
        rounded-2xl px-5 py-3.5 text-sm text-white shadow-2xl"
    >
      {toast.message}
    </motion.div>
  )}
</AnimatePresence>
```
