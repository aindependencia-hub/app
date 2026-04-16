import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { useSimulatorStore } from '@/lib/store'
import StepProgress from './StepProgress'
import Step1FamilyProfile from './Step1FamilyProfile'
import Step2Budget from './Step2Budget'
import Step3Terrain from './Step3Terrain'
import Step4Rooms from './Step4Rooms'
import Step5Summary from './Step5Summary'
import Step6FloorPlan from './Step6FloorPlan'
import type { FloorPlan } from '@/types'
import { cn } from '@/lib/utils'

export default function SimulatorWizard() {
  const store = useSimulatorStore()
  const { state, nextStep, prevStep, resetSimulator } = store
  const TOTAL_STEPS = 6

  // Scroll para o topo ao mudar de step (UX)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.step])

  function handleFloorPlanGenerated(plan: FloorPlan) {
    store.setFloorPlan(plan)
    if (plan.warnings.length > 0) {
      store.setAlerts(plan.warnings.map(w => ({
        type: 'warning' as const,
        rule: 'Motor de planta',
        message: w,
      })))
    }
  }

  function canGoNext(): boolean {
    switch (state.step) {
      case 2: return store.totalRequestedArea > 0 || true // budget always valid
      case 3: return state.terrain.width > 0 && state.terrain.depth > 0
      default: return true
    }
  }

  return (
    <div className="min-h-screen bg-creme pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-body text-escuro/40 uppercase tracking-widest mb-1">
                Etapa {state.step} de {TOTAL_STEPS}
              </p>
            </div>
            <button
              id="reset-simulator"
              onClick={() => { if (confirm('Reiniciar o simulador? Todo o progresso será perdido.')) resetSimulator() }}
              className="flex items-center gap-1 text-xs text-escuro/40 hover:text-escuro/70 transition-colors"
            >
              <RotateCcw size={12} />
              Reiniciar
            </button>
          </div>
          <StepProgress currentStep={state.step} totalSteps={TOTAL_STEPS} />
        </div>

        {/* Step content */}
        <div className="animate-fade-up" key={state.step}>
          {state.step === 1 && (
            <Step1FamilyProfile
              profile={state.familyProfile}
              onChange={store.updateFamilyProfile}
            />
          )}
          {state.step === 2 && (
            <Step2Budget
              budget={state.budget}
              onChange={store.updateBudget}
            />
          )}
          {state.step === 3 && (
            <Step3Terrain
              terrain={state.terrain}
              onChange={store.updateTerrain}
            />
          )}
          {state.step === 4 && (
            <Step4Rooms
              rooms={state.rooms}
              maxArea={state.budget.maxArea}
              onUpdate={store.updateRoom}
            />
          )}
          {state.step === 5 && (
            <Step5Summary
              state={state}
              totalArea={store.totalRequestedArea}
              fitsInBudget={store.fitsInBudget}
              fitsInTerrain={store.fitsInTerrain}
            />
          )}
          {state.step === 6 && (
            <Step6FloorPlan
              state={state}
              onFloorPlanGenerated={handleFloorPlanGenerated}
              onConceptChange={store.setConcept}
            />
          )}
        </div>

        {/* Navigation */}
        {state.step < 6 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-dourado/15">
            <button
              id="prev-step"
              onClick={prevStep}
              disabled={state.step === 1}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-sm border transition-all duration-200 font-body text-sm',
                state.step === 1
                  ? 'border-escuro/10 text-escuro/30 cursor-not-allowed'
                  : 'border-dourado/30 text-escuro hover:bg-dourado/10'
              )}
            >
              <ChevronLeft size={16} /> Anterior
            </button>

            <button
              id="next-step"
              onClick={nextStep}
              disabled={!canGoNext()}
              className={cn(
                'flex items-center gap-2 px-6 py-2.5 rounded-sm transition-all duration-200 font-body text-sm font-medium',
                canGoNext()
                  ? 'gradient-gold text-escuro shadow-md hover:brightness-105 active:scale-95'
                  : 'bg-escuro/10 text-escuro/30 cursor-not-allowed'
              )}
            >
              {state.step === 5 ? 'Gerar Planta Baixa' : 'Próximo'}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
