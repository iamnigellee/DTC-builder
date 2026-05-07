'use client'

import { motion } from 'framer-motion'
import { FileCode, FileType, ChevronRight } from 'lucide-react'
import { GeneratedFile } from '@/lib/types'
import { useBuilderStore } from '@/store/builderStore'
import { cn } from '@/lib/utils'

interface CodeFileTreeProps {
  files: GeneratedFile[]
}

function getFileIcon(file: GeneratedFile) {
  if (file.language === 'css') return <FileType className="w-3.5 h-3.5 text-sky-400" />
  return <FileCode className="w-3.5 h-3.5 text-violet-400" />
}

export function CodeFileTree({ files }: CodeFileTreeProps) {
  const { activePreviewFile, setActivePreviewFile } = useBuilderStore()

  // Group by directory
  const grouped: Record<string, GeneratedFile[]> = {}
  for (const file of files) {
    const parts = file.path.split('/')
    const dir = parts.slice(0, -1).join('/')
    if (!grouped[dir]) grouped[dir] = []
    grouped[dir].push(file)
  }

  return (
    <div className="py-2">
      {Object.entries(grouped).map(([dir, dirFiles]) => (
        <div key={dir}>
          <div className="flex items-center gap-1.5 px-3 py-1">
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              {dir || 'root'}
            </span>
          </div>
          {dirFiles.map((file) => {
            const filename = file.path.split('/').pop() || file.path
            const isActive = activePreviewFile === file.path
            return (
              <motion.button
                key={file.path}
                onClick={() => setActivePreviewFile(file.path)}
                whileHover={{ x: 2 }}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-1.5 text-xs transition-colors',
                  isActive
                    ? 'bg-violet-500/10 text-violet-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                )}
              >
                {getFileIcon(file)}
                <span className="truncate">{filename}</span>
              </motion.button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
