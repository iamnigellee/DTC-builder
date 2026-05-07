import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GeneratedFile } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

// Parse code blocks from AI response like: ```tsx:src/app/page.tsx ... ```
export function parseGeneratedFiles(text: string): GeneratedFile[] {
  const files: GeneratedFile[] = []
  const regex = /```(\w+):([^\n]+)\n([\s\S]*?)```/g
  let match

  while ((match = regex.exec(text)) !== null) {
    const [, lang, path, content] = match
    files.push({
      path: path.trim(),
      content: content.trim(),
      language: lang as GeneratedFile['language'],
    })
  }

  // Also parse ```tsx ... ``` blocks without path (assign default paths)
  if (files.length === 0) {
    const simpleRegex = /```(?:tsx|ts|jsx|js)\n([\s\S]*?)```/g
    let i = 0
    while ((match = simpleRegex.exec(text)) !== null) {
      files.push({
        path: `src/components/Component${i++}.tsx`,
        content: match[1].trim(),
        language: 'tsx',
      })
    }
  }

  return files
}

// Build Sandpack files map from GeneratedFile[]
export function buildSandpackFiles(
  generatedFiles: GeneratedFile[]
): Record<string, { code: string }> {
  const files: Record<string, { code: string }> = {}
  for (const file of generatedFiles) {
    files[`/${file.path}`] = { code: file.content }
  }
  return files
}

// Extract JSON state block from AI message
export function extractStateUpdate(text: string): {
  step?: string
  requirements?: Record<string, unknown>
  readyToGenerate?: boolean
} | null {
  const match = text.match(/```json\n([\s\S]*?)```/)
  if (!match) return null
  try {
    return JSON.parse(match[1])
  } catch {
    return null
  }
}

// Strip the JSON block from display text
export function stripStateBlock(text: string): string {
  return text.replace(/```json\n[\s\S]*?```/g, '').trim()
}
