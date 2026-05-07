'use client'

import { useMemo } from 'react'
import { SandpackProvider, SandpackPreview } from '@codesandbox/sandpack-react'
import { GeneratedFile } from '@/lib/types'

// ── Shims for Next.js APIs that don't exist in browser Sandpack ──────────────

const IMAGE_SHIM = `
const Image = ({ src, alt, fill, priority, sizes, width, height, className, style, ...props }) => {
  const fillStyle = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {}
  return (
    <img
      src={src || ''}
      alt={alt || ''}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      style={{ ...fillStyle, ...style }}
      className={className}
    />
  )
}
export default Image
`

const LINK_SHIM = `
const Link = ({ href, children, className, target, rel, ...props }) => (
  <a href={href || '#'} className={className} target={target} rel={rel} {...props}>
    {children}
  </a>
)
export default Link
`

const FONTS_SHIM = `
const makeFont = (family: string, varName: string) => () => ({
  className: '',
  variable: varName,
  style: { fontFamily: family },
})
export const Inter = makeFont('Inter, sans-serif', '--font-inter')
export const Geist = makeFont('system-ui, sans-serif', '--font-geist')
export const Geist_Mono = makeFont('monospace', '--font-geist-mono')
export const Playfair_Display = makeFont('"Playfair Display", Georgia, serif', '--font-playfair')
export const Cormorant_Garamond = makeFont('"Cormorant Garamond", Georgia, serif', '--font-cormorant')
export const Space_Grotesk = makeFont('"Space Grotesk", sans-serif', '--font-space-grotesk')
export const Plus_Jakarta_Sans = makeFont('"Plus Jakarta Sans", sans-serif', '--font-jakarta')
export const DM_Sans = makeFont('"DM Sans", sans-serif', '--font-dm-sans')
export const Outfit = makeFont('Outfit, sans-serif', '--font-outfit')
export const Nunito = makeFont('Nunito, sans-serif', '--font-nunito')
export const Lora = makeFont('Lora, Georgia, serif', '--font-lora')
export const Raleway = makeFont('Raleway, sans-serif', '--font-raleway')
export const Bebas_Neue = makeFont('"Bebas Neue", Impact, sans-serif', '--font-bebas')
export const Barlow_Condensed = makeFont('"Barlow Condensed", sans-serif', '--font-barlow')
export const Montserrat = makeFont('Montserrat, sans-serif', '--font-montserrat')
export const Roboto = makeFont('Roboto, sans-serif', '--font-roboto')
export const Open_Sans = makeFont('"Open Sans", sans-serif', '--font-open-sans')
export const Poppins = makeFont('Poppins, sans-serif', '--font-poppins')
export const Source_Sans_3 = makeFont('"Source Sans 3", sans-serif', '--font-source-sans')
export const Noto_Sans_SC = makeFont('"Noto Sans SC", sans-serif', '--font-noto-sc')
export const Noto_Serif_SC = makeFont('"Noto Serif SC", serif', '--font-noto-serif-sc')
export const DM_Serif_Display = makeFont('"DM Serif Display", serif', '--font-dm-serif')
export const Josefin_Sans = makeFont('"Josefin Sans", sans-serif', '--font-josefin')
`

const NAVIGATION_SHIM = `
export function useRouter() {
  return {
    push: (_url: string) => {},
    replace: (_url: string) => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
    prefetch: (_url: string) => {},
  }
}
export function usePathname() { return '/' }
export function useSearchParams() { return new URLSearchParams() }
export function notFound() { return null }
export function redirect(_url: string) { return null }
`

// ── Transform Next.js code to plain React for Sandpack ──────────────────────

