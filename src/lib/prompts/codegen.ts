import { SiteRequirements } from '../types'

export function buildCodeGenPrompt(requirements: SiteRequirements): string {
  const featuresStr = requirements.features?.join(', ') || '基础展示'
  const sectionsStr = requirements.sections
    ?.map((s) => s.type)
    .join(', ') || 'hero, features, testimonials, contact, footer'

  return `请根据以下需求生成完整的独立站网站代码：

## 项目信息
- 业务类型：${requirements.businessType}
- 品牌名称：${requirements.businessName}
- 标语：${requirements.tagline}
- 目标用户：${requirements.targetAudience}
- 主要目标：${requirements.primaryGoal}
- 品牌调性：${requirements.tone}

## 功能模块
${featuresStr}

## 页面结构
${sectionsStr}

## 设计规范
配色方案：
- 主色：${requirements.colorPalette?.primary || '#6366f1'}
- 辅色：${requirements.colorPalette?.secondary || '#8b5cf6'}
- 强调色：${requirements.colorPalette?.accent || '#f59e0b'}
- 背景：${requirements.colorPalette?.background || '#0a0a0a'}
- 文字：${requirements.colorPalette?.text || '#ffffff'}

字体风格：${requirements.fontStyle || 'modern'}

## 特别要求
1. Hero 区要有震撼的视觉冲击力，使用大标题 + 渐变文字 + 动效背景
2. 所有 section 都要有 Framer Motion 入场动画
3. 按钮要有悬浮光晕效果
4. 配色要有层次感，用透明度和渐变创造深度
5. 移动端完美适配
${requirements.ecommerce ? `6. 包含完整的电商功能：产品网格、加入购物车、结账流程` : ''}
${requirements.features?.includes('payment') ? `7. 包含 Stripe 支付按钮示例` : ''}

## 生成要求
- 生成完整可运行的代码
- 每个组件单独文件
- 使用真实感的占位内容（不要用 "Lorem ipsum"，用符合业务的文案）
- globals.css 要包含完整的设计系统变量和自定义动画`
}

export function buildRefinementPrompt(
  currentCode: string,
  userRequest: string
): string {
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
