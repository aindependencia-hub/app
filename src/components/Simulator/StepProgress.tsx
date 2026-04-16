import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

const STEP_LABELS = [
  'Família',
  'Orçamento',
  'Terreno',
  'Ambientes',
  'Resumo',
  'Planta Baixa',
]

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative flex items-center justify-between mb-3">
        {/* Connector line background */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-dourado/20 mx-6" />

        {/* Active connector */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-dourado transition-all duration-500 mx-6"
          style={{ width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 0%)` }}
        />

        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => {
          const isDone = step < currentStep
          const isActive = step === currentStep

          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                  isDone && 'bg-escuro text-creme shadow-md',
                  isActive && 'bg-dourado text-escuro shadow-lg scale-110 ring-2 ring-dourado/30',
                  !isDone && !isActive && 'bg-creme border border-dourado/30 text-escuro/40'
                )}
              >
                {isDone ? <Check size={16} /> : <span className="font-title text-base">{step}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Step labels — only show active and adjacent */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => {
          const isActive = step === currentStep
          return (
            <div key={step} className={cn(
              'text-center transition-all duration-300 flex-1',
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none xl:opacity-40',
            )}>
              <span className={cn(
                'text-xs font-body whitespace-nowrap',
                isActive ? 'text-escuro font-medium' : 'text-escuro/50'
              )}>
                {STEP_LABELS[step - 1]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
