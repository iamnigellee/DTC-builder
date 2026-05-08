import { create } from 'zustand'
import {
  BuilderStep,
  ConversationContext,
  GeneratedFile,
  Message,
  SiteRequirements,
} from '@/lib/types'
import { generateId } from '@/lib/utils'

interface BuilderState {
  messages: Message[]
  context: ConversationContext
  generatedFiles: GeneratedFile[]
  isStreaming: boolean
  activePreviewFile: string

  addMessage: (role: Message['role'], content: string) => Message
  updateLastMessage: (content: string) => void
  setStreamingDone: () => void
  setStep: (step: BuilderStep) => void
  updateRequirements: (reqs: Partial<SiteRequirements>) => void
  setGeneratedFiles: (files: GeneratedFile[]) => void
  mergeGeneratedFiles: (files: GeneratedFile[]) => void
  setActivePreviewFile: (path: string) => void
  setStreaming: (v: boolean) => void
  reset: () => void
}

const initialContext: ConversationContext = {
  step: 'welcome',
  requirements: {},
  collectedFields: [],
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  messages: [],
  context: initialContext,
  generatedFiles: [],
  isStreaming: false,
  activePreviewFile: 'src/app/page.tsx',

  addMessage(role, content) {
    const msg: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
      isStreaming: role === 'assistant' && content === '',
    }
    set((s) => ({ messages: [...s.messages, msg] }))
    return msg
  },

  updateLastMessage(content) {
    set((s) => {
      const msgs = [...s.messages]
      const last = msgs[msgs.length - 1]
      if (last && last.role === 'assistant') {
        msgs[msgs.length - 1] = { ...last, content, isStreaming: true }
      }
      return { messages: msgs }
    })
  },

  setStreamingDone() {
    set((s) => {
      const msgs = [...s.messages]
      const last = msgs[msgs.length - 1]
      if (last) msgs[msgs.length - 1] = { ...last, isStreaming: false }
      return { messages: msgs, isStreaming: false }
    })
  },

  setStep(step) {
    set((s) => ({ context: { ...s.context, step } }))
  },

  updateRequirements(reqs) {
    set((s) => ({
      context: {
        ...s.context,
        requirements: { ...s.context.requirements, ...reqs },
      },
    }))
  },

  setGeneratedFiles(files) {
    set({ generatedFiles: files })
    const main = files.find(
      (f) => f.path === 'src/app/page.tsx' || f.path.endsWith('page.tsx')
    )
    if (main) set({ activePreviewFile: main.path })
  },

  mergeGeneratedFiles(changedFiles) {
    set((s) => {
      const merged = [...s.generatedFiles]
      for (const file of changedFiles) {
        const idx = merged.findIndex((f) => f.path === file.path)
        if (idx >= 0) {
          merged[idx] = file
        } else {
          merged.push(file)
        }
      }
      return { generatedFiles: merged }
    })
  },

  setActivePreviewFile(path) {
    set({ activePreviewFile: path })
  },

  setStreaming(v) {
    set({ isStreaming: v })
  },

  reset() {
    set({ messages: [], context: initialContext, generatedFiles: [], isStreaming: false })
  },
}))
