import React from 'react'
import { Ruler, MoveVertical, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import type { Terrain } from '@/types'
import { formatArea, cn } from '@/lib/utils'

interface Props {
  terrain: Terrain
  onChange: (t: Partial<Terrain>) => void
}

function TerrainField({
  id, label, value, unit, min, max, step, onChange, icon: Icon, description,
}: {
  id: string; label: string; value: number; unit: string
  min: number; max: number; step: number
  onChange: (v: number) => void; icon?: React.ElementType; description?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium text-escuro">
        {Icon && <Icon size={14} className="text-dourado-dark" />}
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="input-indep flex-1"
        />
        <span className="text-sm text-escuro/50 w-6">{unit}</span>
      </div>
      {description && <p className="text-xs text-escuro/40">{description}</p>}
    </div>
  )
}

export default function Step3Terrain({ terrain, onChange }: Props) {
  const ratio = terrain.width > 0 ? (terrain.depth / terrain.width).toFixed(1) : '—'
  const efficiency = terrain.totalArea > 0
    ? Math.round((terrain.buildableArea / terrain.totalArea) * 100)
    : 0

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="font-title text-3xl text-escuro font-light mb-2">Dados do Terreno</h2>
        <p className="font-body text-escuro/60 text-sm">
          Informe as dimensões e características físicas do terreno.
        </p>
      </div>

      {/* Visual do terreno */}
      <div className="card-premium flex flex-col items-center gap-3">
        <p className="text-xs font-medium text-escuro/50 self-start">Visualização do Terreno</p>
        <div className="relative flex items-center justify-center py-4">
          {/* Terreno visual */}
          <div
            className="border-2 border-dashed border-dourado relative flex items-center justify-center bg-dourado/5 rounded-sm"
            style={{
              width: Math.min(200, terrain.width * 8),
              height: Math.min(200, terrain.depth * 4),
              minWidth: 80, minHeight: 80,
            }}
          >
            {/* Área aproveitável */}
            <div
              className="border border-escuro/20 bg-dourado/20 absolute"
              style={{
                left: terrain.sideSetback * 8,
                right: terrain.sideSetback * 8,
                top: terrain.frontSetback * 4,
                bottom: terrain.rearSetback * 4,
                minWidth: 10, minHeight: 10,
              }}
            />
            <span className="font-title text-xs text-escuro/60 z-10">
              {formatArea(terrain.buildableArea)}
            </span>
          </div>
          {/* label largura */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-escuro/50">
            {terrain.width}m
          </span>
          {/* label profundidade */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-escuro/50 -rotate-90 -translate-x-4">
            {terrain.depth}m
          </span>
        </div>
        <div className="flex gap-6 text-xs text-escuro/60">
          <span>Total: <strong>{formatArea(terrain.totalArea)}</strong></span>
          <span>Aproveitável: <strong>{formatArea(terrain.buildableArea)}</strong></span>
          <span>Eficiência: <strong className={cn(efficiency >= 60 ? 'text-green-700' : 'text-amber-700')}>{efficiency}%</strong></span>
        </div>
      </div>

      {/* Dimensões */}
      <div className="card-premium">
        <p className="text-sm font-semibold text-escuro mb-4 flex items-center gap-2">
          <Ruler size={15} className="text-dourado-dark" /> Dimensões
        </p>
        <div className="grid grid-cols-2 gap-4">
          <TerrainField
            id="terrain-width" label="Largura" value={terrain.width} unit="m"
            min={5} max={50} step={0.5} icon={ArrowRight}
            onChange={v => onChange({ width: v })}
            description="Testada (frente do lote)"
          />
          <TerrainField
            id="terrain-depth" label="Profundidade" value={terrain.depth} unit="m"
            min={10} max={100} step={0.5} icon={ArrowUp}
            onChange={v => onChange({ depth: v })}
            description="Comprimento do lote"
          />
          <TerrainField
            id="terrain-unevenness" label="Desnível" value={terrain.unevenness} unit="m"
            min={0} max={10} step={0.5} icon={MoveVertical}
            onChange={v => onChange({ unevenness: v })}
            description="Entre frente e fundo"
          />
        </div>
        <p className="text-xs text-escuro/40 mt-3">Proporção largura/profundidade: {ratio}</p>
      </div>

      {/* Recuos */}
      <div className="card-premium">
        <p className="text-sm font-semibold text-escuro mb-4 flex items-center gap-2">
          <ArrowLeft size={15} className="text-dourado-dark" /> Recuos Obrigatórios
        </p>
        <div className="grid grid-cols-3 gap-4">
          <TerrainField
            id="setback-front" label="Frontal" value={terrain.frontSetback} unit="m"
            min={0} max={10} step={0.5}
            onChange={v => onChange({ frontSetback: v })}
          />
          <TerrainField
            id="setback-side" label="Lateral" value={terrain.sideSetback} unit="m"
            min={0} max={5} step={0.5}
            onChange={v => onChange({ sideSetback: v })}
          />
          <TerrainField
            id="setback-rear" label="Fundo" value={terrain.rearSetback} unit="m"
            min={0} max={10} step={0.5}
            onChange={v => onChange({ rearSetback: v })}
          />
        </div>
        <p className="text-xs text-escuro/40 mt-2">
          Consulte o Plano Diretor do seu município para os recuos mínimos legais.
        </p>
      </div>
    </div>
  )
}
