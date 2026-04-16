// Extração de constantes e utilitários de:
// - app/src/lib/floorPlanEngine.ts
// - app/src/lib/store.ts
// - app/src/lib/utils.ts

// ── floorPlanEngine.ts ────────────────────────────────────────────────
export const SCALE = 40
export const PAD = 40
export const DOOR_W = 0.80
export const DOOR_GAP = 0.10

export const SECTOR_FILL = {
  social:  '#F4EFE6', // Bege claro sofisticado
  private: '#EBEFF2', // Azul acinzentado técnico
  service: '#F2F2F2', // Cinza neutro
  external:'#E6EAE5'  // Verde acinzentado suave para áreas externas transitórias
}

export const FURNITURE_DB: Record<string, Array<{ name: string; w: number; d: number; type?: string }>> = {
  living: [
    { name: 'Sofá L', w: 2.50, d: 2.00 },
    { name: 'Rack/Painel TV', w: 2.00, d: 0.45 },
    { name: 'Mesa de Centro', w: 0.80, d: 0.50 }
  ],
  balcony: [
    { name: 'Mesa Cadeiras', w: 0.80, d: 0.80 },
    { name: 'Poltrona', w: 0.70, d: 0.70 }
  ],
  corridor: [
    { name: 'Aparador', w: 1.20, d: 0.35 }
  ],
  transition: [
    { name: 'Rouparia / Estante', w: 1.00, d: 0.40 }
  ],
  stair: [
    { name: 'Plataforma Escada', w: 1.80, d: 1.80 }
  ],
  suite: [
    { name: 'Cama Casal', w: 1.60, d: 2.00 },
    { name: 'G.Roupa/Closet', w: 2.20, d: 0.60, type: 'closet' },
    { name: 'Criado-mudo 1', w: 0.50, d: 0.45 },
    { name: 'Criado-mudo 2', w: 0.50, d: 0.45 },
    { name: 'Vaso Sanit.', w: 0.40, d: 0.65 },
    { name: 'Bancada Pia', w: 1.00, d: 0.50 },
    { name: 'Box Chuveiro', w: 0.90, d: 0.90 }
  ],
  bedroom: [
    { name: 'Cama', w: 1.40, d: 1.90 },
    { name: 'Guarda-roupa', w: 1.50, d: 0.60, type: 'closet' },
    { name: 'Escrivaninha', w: 1.10, d: 0.55 }
  ],
  homeOffice: [
    { name: 'Escrivaninha', w: 1.40, d: 0.60 },
    { name: 'Cadeira', w: 0.60, d: 0.60 },
    { name: 'Estante', w: 0.90, d: 0.40 }
  ],
  bathroom: [
    { name: 'Vaso Sanit.', w: 0.40, d: 0.65 },
    { name: 'Bancada Pia', w: 1.00, d: 0.50 },
    { name: 'Box Chuveiro', w: 0.90, d: 0.90 }
  ],
  kitchen: [
    { name: 'Geladeira', w: 0.80, d: 0.75 },
    { name: 'Fogão', w: 0.75, d: 0.65 },
    { name: 'Pia/Bancada', w: 1.80, d: 0.60, type: 'lshelf' },
    { name: 'Armários', w: 1.00, d: 0.40 }
  ],
  laundry: [
    { name: 'M. Lavar', w: 0.65, d: 0.65 },
    { name: 'Tanque', w: 0.60, d: 0.60 },
    { name: 'Armário Mult.', w: 0.80, d: 0.50 }
  ],
  garage: [
    { name: 'Veículo', w: 2.10, d: 4.80, type: 'vehicle' },
    { name: 'Arm. Ferramentas', w: 1.20, d: 0.50 }
  ]
}

export const ROOM_MINS: Record<string, { w: number; area: number; asp: number }> = {
  living:     { w: 3.00, area: 10.00, asp: 1.6 },
  suite:      { w: 2.50, area: 9.00,  asp: 1.2 },
  bedroom:    { w: 2.40, area: 8.00,  asp: 1.2 },
  kitchen:    { w: 1.50, area: 5.00,  asp: 1.3 },
  bathroom:   { w: 1.10, area: 2.80,  asp: 0.75 },
  garage:     { w: 3.00, area: 15.00, asp: 1.8 },
  balcony:    { w: 2.00, area: 6.00,  asp: 2.0 },
  laundry:    { w: 1.20, area: 2.00,  asp: 1.2 },
  homeOffice: { w: 2.40, area: 6.00,  asp: 1.2 },
  corridor:   { w: 0.90, area: 1.00,  asp: 4.0 },
  transition: { w: 1.20, area: 2.50, asp: 1.0 },
  stair:      { w: 2.00, area: 4.00,  asp: 1.0 },
}

