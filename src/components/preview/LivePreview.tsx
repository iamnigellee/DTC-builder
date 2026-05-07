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
const makeFont = (family) => () => ({
  className: '',
  variable: '--font-custom',
  style: { fontFamily: family },
})
export const Inter = makeFont('Inter, sans-serif')
export const Geist = makeFont('system-ui, sans-serif')
export const Geist_Mono = makeFont('monospace')
export const Playfair_Display = makeFont('"Playfair Display", Georgia, serif')
export const Cormorant_Garamond = makeFont('"Cormorant Garamond", Georgia, serif')
export const Space_Grotesk = makeFont('"Space Grotesk", sans-serif')
export const Plus_Jakarta_Sans = makeFont('"Plus Jakarta Sans", sans-serif')
export const DM_Sans = makeFont('"DM Sans", sans-serif')
export const Outfit = makeFont('Outfit, sans-serif')
export const Nunito = makeFont('Nunito, sans-serif')
export const Lora = makeFont('Lora, Georgia, serif')
export const Raleway = makeFont('Raleway, sans-serif')
export const Bebas_Neue = makeFont('"Bebas Neue", Impact, sans-serif')
export const Barlow_Condensed = makeFont('"Barlow Condensed", sans-serif')
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
}

export function LivePreview({ files, width = '100%' }: LivePreviewProps) {
  const sandpackFiles = useMemo(() => buildSandpackFiles(files), [files])

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
        theme="dark"
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
