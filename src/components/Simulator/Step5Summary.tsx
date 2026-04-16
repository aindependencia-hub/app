import { AlertTriangle, Info, XCircle, Users, DollarSign, Ruler } from 'lucide-react'
import type { SimulatorState, TechnicalAlert } from '@/types'
import { SECTOR_LABELS, ROOM_COLORS } from '@/types'
import { formatCurrency, formatArea } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  state: SimulatorState
  totalArea: number
  fitsInBudget: boolean
  fitsInTerrain: boolean
}

function Alert({ alert }: { alert: TechnicalAlert }) {
  const styles = {
    error: { cls: 'alert-error', Icon: XCircle },
    warning: { cls: 'alert-warning', Icon: AlertTriangle },
    info: { cls: 'alert-info', Icon: Info },
  }
  const { cls, Icon } = styles[alert.type]
  return (
    <div className={cn(cls, 'flex items-start gap-2')}>
      <Icon size={15} className="flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-xs">{alert.rule}</p>
        <p>{alert.message}</p>
      </div>
    </div>
  )
}

export default function Step5Summary({ state, totalArea, fitsInBudget, fitsInTerrain }: Props) {
  const { familyProfile: fp, budget, terrain, rooms } = state

  const activeRooms = rooms.filter(r => r.quantity > 0)

  // Auto-generate alerts
  const autoAlerts: TechnicalAlert[] = []

  if (!fitsInBudget) {
    autoAlerts.push({
      type: 'error',
      rule: 'Orçamento excedido',
      message: `Área solicitada (${totalArea.toFixed(0)} m²) excede o máximo orçado (${budget.maxArea} m²). Reduza ambientes ou aumente o orçamento.`,
    })
  }
  if (!fitsInTerrain) {
    autoAlerts.push({
      type: 'error',
      rule: 'Terreno insuficiente',
      message: `A área construída (${totalArea.toFixed(0)} m²) não cabe na área aproveitável do terreno (${terrain.buildableArea.toFixed(0)} m²).`,
    })
  }
  if (terrain.width < 8) {
    autoAlerts.push({
      type: 'warning',
      rule: 'Terreno estreito',
      message: 'Terrenos com menos de 8m de frente podem dificultar a disposição de cômodos lado a lado.',
    })
  }
  if (terrain.unevenness > 1) {
    autoAlerts.push({
      type: 'warning',
      rule: 'Desnível significativo',
      message: `Desnível de ${terrain.unevenness}m requer projeto estrutural especial e pode aumentar o custo em 15–30%.`,
    })
  }
  if (!rooms.some(r => r.type === 'bathroom' && r.sector === 'private' && r.quantity > 0)) {
    autoAlerts.push({
      type: 'warning',
      rule: 'Banheiro privativo ausente',
      message: 'Recomenda-se ao menos um banheiro privativo para a suíte.',
    })
  }
  if (fp.hasHomeOffice && !rooms.some(r => r.type === 'homeOffice' && r.quantity > 0)) {
    autoAlerts.push({
      type: 'info',
      rule: 'Home Office',
      message: 'Você indicou necessidade de home office. Adicione um escritório na etapa de ambientes.',
    })
  }
  if (fp.accessibility) {
    autoAlerts.push({
      type: 'info',
      rule: 'Acessibilidade',
      message: 'Para mobilidade reduzida: portas mínimas de 90cm, rampas de até 8% e banheiro adaptado são necessários.',
    })
  }
  if (autoAlerts.length === 0) {
    autoAlerts.push({
      type: 'info',
      rule: '✅ Projeto dentro dos parâmetros',
      message: 'Todas as dimensões e requisitos estão compatíveis. Pronto para gerar a planta!',
    })
  }

  return (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="font-title text-3xl text-escuro font-light mb-2">Resumo do Projeto</h2>
        <p className="font-body text-escuro/60 text-sm">Confira tudo antes de gerar a planta baixa.</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Família */}
        <div className="card-premium text-center">
          <div className="w-10 h-10 bg-dourado/15 rounded-sm flex items-center justify-center mx-auto mb-2">
            <Users size={18} className="text-dourado-dark" />
          </div>
          <p className="font-title text-2xl text-escuro">{fp.adults + fp.children}</p>
          <p className="text-xs text-escuro/50 font-body">Moradores</p>
          <p className="text-xs text-escuro/40 mt-1">{fp.adults} adulto(s) · {fp.children} criança(s)</p>
        </div>

        {/* Orçamento */}
        <div className="card-premium text-center">
          <div className="w-10 h-10 bg-dourado/15 rounded-sm flex items-center justify-center mx-auto mb-2">
            <DollarSign size={18} className="text-dourado-dark" />
          </div>
          <p className="font-title text-2xl text-escuro">{formatCurrency(budget.maxValue)}</p>
          <p className="text-xs text-escuro/50 font-body">Investimento</p>
          <p className="text-xs text-escuro/40 mt-1">≈ {budget.maxArea} m² máximos</p>
        </div>

        {/* Terreno */}
        <div className="card-premium text-center">
          <div className="w-10 h-10 bg-dourado/15 rounded-sm flex items-center justify-center mx-auto mb-2">
            <Ruler size={18} className="text-dourado-dark" />
          </div>
          <p className="font-title text-2xl text-escuro">{terrain.width}×{terrain.depth}m</p>
          <p className="text-xs text-escuro/50 font-body">Terreno</p>
          <p className="text-xs text-escuro/40 mt-1">{formatArea(terrain.buildableArea)} aproveitável</p>
        </div>
      </div>

      {/* Ambientes */}
      <div className="card-premium">
        <h3 className="font-body font-semibold text-sm text-escuro mb-3">
          Ambientes Selecionados — {totalArea.toFixed(0)} m² total
        </h3>
        <div className="space-y-2">
          {activeRooms.map(room => (
            <div key={room.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ background: ROOM_COLORS[room.sector] }}
                />
                <span className="text-escuro/80">{room.name}</span>
                {room.quantity > 1 && (
                  <span className="text-xs text-escuro/40">×{room.quantity}</span>
                )}
              </div>
              <span className="text-escuro/60 tabular-nums text-xs">
                {(room.quantity * room.areaPerUnit).toFixed(0)} m²
              </span>
            </div>
          ))}
        </div>

        {/* Legenda de setores */}
        <div className="mt-3 pt-3 border-t border-dourado/10 flex gap-4">
          {(['social', 'private', 'service'] as const).map(s => (
            <div key={s} className="flex items-center gap-1.5 text-xs text-escuro/50">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: ROOM_COLORS[s] }} />
              {SECTOR_LABELS[s]}
            </div>
          ))}
        </div>
      </div>

      {/* Alertas técnicos */}
      <div className="space-y-2">
        <h3 className="font-body font-semibold text-sm text-escuro">Verificação Técnica Automática</h3>
        {autoAlerts.map((a, i) => <Alert key={i} alert={a} />)}
        {state.alerts.map((a, i) => <Alert key={`plan-${i}`} alert={a} />)}
      </div>
    </div>
  )
}