// Helpers de engenharia / algoritmos
export function m(v: number): number { return Math.round(v * SCALE) }
export function p2m(px: number): number { return px / SCALE }
export function snapToGrid(val: number, type: string | 'terrain'): number {
  let box = 0.60
  if (['bathroom', 'laundry', 'corridor', 'transition'].includes(type)) box = 0.15
  return Math.round(val / box) * box
}
export function checkCollision(
  newRect: { x: number; y: number; width: number; height: number },
  placedRects: Array<{ x: number; y: number; width: number; height: number }>,
  bldX: number,
  bldY: number,
  bldW: number,
  bldH: number
): boolean {
  if (
    newRect.x < bldX ||
    newRect.y < bldY ||
    newRect.x + newRect.width > bldX + bldW ||
    newRect.y + newRect.height > bldY + bldH
  ) return true
  for (const existing of placedRects) {
    if (
      newRect.x + newRect.width + 0.2 > existing.x &&
      newRect.x < existing.x + existing.width + 0.2 &&
      newRect.y + newRect.height + 0.2 > existing.y &&
      newRect.y < existing.y + existing.height + 0.2
    ) return true
  }
  return false
}

// ── store.ts ─────────────────────────────────────────────────────────────────
export interface Theme {
  colors: { [key: string]: string }
  spacing: number[]
  borderRadius: number
  shadows: { [key: string]: string }
}
export interface FloorPlanState {
  terrain: { width: number; depth: number; frontSetback: number; sideSetback: number }
  config: {
    corridor: { hasDoor: boolean; width: number; minClearance: number; naturalLightRatio: number }
    isLandscape: boolean
    rooms: any[]
  }
  rooms: any[]
  activeFloor: number
  theme: Theme
  warnings: string[]
}
const initialState: FloorPlanState = {
  terrain: { width: 30, depth: 30, frontSetback: 5, sideSetback: 5 },
  config: {
    corridor: { hasDoor: true, width: 1.2, minClearance: 0, naturalLightRatio: 0 },
    isLandscape: false,
    rooms: []
  },
  rooms: [],
  activeFloor: 0,
  theme: {
    colors: { primary: '#4A90E2', secondary: '#50E3C2', background: '#FAF8F5', surface: '#FFFFFF' },
    spacing: [0, 8, 16, 24, 32],
    borderRadius: 8,
    shadows: { sm: '0 1px 3px rgba(0,0,0,0.12)', md: '0 4px 8px rgba(0,0,0,0.12)' }
  },
  warnings: []
}
// store minimal: getters + actions as plain functions for extraction
export const getters = {
  activeRooms: (s: FloorPlanState) => s.rooms.filter(r => (r.floor || 0) === s.activeFloor),
  totalArea: (s: FloorPlanState) => s.rooms.reduce((a, r) => a + (r.areaM2 || 0), 0),
  warnings: (s: FloorPlanState) => s.warnings
}
export const actions = {
  setTerrain: (s: FloorPlanState, payload: Partial<FloorPlanState['terrain']>) => { s.terrain = { ...s.terrain, ...payload } },
  addRoom: (s: FloorPlanState, room: any) => { s.rooms.push(room) },
  updateRoom: (s: FloorPlanState, updated: any) => {
    const i = s.rooms.findIndex(r => r.id === updated.id)
    if (i >= 0) s.rooms[i] = { ...s.rooms[i], ...updated }
  },
  removeRoom: (s: FloorPlanState, id: string) => { s.rooms = s.rooms.filter(r => r.id !== id) },
  generate: (s: FloorPlanState) => { /* stub */ },
  setActiveFloor: (s: FloorPlanState, floor: number) => { s.activeFloor = floor },
  setTheme: (s: FloorPlanState, theme: Theme) => { s.theme = theme }
}

// ── utils.ts ─────────────────────────────────────────────────────────────────
export function formatArea(value: number): string {
  return `${value.toFixed(1)} m²`
}
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}