function stripNextJs(code: string): string {
  return (
    code
      // Remove directives
      .replace(/^['"]use (client|server)['"]\s*\n?/gm, '')
      // Swap Next.js imports to shims
      .replace(/from ['"]next\/image['"]/g, "from '/_shims/Image'")
      .replace(/from ['"]next\/link['"]/g, "from '/_shims/Link'")
      .replace(/from ['"]next\/font\/google['"]/g, "from '/_shims/fonts'")
      .replace(/from ['"]next\/navigation['"]/g, "from '/_shims/navigation'")
      .replace(/from ['"]next\/headers['"]/g, "// next/headers removed for preview")
      // Remove Next.js-only type imports
      .replace(/import type \{ Metadata \}[^\n]*\n/g, '')
      // Remove metadata export (multi-line object)
      .replace(/export const metadata:\s*Metadata\s*=\s*\{[\s\S]*?\}\s*\n/g, '')
      .replace(/export const metadata\s*=\s*\{[\s\S]*?\}\s*\n/g, '')
      // Rewrite @/ alias to absolute /
      .replace(/from ['"]@\/(.+?)['"]/g, (_, p) => `from '/${p}'`)
      // Fix CSS imports to use absolute path
      .replace(/import ['"]\.\/globals\.css['"]/g, "import '/src/app/globals.css'")
      .replace(
        /import ['"]\.\.\/app\/globals\.css['"]/g,
        "import '/src/app/globals.css'"
      )
  )
}

// ── Build the Sandpack files map ─────────────────────────────────────────────

function buildSandpackFiles(
  generatedFiles: GeneratedFile[]
): Record<string, string> {
  const result: Record<string, string> = {
    '/_shims/Image.tsx': IMAGE_SHIM,
    '/_shims/Link.tsx': LINK_SHIM,
    '/_shims/fonts.ts': FONTS_SHIM,
    '/_shims/navigation.ts': NAVIGATION_SHIM,
  }

  // Add generated files (skip layout.tsx — App.tsx handles the root)
  for (const file of generatedFiles) {
    if (file.path.endsWith('layout.tsx')) continue
    result[`/${file.path}`] = stripNextJs(file.content)
  }

  // Find CSS path for the entry import
  const cssFile = generatedFiles.find(
    (f) => f.path.endsWith('globals.css') || f.language === 'css'
  )
  const cssImport = cssFile ? `import '/${cssFile.path}'` : ''

  // Find the main page
  const pageFile = generatedFiles.find(
    (f) => f.path === 'src/app/page.tsx' || f.path.endsWith('/page.tsx')
  )
  const pageImport = pageFile
    ? `import Page from '/${pageFile.path.replace(/\.tsx$/, '')}'`
    : ''

  result['/App.tsx'] = `
${cssImport}
${pageImport}

export default function App() {
  return ${pageFile ? '<Page />' : '<div style={{padding:40,color:"#888"}}>Preview unavailable — no page.tsx found</div>'}
}
`.trim()

  return result
}

// ── Component ────────────────────────────────────────────────────────────────

interface LivePreviewProps {
  files: GeneratedFile[]
  width?: string
  vibe?: string
}

export function LivePreview({ files, width = '100%', vibe }: LivePreviewProps) {
  const sandpackFiles = useMemo(() => buildSandpackFiles(files), [files])

  const LIGHT_VIBES = new Set(['B', 'D', 'E', 'F'])
  const sandpackTheme = vibe && LIGHT_VIBES.has(vibe.toUpperCase()) ? 'light' : 'dark'

  return (
    <div
      style={{ width, maxWidth: '100%' }}
      className="transition-all duration-300 h-full rounded-lg overflow-hidden border border-white/10 shadow-2xl"
    >
      <SandpackProvider
        template="react-ts"
        files={sandpackFiles}
        customSetup={{
          dependencies: {
            'framer-motion': '^11.0.0',
            'lucide-react': '^0.400.0',
            'clsx': '^2.0.0',
            'tailwind-merge': '^2.0.0',
          },
        }}
        options={{
          autorun: true,
          externalResources: [
            'https://cdn.tailwindcss.com',
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap',
          ],
        }}
        theme={sandpackTheme}
      >
        <SandpackPreview
          showNavigator={false}
          showOpenInCodeSandbox={false}
          style={{ height: '80vh', minHeight: '500px' }}
        />
      </SandpackProvider>
    </div>
  )
}
