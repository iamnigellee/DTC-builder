import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'
import { GeneratedFile } from '@/lib/types'

export async function POST(req: NextRequest) {
  const { files }: { files: GeneratedFile[] } = await req.json()

  const zip = new JSZip()

  // Add generated source files
  for (const file of files) {
    zip.file(file.path, file.content)
  }

  // Add package.json
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'my-dtc-site',
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          next: '^15.0.0',
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          'framer-motion': '^11.0.0',
          'lucide-react': '^0.400.0',
        },
        devDependencies: {
          typescript: '^5',
          '@types/node': '^20',
          '@types/react': '^19',
          '@types/react-dom': '^19',
          tailwindcss: '^4',
          '@tailwindcss/postcss': '^4',
        },
      },
      null,
      2
    )
  )

  // Add tsconfig
  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [{ name: 'next' }],
          paths: { '@/*': ['./src/*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2
    )
  )

  // next.config.ts
  zip.file(
    'next.config.ts',
    `import type { NextConfig } from 'next'
const nextConfig: NextConfig = {}
export default nextConfig
`
  )

  // postcss.config.mjs (required for Tailwind v4)
  zip.file(
    'postcss.config.mjs',
    `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`
  )

  // Add setup README
  zip.file(
    'README.md',
    `# 你的网站 — 使用指南

由 DTC Builder AI 生成。

---

## 第一步：本地预览

**前提：** 需要安装 Node.js（没装过？去 https://nodejs.org 下载 LTS 版本）

在此文件夹中打开终端，运行：

\`\`\`bash
npm install
npm run dev
\`\`\`

然后浏览器打开 http://localhost:3000 即可看到效果。

---

## 第二步：免费上线（约 5 分钟）

1. 注册 [GitHub](https://github.com) 账号（免费）
2. 新建仓库，把这个文件夹所有文件上传进去
3. 注册 [Vercel](https://vercel.com) 账号（用 GitHub 直接登录，免费）
4. 在 Vercel 点击 **Add New Project** → 选择你的 GitHub 仓库 → **Deploy**
5. 等待约 2 分钟，网站自动上线，获得免费域名 \`your-site.vercel.app\`

---

## 第三步：绑定自己的域名（可选）

在阿里云 / 腾讯云 / Namecheap 购买域名（约 ¥60-100/年），
然后在 Vercel 项目 **Settings → Domains** 里添加，有一步步的图文说明。

---

## 日常修改

| 想改什么 | 操作方法 |
|---------|---------|
| 修改文字 | 用 VS Code 打开对应组件文件，找到文字直接改，保存后网站自动更新 |
| 换图片 | 把新图片放入 \`public/images/\` 文件夹，替换对应文件名 |
| 改颜色 | 打开 \`src/app/globals.css\`，修改顶部 CSS 变量中的颜色值 |
| 加新功能 | 回到 DTC Builder 继续对话，重新生成或局部修改 |

---

## 环境变量配置（如有 Stripe / 邮件等功能）

在 Vercel 项目 **Settings → Environment Variables** 中添加：

\`\`\`
ANTHROPIC_API_KEY=你的key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_URL=https://your-domain.com
\`\`\`

本地开发时，在根目录新建 \`.env.local\` 文件，同样格式写入。

---

## 遇到问题？

- **npm install 报错**：确认 Node.js 版本 ≥ 18
- **Vercel 部署失败**：查看 Vercel 部署页面的红色错误日志
- **样式显示不对**：检查 \`src/app/globals.css\` 的 CSS 变量是否完整
`
  )

  const arrayBuffer = await zip.generateAsync({ type: 'arraybuffer', compression: 'DEFLATE' })

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="my-website.zip"',
    },
  })
}
