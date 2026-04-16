import React from 'react'
import { Users, Baby, Car, Briefcase, PawPrint, Accessibility } from 'lucide-react'
import type { FamilyProfile } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  profile: FamilyProfile
  onChange: (p: Partial<FamilyProfile>) => void
}

function CounterField({
  label, icon: Icon, value, min, max,
  onChange, description,
}: {
  label: string; icon: React.ElementType; value: number
  min: number; max: number; onChange: (v: number) => void
  description?: string
}) {
  return (
    <div className="card-premium animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-dourado/15 rounded-sm flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-dourado-dark" />
          </div>
          <div>
            <p className="font-body font-medium text-escuro text-sm">{label}</p>
            {description && <p className="text-xs text-escuro/50 mt-0.5">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            id={`dec-${label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min}
            className={cn(
              'w-8 h-8 rounded-sm border border-dourado/40 flex items-center justify-center',
              'text-escuro font-medium transition-all duration-200',
              'hover:bg-dourado hover:text-escuro hover:border-dourado disabled:opacity-30 disabled:cursor-not-allowed'
            )}
          >−</button>
          <span className="w-6 text-center font-title text-xl font-light text-escuro tabular-nums">
            {value}
          </span>
          <button
            id={`inc-${label.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max}
            className={cn(
              'w-8 h-8 rounded-sm border border-dourado/40 flex items-center justify-center',
              'text-escuro font-medium transition-all duration-200',
              'hover:bg-dourado hover:text-escuro hover:border-dourado disabled:opacity-30 disabled:cursor-not-allowed'
            )}
          >+</button>
        </div>
      </div>
    </div>
  )
}

function ToggleField({
  label, icon: Icon, value, onChange, description,
}: {
  label: string; icon: React.ElementType; value: boolean
  onChange: (v: boolean) => void; description?: string
}) {
  return (
    <button
      id={`toggle-${label.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => onChange(!value)}
      className={cn(
        'card-premium w-full text-left transition-all duration-300 cursor-pointer',
        value && 'border-dourado/60 bg-dourado/10'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-10 h-10 rounded-sm flex items-center justify-center transition-colors duration-300',
            value ? 'bg-dourado/30' : 'bg-dourado/10'
          )}>
            <Icon size={18} className={value ? 'text-escuro' : 'text-dourado-dark'} />
          </div>
          <div>
            <p className="font-body font-medium text-escuro text-sm">{label}</p>
            {description && <p className="text-xs text-escuro/50 mt-0.5">{description}</p>}
          </div>
        </div>
        <div className={cn(
          'w-11 h-6 rounded-full flex items-center transition-all duration-300',
          value ? 'bg-dourado justify-end px-0.5' : 'bg-escuro/10 justify-start px-0.5'
        )}>
          <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
        </div>
      </div>
    </button>
  )
}

export default function Step1FamilyProfile({ profile, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="font-title text-3xl text-escuro font-light mb-2">
          Perfil da Família
        </h2>
        <p className="font-body text-escuro/60 text-sm">
          Nos conte sobre quem vai morar para dimensionarmos o projeto ideal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CounterField
          label="Adultos" icon={Users} value={profile.adults} min={1} max={8}
          onChange={v => onChange({ adults: v })}
          description="Moradores adultos"
        />
        <CounterField
          label="Crianças" icon={Baby} value={profile.children} min={0} max={6}
          onChange={v => onChange({ children: v })}
          description="Filhos e dependentes"
        />
        <CounterField
          label="Vagas de Garagem" icon={Car} value={profile.cars} min={0} max={4}
          onChange={v => onChange({ cars: v })}
          description="Automóveis"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <ToggleField
          label="Home Office" icon={Briefcase} value={profile.hasHomeOffice}
          onChange={v => onChange({ hasHomeOffice: v })}
          description="Preciso de um escritório em casa"
        />
        <ToggleField
          label="Animais de Estimação" icon={PawPrint} value={profile.pets}
          onChange={v => onChange({ pets: v })}
          description="Tenho pets"
        />
        <ToggleField
          label="Acessibilidade" icon={Accessibility} value={profile.accessibility}
          onChange={v => onChange({ accessibility: v })}
          description="Necessidades especiais de mobilidade"
        />
      </div>

      {/* Tip */}
      <div className="mt-4 p-4 bg-dourado/10 border border-dourado/20 rounded-sm">
        <p className="text-xs text-escuro/70 font-body">
          <span className="font-medium text-dourado-dark">💡 Dica:</span> Com base no seu perfil,
          sugeriremos automaticamente o número de quartos, banheiros e ambientes necessários
          nas próximas etapas.
        </p>
      </div>
    </div>
  )
}
