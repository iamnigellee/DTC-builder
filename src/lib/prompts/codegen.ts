import { SiteRequirements } from '../types'
import { getVibeCss } from './vibes'
import { HERO_VARIANTS, NAVBAR_TEMPLATE } from '../modules/hero'
import { PRODUCT_GRID_TEMPLATE, STRIPE_CHECKOUT_TEMPLATE } from '../modules/ecommerce'
import {
  TESTIMONIALS_TEMPLATE,
  PRICING_TEMPLATE,
  FAQ_TEMPLATE,
  FOOTER_TEMPLATE,
} from '../modules/sections'

export function buildCodeGenPrompt(requirements: SiteRequirements): string {
  const vibe = requirements.vibe || 'A'
  const vibeCss = getVibeCss(vibe)
  const hasEcommerce = requirements.ecommerce || requirements.features?.includes('ecommerce')
  const hasStripe = requirements.features?.includes('payment') || requirements.ecommerce?.paymentProvider === 'stripe'
  const hasTestimonials = requirements.sections?.some(s => s.type === 'testimonials') ?? true
  const hasPricing = requirements.sections?.some(s => s.type === 'pricing')
  const hasFaq = requirements.sections?.some(s => s.type === 'faq')

  const heroVariant = HERO_VARIANTS[vibe === 'C' ? 'split' : 'gradient']

  const includedTemplates = [
    `\n### Navbar (reference implementation — adapt brand name & links):\n\`\`\`tsx\n${NAVBAR_TEMPLATE}\n\`\`\``,
    `\n### Hero (reference implementation — adapt copy & Vibe colors):\n\`\`\`tsx\n${heroVariant}\n\`\`\``,
    hasEcommerce
      ? `\n### ProductGrid (reference implementation):\n\`\`\`tsx\n${PRODUCT_GRID_TEMPLATE}\n\`\`\``
      : '',
    hasStripe
      ? `\n### Stripe Checkout (reference implementation):\n\`\`\`tsx\n${STRIPE_CHECKOUT_TEMPLATE}\n\`\`\``
      : '',
    hasTestimonials
      ? `\n### Testimonials (reference implementation):\n\`\`\`tsx\n${TESTIMONIALS_TEMPLATE}\n\`\`\``
      : '',
    hasPricing
      ? `\n### Pricing (reference implementation):\n\`\`\`tsx\n${PRICING_TEMPLATE}\n\`\`\``
      : '',
    hasFaq
      ? `\n### FAQ (reference implementation):\n\`\`\`tsx\n${FAQ_TEMPLATE}\n\`\`\``
      : '',
    `\n### Footer (reference implementation):\n\`\`\`tsx\n${FOOTER_TEMPLATE}\n\`\`\``,
  ]
    .filter(Boolean)
    .join('\n')

  const featuresStr = requirements.features?.join(', ') || '基础展示'
  const sectionsStr =
    requirements.sections?.map(s => s.type).join(', ') ||
    'hero, features, testimonials, contact, footer'

  return `请根据以下需求生成完整的独立站网站代码。

## 项目信息
- 业务类型：${requirements.businessType || ''}
- 品牌名称：${requirements.businessName || ''}
- 标语：${requirements.tagline || ''}
- 目标用户：${requirements.targetAudience || ''}
- 主要目标：${requirements.primaryGoal || ''}
- 品牌调性：${requirements.tone || ''}

## 设计风格
Vibe ${vibe}（详见系统提示中的 Vibe 描述）

配色（严格使用以下 CSS 变量，不要硬编码颜色值）：
- 主色：var(--primary) = ${requirements.colorPalette?.primary || '见 Vibe CSS'}
- 辅色：var(--secondary) = ${requirements.colorPalette?.secondary || '见 Vibe CSS'}
- 背景：var(--bg) = ${requirements.colorPalette?.background || '见 Vibe CSS'}
- 文字：var(--text) = ${requirements.colorPalette?.text || '见 Vibe CSS'}

## 功能模块
${featuresStr}

## 页面结构
${sectionsStr}

## globals.css — 使用以下精确的 CSS 变量定义（直接使用，不要修改颜色值）：

\`\`\`css
${vibeCss}
\`\`\`

## 参考实现（以这些组件为起点，用实际品牌内容和文案填充，保持同等代码质量）：
${includedTemplates}

## 生成要求
1. globals.css 必须包含上方提供的完整 CSS 变量块（一字不差，不要改颜色值）
2. 每个组件使用 var(--primary) / var(--bg) 等 CSS 变量，禁止硬编码颜色
3. 所有文案用符合业务调性的真实内容，不用 "Lorem ipsum" 或"示例文字"
4. 每个 section 都有 Framer Motion whileInView 入场动画
5. 所有可点击元素有 hover/active 微交互
6. mobile-first 响应式，Tailwind breakpoints：md:, lg:
7. 参考实现里的 PLACEHOLDER 文字（如 HEADLINE_LINE1、BRAND_NAME）替换为真实品牌内容
${hasEcommerce ? '8. 产品网格包含颜色/规格变体选择器，购物车状态用 Zustand 管理' : ''}
${hasStripe ? '9. Stripe checkout 集成完整 API route' : ''}`
}

export function buildRefinementPrompt(currentCode: string, userRequest: string): string {
  return `用户想要修改网站，请根据要求调整代码。

## 用户请求
${userRequest}

## 当前主页代码（部分）
\`\`\`tsx
${currentCode.slice(0, 3000)}
\`\`\`

请：
1. 理解用户的修改意图
2. 生成修改后的完整文件（只输出需要修改的文件）
3. 简要说明做了哪些修改`
}
