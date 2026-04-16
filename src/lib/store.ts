// ============================================
// Independência — Store com localStorage
// ============================================
import { useState, useEffect, useCallback } from 'react'
import type { SimulatorState, FamilyProfile, Budget, Terrain, Room, FloorPlan, TechnicalAlert, Lead, Furniture } from '@/types'
import { DEFAULT_ROOMS } from '@/types'

const STORAGE_KEY = 'independencia_simulator_v1'

const initialFamilyProfile: FamilyProfile = {
  adults: 2,
  children: 1,
  hasHomeOffice: false,
  cars: 1,
  pets: false,
  accessibility: false,
}

const initialBudget: Budget = {
  maxValue: 350000,
  pricePerM2: 3500,
  maxArea: 100,
}

const initialTerrain: Terrain = {
  width: 10,
  depth: 25,
  unevenness: 0,
  frontSetback: 3,
  sideSetback: 1.5,
  rearSetback: 2,
  totalArea: 250,
  buildableArea: 175,
}

const initialState: SimulatorState = {
  step: 1,
  familyProfile: initialFamilyProfile,
  budget: initialBudget,
  terrain: initialTerrain,
  rooms: DEFAULT_ROOMS,
  inventory: [],
  floors: 1,
  concept: 'l-shape', // Default concept from novo_projeto.hmtl
  floorPlan: null,
  alerts: [],
  leadCaptured: false,
  leadData: {},
}

function loadState(): SimulatorState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...initialState,
        ...parsed,
        // Garante que sub-objetos tenham todos os campos novos
        familyProfile: { ...initialState.familyProfile, ...(parsed.familyProfile || {}) },
        budget:        { ...initialState.budget,        ...(parsed.budget || {})        },
        terrain:       { ...initialState.terrain,       ...(parsed.terrain || {})       },
        inventory:     parsed.inventory || [],
        step:          parsed.step || 1
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar estado do localStorage:', e)
  }
  return initialState
}

function saveState(state: SimulatorState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Erro ao salvar estado:', e)
  }
}

export function useSimulatorStore() {
  const [state, setState] = useState<SimulatorState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])


  const setStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, step }))
  }, [])

  const nextStep = useCallback(() => {
    setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 6) }))
  }, [])

  const prevStep = useCallback(() => {
    setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }))
  }, [])

  const updateFamilyProfile = useCallback((profile: Partial<FamilyProfile>) => {
    setState(prev => ({
      ...prev,
      familyProfile: { ...prev.familyProfile, ...profile },
    }))
  }, [])

  const updateBudget = useCallback((budget: Partial<Budget>) => {
    setState(prev => {
      const newBudget = { ...prev.budget, ...budget }
      // Recalcula área máxima
      newBudget.maxArea = Math.floor(newBudget.maxValue / newBudget.pricePerM2)
      return { ...prev, budget: newBudget }
    })
  }, [])

  const updateTerrain = useCallback((terrain: Partial<Terrain>) => {
    setState(prev => {
      const newTerrain = { ...prev.terrain, ...terrain }
      newTerrain.totalArea = newTerrain.width * newTerrain.depth
      const usableWidth = Math.max(0, newTerrain.width - newTerrain.sideSetback * 2)
      const usableDepth = Math.max(0, newTerrain.depth - newTerrain.frontSetback - newTerrain.rearSetback)
      newTerrain.buildableArea = usableWidth * usableDepth
      
      // CORREÇÃO: Garante que a área aproveitável não seja maior que a área total
      newTerrain.buildableArea = Math.min(newTerrain.buildableArea, newTerrain.totalArea)
      
      return { ...prev, terrain: newTerrain }
    })
  }, [])

  const updateRooms = useCallback((rooms: Room[]) => {
    setState(prev => ({ ...prev, rooms }))
  }, [])

  const updateRoom = useCallback((roomId: string, updates: Partial<Room>) => {
    setState(prev => ({
      ...prev,
      rooms: prev.rooms.map(r => r.id === roomId ? { ...r, ...updates } : r),
    }))
  }, [])

  const setFloorPlan = useCallback((floorPlan: FloorPlan) => {
    setState(prev => ({ ...prev, floorPlan }))
  }, [])

  const setAlerts = useCallback((alerts: TechnicalAlert[]) => {
    setState(prev => ({ ...prev, alerts }))
  }, [])

  const captureLead = useCallback((leadData: Partial<Lead>) => {
    setState(prev => ({ ...prev, leadData, leadCaptured: true }))
  }, [])

  const setInventory = useCallback((inventory: Furniture[]) => {
    setState(prev => ({ ...prev, inventory }))
  }, [])

  const setFloors = useCallback((floors: number) => {
    setState(prev => ({ ...prev, floors }))
  }, [])

  const setConcept = useCallback((concept: import('@/types').ArchConcept) => {
    setState(prev => ({ ...prev, concept }))
  }, [])

  const resetSimulator = useCallback(() => {
    setState(initialState)
  }, [])

  // Computed
  const totalRequestedArea = state.rooms.reduce(
    (sum, r) => sum + r.quantity * r.areaPerUnit, 0
  )

  const fitsInBudget = totalRequestedArea <= state.budget.maxArea
  const fitsInTerrain = totalRequestedArea <= state.terrain.buildableArea

  return {
    state,
    setStep,
    nextStep,
    prevStep,
    updateFamilyProfile,
    updateBudget,
    updateTerrain,
    updateRooms,
    updateRoom,
    setFloorPlan,
    setAlerts,
    captureLead,
    setInventory,
    setFloors,
    setConcept,
    resetSimulator,
    totalRequestedArea,
    fitsInBudget,
    fitsInTerrain,
  }
}

// Admin leads storage
const LEADS_KEY = 'independencia_leads_v1'
const ARCHITECTS_KEY = 'independencia_architects_v1'

export function getLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  } catch { return [] }
}

export function saveLead(lead: Lead): void {
  const leads = getLeads()
  const idx = leads.findIndex(l => l.id === lead.id)
  if (idx >= 0) leads[idx] = lead
  else leads.unshift(lead)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
}

export function getArchitects() {
  try {
    const saved = localStorage.getItem(ARCHITECTS_KEY)
    if (saved) return JSON.parse(saved)
  } catch { }
  // Default architects
  return [
    { id: '1', name: 'Ana Paula Ferreira', specialty: 'Residencial Contemporâneo', available: true, calendlyUrl: 'https://calendly.com/', photo: '', rating: 4.9 },
    { id: '2', name: 'Carlos Mendes', specialty: 'Arquitetura Sustentável', available: true, calendlyUrl: 'https://calendly.com/', photo: '', rating: 4.7 },
    { id: '3', name: 'Beatriz Santos', specialty: 'Interiores & Reforma', available: false, calendlyUrl: 'https://calendly.com/', photo: '', rating: 4.8 },
  ]
}
