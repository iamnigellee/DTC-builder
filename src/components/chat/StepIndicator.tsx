'use client'

import { motion } from 'framer-motion'
import { Check, MessageSquare, Palette, Code2, Eye, Wand2 } from 'lucide-react'
import { BuilderStep } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Step {
  id: BuilderStep
  label: string
  icon: React.ElementType
}

const STEPS: Step[] = [
  { id: 'collecting', label: '需求', icon: MessageSquare },
  { id: 'designing', label: '设计', icon: Palette },
  { id: 'generating', label: '生成', icon: Code2 },
  { id: 'preview', label: '预览', icon: Eye },
  { id: 'refining', label: '优化', icon: Wand2 },
]

const STEP_ORDER: BuilderStep[] = [
  'welcome', 'collecting', 'designing', 'generating', 'preview', 'refining',
]

function getStepIndex(step: BuilderStep): number {
  return STEP_ORDER.indexOf(step)
}

interface StepIndicatorProps {
  currentStep: BuilderStep
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = getStepIndex(currentStep)

  return (
    <div className="flex items-center gap-1">
      {STEPS.map((step, i) => {
        const stepIndex = getStepIndex(step.id)
        const isCompleted = stepIndex < currentIndex
        const isActive = step.id === currentStep || (currentStep === 'welcome' && i === 0)
        const Icon = step.icon

        return (
          <div key={step.id} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: isCompleted || isActive ? 1 : 0.35,
                }}
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center transition-colors',
                  isCompleted
                    ? 'bg-violet-600'
                    : isActive
                    ? 'bg-gradient-to-br from-violet-500 to-indigo-600 ring-2 ring-violet-500/30'
                    : 'bg-white/5 border border-white/10'
                )}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-white' : 'text-slate-500')} />
                )}
              </motion.div>
              <span
                className={cn(
                  'text-[10px] font-medium',
                  isActive ? 'text-violet-400' : isCompleted ? 'text-slate-400' : 'text-slate-600'
                )}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-6 h-px mb-4 transition-colors',
                  stepIndex < currentIndex ? 'bg-violet-600' : 'bg-white/10'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
