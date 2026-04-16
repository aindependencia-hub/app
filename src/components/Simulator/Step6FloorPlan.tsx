import { useEffect, useRef, useState } from 'react'
import { Download, RefreshCw, ZoomIn, ZoomOut, Info, MonitorSmartphone } from 'lucide-react'
import type { SimulatorState } from '@/types'
import { ROOM_COLORS, SECTOR_LABELS } from '@/types'
import { generateFloorPlan, renderFloorPlan } from '@/lib/floorPlanEngine'
import { cn } from '@/lib/utils'
import { ConceptSelector } from './ConceptSelector'

interface Props {
  state: SimulatorState
  onFloorPlanGenerated: (plan: import('@/types').FloorPlan) => void
  onConceptChange: (concept: import('@/types').ArchConcept) => void
}

export default function Step6FloorPlan({ state, onFloorPlanGenerated, onConceptChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [activeFloor, setActiveFloor] = useState(0)
  const [showDebug, setShowDebug] = useState(true)
  const [isLandscape, setIsLandscape] = useState(true)

  const hotmartUrl = import.meta.env.VITE_HOTMART_PDF_URL || 'https://hotmart.com'

  useEffect(() => {
    if (!isGenerating && state.floorPlan && canvasRef.current) {
      renderFloorPlan(
        canvasRef.current,
        state.floorPlan,
        state.terrain.width,
        state.terrain.depth,
        state.terrain.sideSetback,
        state.terrain.frontSetback,
        activeFloor,
        isLandscape
      )
    }
  }, [isGenerating, state.floorPlan, state.terrain, zoom, activeFloor, isLandscape])

  function generate() {
    setIsGenerating(true)
    setTimeout(() => {
      const { terrain, rooms } = state
      const plan = generateFloorPlan(
        rooms.filter(r => r.quantity > 0),
        terrain.width,
        terrain.depth,
        terrain.frontSetback,
        terrain.sideSetback,
        terrain.rearSetback,
        state.inventory,
        state.floors,
        state.concept
      )
      onFloorPlanGenerated(plan)
      setIsGenerating(false)
    }, 600)
  }

  function runBatchTests() {
    // Machine Learning / AI Workflow: Export 10 tests as JSON
    const testPlans = []
    for (let i = 0; i < 10; i++) {
       const plan = generateFloorPlan(
        state.rooms.filter(r => r.quantity > 0),
        state.terrain.width, state.terrain.depth, state.terrain.frontSetback,
        state.terrain.sideSetback, state.terrain.rearSetback,
        state.inventory, state.floors, state.concept
      )
      testPlans.push({ iteracao: i+1, score: plan.score, concept: state.concept, estatisticas: plan })
    }
    
    // Download File
    const blob = new Blob([JSON.stringify(testPlans, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dataset_treinamento_IA_${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.concept])

  function handleDownloadClick() {
    setShowLeadModal(true)
  }

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Salva lead no localStorage
    const lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: leadName,
      email: leadEmail,
      projectSummary: `${state.terrain.width}x${state.terrain.depth}m · ${state.rooms.filter(r => r.quantity > 0).map(r => r.name).join(', ')}`,
      createdAt: new Date().toISOString(),
      status: 'novo' as const,
    }
    const leads = JSON.parse(localStorage.getItem('independencia_leads_v1') || '[]')
    leads.unshift(lead)
    localStorage.setItem('independencia_leads_v1', JSON.stringify(leads))

    // Redireciona para Hotmart
    window.open(hotmartUrl, '_blank')
    setShowLeadModal(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-title text-3xl text-escuro font-light mb-1">Planta Baixa 2D</h2>
          <p className="font-body text-escuro/60 text-sm">
            Gerada automaticamente com base nas suas preferências.
          </p>
        </div>
        
        {state.floorPlan && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-escuro/40 mb-1">Score Heurístico</span>
            <div className={`px-4 py-2 rounded-sm text-white font-bold text-xl drop-shadow-md ${state.floorPlan.score > 80 ? 'bg-green-600' : state.floorPlan.score > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}>
               {state.floorPlan.score} / 100
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/40 p-4 rounded-sm border border-dourado/10 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-dourado-dark" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-escuro/60">Escolha o Partido Arquitetônico</h3>
        </div>
        <ConceptSelector 
          selected={state.concept} 
          onChange={onConceptChange} 
        />
      </div>

      {/* Ferramentas */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            id="zoom-in"
            onClick={() => setZoom(z => Math.min(2, z + 0.2))}
            className="w-8 h-8 border border-dourado/30 rounded-sm flex items-center justify-center hover:bg-dourado/10 transition-colors"
            title="Ampliar"
          >
            <ZoomIn size={15} />
          </button>
          <button
            id="zoom-out"
            onClick={() => setZoom(z => Math.max(0.4, z - 0.2))}
            className="w-8 h-8 border border-dourado/30 rounded-sm flex items-center justify-center hover:bg-dourado/10 transition-colors"
            title="Reduzir"
          >
            <ZoomOut size={15} />
          </button>
          <span className="text-xs text-escuro/40">{Math.round(zoom * 100)}%</span>
          
          <div className="w-[1px] h-4 bg-dourado/20 mx-1" />
          
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            className={`w-8 h-8 border border-dourado/30 rounded-sm flex items-center justify-center transition-colors ${isLandscape ? 'bg-dourado/10 text-dourado-dark' : 'hover:bg-dourado/10'}`}
            title="Girar Câmera (Vertical/Horizontal)"
          >
            <MonitorSmartphone size={15} className={isLandscape ? '-rotate-90 transition-transform' : 'transition-transform'} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {state.floors > 1 && (
            <div className="flex border border-dourado/30 rounded-sm overflow-hidden text-sm">
              <button 
                onClick={() => setActiveFloor(0)}
                className={`px-4 py-1.5 transition-colors ${activeFloor === 0 ? 'bg-dourado/20 text-escuro font-bold' : 'text-escuro/50 hover:bg-dourado/5'}`}
              >
                Térreo
              </button>
              <button 
                onClick={() => setActiveFloor(1)}
                className={`px-4 py-1.5 transition-colors ${activeFloor === 1 ? 'bg-dourado/20 text-escuro font-bold' : 'text-escuro/50 hover:bg-dourado/5'}`}
              >
                Superior
              </button>
            </div>
          )}

          <button
            onClick={() => setShowDebug(!showDebug)}
            className={`px-3 py-1.5 border rounded-sm text-sm transition-colors ${showDebug ? 'border-escuro bg-escuro text-white' : 'border-dourado/30 text-escuro/60 hover:bg-dourado/10'}`}
          >
            {showDebug ? 'Ocultar Debug' : 'Ver Debug'}
          </button>

          <button
            id="regenerate"
            onClick={generate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-dourado/30 rounded-sm text-sm
                       hover:bg-dourado/10 transition-all duration-200 disabled:opacity-50"
          >
            <RefreshCw size={13} className={cn(isGenerating && 'animate-spin')} />
            Regenerar
          </button>
          
          <button
            onClick={runBatchTests}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-escuro text-white rounded-sm text-sm hover:bg-escuro/90 transition-all"
            title="Exportar JSON para Treinamento de IA"
          >
            <Download size={13} /> Exportar Lote (AI)
          </button>
        </div>
      </div>

      {/* Canvas container */}
      <div
        className="relative border border-dourado/20 rounded-sm overflow-auto bg-[#FAF8F5] shadow-inner min-h-[500px]"
        style={{ maxHeight: '75vh' }}
      >
        {isGenerating && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAF8F5]/80 backdrop-blur-sm gap-3">
            <div className="w-8 h-8 border-2 border-dourado border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-escuro/50 font-body animate-pulse">Calculando novas alocações e fluxos…</p>
          </div>
        )}
        
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
          <canvas ref={canvasRef} className="block" />
        </div>
      </div>

      {/* Logger de Depuração (Para Arquitetos) */}
      {showDebug && state.floorPlan?.debugLogs && (
        <div className="bg-[#1e1e1e] rounded-md p-4 text-[#d4d4d4] font-mono text-xs h-56 overflow-y-auto overflow-x-hidden shadow-inner">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#333]">
            <span className="font-bold text-[#c586c0]">ENGINE_DEBUG_LOG</span>
            <button 
              onClick={() => navigator.clipboard.writeText(state.floorPlan!.debugLogs.join('\n'))} 
              className="text-[#4fc1ff] hover:text-[#9cdcfe] transition-colors"
            >
              [Copiar Log Completo]
            </button>
          </div>
          {state.floorPlan.debugLogs.map((log, i) => (
            <div key={i} className={`mb-1 ${log.includes('[FIM]') ? 'text-green-400 mt-2 font-bold' : log.includes('[INIT]') ? 'text-yellow-400 mb-2 font-bold' : 'opacity-90'}`}>
              <span className="text-[#6a9955]">{(i+1).toString().padStart(2, '0')}&gt;</span> {log}
            </div>
          ))}
        </div>
      )}

      {/* Legenda de setores */}
      <div className="flex flex-wrap gap-4 text-xs">
        {(['social', 'private', 'service'] as const).map(s => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-sm border border-escuro/10" style={{ background: ROOM_COLORS[s] }} />
            <span className="text-escuro/60">Setor {SECTOR_LABELS[s]}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 bg-blue-300/60 border border-blue-400 rounded-sm" />
          <span className="text-escuro/60">Janela</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-dourado-dark" />
          <span className="text-escuro/60">Porta (arco)</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-dourado/10 border border-dourado/20 rounded-sm flex items-start gap-2">
        <Info size={14} className="text-dourado-dark flex-shrink-0 mt-0.5" />
        <p className="text-xs text-escuro/70">
          Esta planta é um estudo preliminar para visualização. Para o projeto executivo com medidas precisas,
          normas técnicas e aprovação na prefeitura, acesse o PDF completo com um arquiteto parceiro.
        </p>
      </div>

      {/* CTA Hotmart */}
      <button
        id="download-pdf"
        onClick={handleDownloadClick}
        className="w-full gradient-gold text-escuro font-body font-semibold py-4 rounded-sm
                   flex items-center justify-center gap-2 shadow-lg hover:shadow-xl
                   hover:brightness-105 active:scale-95 transition-all duration-300 text-base"
      >
        <Download size={18} />
        Baixar PDF com Medidas Completas
      </button>

      {/* Lead capture modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-escuro/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-creme rounded-sm shadow-2xl w-full max-w-md p-6 animate-fade-up">
            <h3 className="font-title text-2xl text-escuro font-light mb-2">
              Quase lá! 🎉
            </h3>
            <p className="text-sm text-escuro/60 mb-5 font-body">
              Informe seus dados para receber o PDF com a planta completa e medidas.
            </p>
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div>
                <label htmlFor="lead-name" className="text-sm font-medium text-escuro block mb-1">
                  Nome completo
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  className="input-indep"
                  placeholder="Maria Silva"
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="text-sm font-medium text-escuro block mb-1">
                  E-mail
                </label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  value={leadEmail}
                  onChange={e => setLeadEmail(e.target.value)}
                  className="input-indep"
                  placeholder="maria@email.com"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  id="cancel-lead"
                  onClick={() => setShowLeadModal(false)}
                  className="flex-1 py-2.5 border border-dourado/30 rounded-sm text-sm hover:bg-dourado/10 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  id="submit-lead"
                  className="flex-1 gradient-gold text-escuro py-2.5 rounded-sm text-sm font-semibold
                             hover:brightness-105 active:scale-95 transition-all duration-200"
                >
                  Baixar PDF →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
