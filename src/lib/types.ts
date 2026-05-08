export type BuilderStep =
  | 'welcome'
  | 'collecting'
  | 'designing'
  | 'generating'
  | 'preview'
  | 'refining'

export type MessageRole = 'user' | 'assistant' | 'system'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface SiteRequirements {
  businessType: string
  businessName: string
  tagline: string
  targetAudience: string
  primaryGoal: string
  vibe?: string
  features: SiteFeature[]
  colorPalette: ColorPalette
  fontStyle: FontStyle
  tone: string
  sections: SectionConfig[]
  ecommerce?: EcommerceConfig
  contactInfo?: ContactConfig
  referenceStyle?: string
}

export type SiteFeature =
  | 'ecommerce'
  | 'payment'
  | 'blog'
  | 'booking'
  | 'gallery'
  | 'testimonials'
  | 'contact'
  | 'newsletter'
  | 'faq'
  | 'pricing'
  | 'team'
  | 'portfolio'

export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  muted: string
}

export type FontStyle = 'modern' | 'classic' | 'playful' | 'minimal' | 'bold'

export interface SectionConfig {
  type: SectionType
  variant: string
  content: Record<string, unknown>
}

export type SectionType =
  | 'hero'
  | 'navbar'
  | 'features'
  | 'products'
  | 'testimonials'
  | 'pricing'
  | 'gallery'
  | 'team'
  | 'faq'
  | 'contact'
  | 'newsletter'
  | 'footer'
  | 'cta'
  | 'stats'
  | 'blog'
  | 'menu'

export interface EcommerceConfig {
  productCount: number
  hasCart: boolean
  hasCheckout: boolean
  paymentProvider: 'stripe' | 'paypal' | 'wechat_qr' | 'none'
  currency: string
}

export interface ContactConfig {
  email: string
  phone?: string
  address?: string
  social?: SocialLinks
  mapEmbed?: string
  businessHours?: string
}

export interface SocialLinks {
  instagram?: string
  twitter?: string
  facebook?: string
  linkedin?: string
  tiktok?: string
  wechat?: string
}

export interface GeneratedSite {
  id: string
  requirements: SiteRequirements
  files: GeneratedFile[]
  previewUrl?: string
  createdAt: Date
}

export interface GeneratedFile {
  path: string
  content: string
  language: 'tsx' | 'ts' | 'css' | 'json' | 'md'
}

export interface ConversationContext {
  step: BuilderStep
  requirements: Partial<SiteRequirements>
  collectedFields: string[]
  generatedSite?: GeneratedSite
}

export interface StreamChunk {
  type: 'text' | 'code' | 'step_change' | 'requirements_update' | 'done' | 'error'
  content?: string
  step?: BuilderStep
  requirements?: Partial<SiteRequirements>
  error?: string
}
