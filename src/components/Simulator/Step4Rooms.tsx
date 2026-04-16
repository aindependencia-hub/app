import { LayoutGrid, Plus, Minus } from 'lucide-react'
import type { Room, SectorType } from '@/types'
import { ROOM_COLORS, SECTOR_LABELS } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  rooms: Room[]
  maxArea: number
  onUpdate: (id: string, updates: Partial<Room>) => void
}

const ROOM_ICONS: Record<string, string> = {
  suite: '🛏️',
  bedroom: '🛏',
  living: '🛋️',
  kitchen: '🍳',
  bathroom: '🚿',
  garage: '🚗',
  balcony: '🌿',
  laundry: '👕',
  homeOffice: '💻',
}

const SECTOR_BG: Record<SectorType, string> = {
  social: 'bg-social/60 border-social',
  private: 'bg-privado/60 border-privado',
  service: 'bg-servico/60 border-servico',
  external: 'bg-purple-300/60 border-purple-400',
}

export default function Step4Rooms({ rooms, maxArea, onUpdate }: Props) {
  const totalArea = rooms.reduce((s, r) => s + r.quantity * r.areaPerUnit, 0)
  const percent = Math.min(100, (totalArea / maxArea) * 100)
  const overBudget = totalArea > maxArea

  // Agrupar por setor
  const sectors: SectorType[] = ['social', 'private', 'service']

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="font-title text-3xl text-escuro font-light mb-2">Ambientes</h2>
        <p className="font-body text-escuro/60 text-sm">
          Ajuste os cômodos de acordo com suas necessidades.
        </p>
      </div>

      {/* Medidor de área */}
      <div className="card-premium">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-escuro flex items-center gap-1.5">
            <LayoutGrid size={14} className="text-dourado-dark" />
            Área total solicitada
          </span>
          <span className={cn(
            'text-sm font-medium tabular-nums',
            overBudget ? 'text-red-600' : 'text-green-700'
          )}>
            {totalArea.toFixed(0)} / {maxArea} m²
          </span>
        </div>
        <div className="h-2 bg-escuro/10 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              overBudget ? 'bg-red-400' : 'bg-dourado'
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
        {overBudget && (
          <p className="text-xs text-red-600 mt-1.5">
            ⚠️ Área excede o orçamento em {(totalArea - maxArea).toFixed(0)} m²
          </p>
        )}
      </div>

      {/* Rooms por setor */}
      {sectors.map(sector => {
        const sectorRooms = rooms.filter(r => r.sector === sector)
        if (sectorRooms.length === 0) return null
        const sectorTotal = sectorRooms.reduce((s, r) => s + r.quantity * r.areaPerUnit, 0)

        return (
          <div key={sector} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-body font-semibold text-sm text-escuro flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm inline-block"
                  style={{ background: ROOM_COLORS[sector] }}
                />
                Setor {SECTOR_LABELS[sector]}
              </h3>
              <span className="text-xs text-escuro/50">{sectorTotal.toFixed(0)} m²</span>
            </div>

            {sectorRooms.map(room => {
              const total = room.quantity * room.areaPerUnit
              return (
                <div
                  key={room.id}
                  className={cn(
                    'border rounded-sm p-4 transition-all duration-200',
                    SECTOR_BG[sector]
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Nome e área */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{ROOM_ICONS[room.type] || '🏠'}</span>
                        <span className="font-body font-medium text-escuro text-sm truncate">
                          {room.name}
                        </span>
                        <span className="text-xs text-escuro/50 ml-auto flex-shrink-0">
                          {total.toFixed(0)} m²
                        </span>
                      </div>

                      {/* Área por unidade */}
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-escuro/50 flex-shrink-0">
                          {room.areaPerUnit} m²/un
                        </label>
                        <input
                          id={`area-${room.id}`}
                          type="range"
                          min={3}
                          max={80}
                          step={1}
                          value={room.areaPerUnit}
                          onChange={e => onUpdate(room.id, { areaPerUnit: Number(e.target.value) })}
                          className="flex-1 accent-dourado-dark h-1"
                        />
                      </div>
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        id={`qty-dec-${room.id}`}
                        onClick={() => onUpdate(room.id, { quantity: Math.max(0, room.quantity - 1) })}
                        className="w-7 h-7 rounded-sm bg-white/60 border border-escuro/20 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center font-title text-lg font-light tabular-nums">
                        {room.quantity}
                      </span>
                      <button
                        id={`qty-inc-${room.id}`}
                        onClick={() => onUpdate(room.id, { quantity: Math.min(6, room.quantity + 1) })}
                        className="w-7 h-7 rounded-sm bg-white/60 border border-escuro/20 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
