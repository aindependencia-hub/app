import { useState } from 'react'
import { DollarSign, TrendingUp, Home } from 'lucide-react'
import type { Budget } from '@/types'
import { formatCurrency, formatArea } from '@/lib/utils'

interface Props {
  budget: Budget
  onChange: (b: Partial<Budget>) => void
}

const PRESETS = [
  { label: 'R$ 150k', value: 150000 },
  { label: 'R$ 250k', value: 250000 },
  { label: 'R$ 350k', value: 350000 },
  { label: 'R$ 500k', value: 500000 },
  { label: 'R$ 750k', value: 750000 },
  { label: 'R$ 1M', value: 1000000 },
]

export default function Step2Budget({ budget, onChange }: Props) {
  const [rawValue, setRawValue] = useState(budget.maxValue.toString())

  function handleValueChange(val: string) {
    const numeric = val.replace(/\D/g, '')
    setRawValue(numeric)
    const n = parseInt(numeric, 10)
    if (!isNaN(n) && n > 0) {
      onChange({ maxValue: n })
    }
  }

  const maxArea = Math.floor(budget.maxValue / budget.pricePerM2)

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="font-title text-3xl text-escuro font-light mb-2">Orçamento</h2>
        <p className="font-body text-escuro/60 text-sm">
          Defina o investimento máximo para o seu projeto.
        </p>
      </div>

      {/* Resultado visual principal */}
      <div className="gradient-gold rounded-sm p-6 text-center shadow-md">
        <p className="font-body text-escuro/70 text-sm mb-1">Área máxima estimada</p>
        <p className="font-title text-5xl font-light text-escuro">{maxArea}</p>
        <p className="font-title text-xl text-escuro/60 mt-1">m²</p>
        <div className="mt-3 h-px bg-escuro/10 mx-8" />
        <p className="font-body text-xs text-escuro/50 mt-2">
          a R$ {budget.pricePerM2.toLocaleString('pt-BR')}/m² (custo de construção)
        </p>
      </div>

      {/* Input de valor */}
      <div className="card-premium">
        <label htmlFor="budget-value" className="flex items-center gap-2 text-sm font-medium text-escuro mb-3">
          <DollarSign size={15} className="text-dourado-dark" />
          Valor máximo de investimento
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-escuro/50 font-body text-sm">R$</span>
          <input
            id="budget-value"
            type="text"
            inputMode="numeric"
            value={rawValue ? parseInt(rawValue, 10).toLocaleString('pt-BR') : ''}
            onChange={e => handleValueChange(e.target.value)}
            className="input-indep pl-9 text-lg font-title font-light"
            placeholder="350.000"
          />
        </div>
        <p className="text-xs text-escuro/40 mt-1.5">
          {formatCurrency(budget.maxValue)} → {formatArea(maxArea)} de área construída
        </p>
      </div>

      {/* Presets rápidos */}
      <div className="card-premium">
        <p className="text-sm font-medium text-escuro mb-3 flex items-center gap-2">
          <TrendingUp size={15} className="text-dourado-dark" />
          Valores sugeridos
        </p>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.value}
              id={`preset-${p.value}`}
              onClick={() => { setRawValue(p.value.toString()); onChange({ maxValue: p.value }) }}
              className={`py-2 px-3 rounded-sm text-sm font-body transition-all duration-200 border
                ${budget.maxValue === p.value
                  ? 'bg-dourado text-escuro border-dourado font-medium'
                  : 'border-dourado/20 text-escuro/70 hover:border-dourado/50 hover:bg-dourado/10'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custo por m² */}
      <div className="card-premium">
        <label htmlFor="price-m2" className="flex items-center gap-2 text-sm font-medium text-escuro mb-3">
          <Home size={15} className="text-dourado-dark" />
          Custo de construção por m² (R$)
        </label>
        <input
          id="price-m2"
          type="number"
          min={2000}
          max={8000}
          step={100}
          value={budget.pricePerM2}
          onChange={e => onChange({ pricePerM2: Number(e.target.value) })}
          className="input-indep"
        />
        <p className="text-xs text-escuro/40 mt-1.5">
          Referência regional média: R$ 3.000 – R$ 5.000/m²
        </p>
      </div>
    </div>
  )
}
