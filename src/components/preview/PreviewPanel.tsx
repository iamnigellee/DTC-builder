'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Eye, Download, Loader2, Smartphone, Monitor, Tablet, FileArchive } from 'lucide-react'
import { useBuilderStore } from '@/store/builderStore'
import { CodeFileTree } from './CodeFileTree'
import { CodeViewer } from './CodeViewer'
import { cn } from '@/lib/utils'

type ViewMode = 'code' | 'preview'
type DeviceMode = 'desktop' | 'tablet' | 'mobile'

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

export function PreviewPanel() {
  const { generatedFiles, activePreviewFile, context, isStreaming } = useBuilderStore()
  const [viewMode, setViewMode] = useState<ViewMode>('code')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [exporting, setExporting] = useState(false)

  const activeFile = generatedFiles.find((f) => f.path === activePreviewFile)
  const hasFiles = generatedFiles.length > 0
  const isGenerating = context.step === 'generating' || (isStreaming && !hasFiles)

  async function handleExport() {
    setExporting(true)
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: generatedFiles }),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-website.zip'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setViewMode('code')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              viewMode === 'code'
                ? 'bg-white/10 text-white shadow'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            代码
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              viewMode === 'preview'
                ? 'bg-white/10 text-white shadow'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            预览
          </button>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'preview' && (
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              {(['desktop', 'tablet', 'mobile'] as DeviceMode[]).map((d) => {
                const Icon = d === 'desktop' ? Monitor : d === 'tablet' ? Tablet : Smartphone
                return (
                  <button
                    key={d}
                    onClick={() => setDeviceMode(d)}
                    className={cn(
                      'p-1.5 rounded-md transition-all',
                      deviceMode === d ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                )
              })}
            </div>
          )}

          {hasFiles && (
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              导出项目
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        <AnimatePresence mode="wait">
          {!hasFiles ? (
            <EmptyState isGenerating={isGenerating} key="empty" />
          ) : viewMode === 'code' ? (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-1 overflow-hidden"
            >
              {/* File tree */}
              <div className="w-48 flex-shrink-0 border-r border-white/5 overflow-y-auto">
                <CodeFileTree files={generatedFiles} />
              </div>
              {/* Code viewer */}
              <div className="flex-1 overflow-hidden">
                {activeFile ? (
                  <CodeViewer file={activeFile} />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-600 text-sm">
                    选择文件查看代码
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 overflow-auto flex items-start justify-center bg-slate-950 p-4"
            >
              <PreviewIframe
                files={generatedFiles}
                width={DEVICE_WIDTHS[deviceMode]}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function EmptyState({ isGenerating }: { isGenerating: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center justify-center gap-5 text-center p-8"
    >
      {isGenerating ? (
        <>
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center">
              <Code2 className="w-7 h-7 text-violet-400" />
            </div>
            <div className="absolute inset-0 rounded-2xl border border-violet-500/40 animate-ping" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">正在生成网站代码...</h3>
            <p className="text-slate-500 text-sm">AI 正在为你构建专属网站，请稍等片刻</p>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-violet-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FileArchive className="w-7 h-7 text-slate-600" />
          </div>
          <div>
            <h3 className="text-slate-400 font-semibold mb-1">代码将在这里展示</h3>
            <p className="text-slate-600 text-sm">完成需求对话后，AI 会生成完整的网站代码</p>
          </div>
        </>
      )}
    </motion.div>
  )
}

function PreviewIframe({
  files,
  width,
}: {
  files: { path: string; content: string; language?: string }[]
  width: string
}) {
  // Build a simple HTML preview from the page.tsx content
  const pageFile = files.find(
    (f) => f.path === 'src/app/page.tsx' || f.path.endsWith('page.tsx')
  )
  const cssFile = files.find((f) => f.language === 'css' || f.path.endsWith('.css'))

  const previewHtml = buildPreviewHtml(
    pageFile?.content || '',
    cssFile?.content || ''
  )

  return (
    <div
      style={{ width, maxWidth: '100%' }}
      className="transition-all duration-300 shadow-2xl rounded-lg overflow-hidden border border-white/10"
    >
      <iframe
        srcDoc={previewHtml}
        className="w-full"
        style={{ minHeight: '600px', height: '80vh' }}
        sandbox="allow-scripts"
        title="网站预览"
      />
    </div>
  )
}

function buildPreviewHtml(tsxCode: string, cssCode: string): string {
  // Extract JSX-like content for a rough preview
  const bodyContent = extractPlainContent(tsxCode)

  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.tailwindcss.com"></script>
<style>
${cssCode}
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #0a0a0a; color: white; }
</style>
</head>
<body>
<div id="preview" class="min-h-screen">
${bodyContent}
</div>
</body>
</html>`
}

function extractPlainContent(tsx: string): string {
  // Return a meaningful placeholder while full Sandpack isn't used
  return `
<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px;background:linear-gradient(135deg,#0a0a0a 0%,#1a0a2e 100%)">
  <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#7c3aed,#4f46e5);display:flex;align-items:center;justify-content:center;font-size:28px">✨</div>
  <h1 style="font-size:24px;font-weight:700;color:white;margin:0">代码已生成</h1>
  <p style="color:#94a3b8;font-size:14px;margin:0;text-align:center">切换到「代码」视图查看完整源码<br>下载项目后本地运行可查看完整效果</p>
  <div style="margin-top:16px;padding:12px 24px;background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:12px;font-size:14px;font-weight:600;color:white">
    📦 共生成 ${tsx.length > 0 ? '5+ 个文件' : '...'}
  </div>
</div>`
}
