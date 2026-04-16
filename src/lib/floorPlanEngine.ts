// ============================================
// Independência — Motor de Planta Baixa 2D v3
// Motor confiável com regras arquitetônicas
// ============================================
import type { Room, RoomRect, FloorPlan, Door, Window, SectorType, RoomType, Furniture } from '@/types'

// ── Constantes ──────────────────────────────
const SCALE   = 40   // px por metro
const PAD     = 40   // margem canvas (px)
const DOOR_W  = 0.80 // largura porta (m)
const DOOR_GAP = 0.10 // folga da porta ao canto (m)

// ── Cores por setor ─────────────────────────
// ── Cores por setor ─────────────────────────
// Sincronizado com types/index.ts: ROOM_COLORS
const SECTOR_FILL: Record<SectorType, string> = {
  social:  '#F4EFE6', // Bege claro sofisticado
  private: '#EBEFF2', // Azul acinzentado técnico
  service: '#F2F2F2', // Cinza neutro
  external: '#E6EAE5' // Verde acinzentado suave para áreas externas transitórias
}

// ── Matriz de Adjacência e Pesos de Fluxo ──
// (Removida por não ser utilizada no algoritmo atual)
// const ADJACENCY_RULES: Record<RoomType, RoomType[]> = {
//   kitchen: ['laundry', 'living', 'balcony'],
//   living: ['kitchen', 'corridor', 'transition', 'garage'],
//   laundry: ['kitchen'],
//   suite: ['transition'],
//   bedroom: ['transition'],
//   bathroom: ['transition', 'suite'],
//   garage: ['living', 'laundry'],
//   corridor: ['living', 'homeOffice'],
//   balcony: ['living', 'kitchen'],
//   homeOffice: ['corridor', 'living'],
//   transition: ['suite', 'bedroom', 'bathroom', 'living', 'corridor', 'stair'],
//   stair: ['living', 'transition']
// }

// ── Biblioteca de Mobiliário (Spec Atualizada com Obrigatoriedades) ──
const FURNITURE_DB: Partial<Record<RoomType, { name: string; w: number; d: number; type?: string }[]>> = {
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
    // + Itens do banheiro embutidos na suíte
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

// ── Helpers ─────────────────────────────────
function m(v: number): number { return Math.round(v * SCALE) }
function p2m(px: number): number { return px / SCALE }

/**
 * Embaralha um array (Fisher-Yates)
 * (Função mantida para uso futuro)
 */
// function shuffleArray<T>(array: T[]): T[] {
//   const arr = [...array]
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]]
//   }
//   return arr
// }

/**
 * Retorna um valor com jitter (variação aleatória controlada)
 */
function jitter(val: number, range: number = 0.2): number {
  return val + (Math.random() * range - range / 2)
}

/**
 * Verifica colisão entre cômodos previne sobreposição
 */
function checkCollision(
  newRect: RoomRect,
  placedRects: RoomRect[],
  bldX: number,
  bldY: number,
  bldWm: number,
  bldHm: number
): boolean {
  // Verifica se está dentro dos limites do terreno
  if (newRect.x < bldX || 
      newRect.y < bldY ||
      newRect.x + newRect.width > bldX + bldWm ||
      newRect.y + newRect.height > bldY + bldHm) {
    return true
  }

  // Verifica colisão com outros cômodos (com folga de 0.2m para circulação)
  for (const existing of placedRects) {
    if (newRect.x + newRect.width + 0.2 > existing.x &&
        newRect.x < existing.x + existing.width + 0.2 &&
        newRect.y + newRect.height + 0.2 > existing.y &&
        newRect.y < existing.y + existing.height + 0.2) {
      return true
    }
  }

  return false
}

// ── Restrições Mínimas (SPEC: Tabela de Referência Rápida) ──
const ROOM_MINS: Record<RoomType, { w: number; area: number; asp: number }> = {
  living:     { w: 3.00, area: 10.00, asp: 1.6 },
  suite:      { w: 2.50, area: 9.00,  asp: 1.2 },
  bedroom:    { w: 2.40, area: 8.00,  asp: 1.2 },
  kitchen:    { w: 1.50, area: 5.00,  asp: 1.3 },
  bathroom:   { w: 1.10, area: 2.80,  asp: 0.75 },
  garage:     { w: 3.00, area: 15.00, asp: 1.8 }, // Largura 3m para garantir circulação de 60cm
  balcony:    { w: 2.00, area: 6.00,  asp: 2.0 },
  laundry:    { w: 1.20, area: 2.00,  asp: 1.2 },
  homeOffice: { w: 2.40, area: 6.00,  asp: 1.2 },
  corridor:   { w: 0.90, area: 1.00,  asp: 4.0 }, // Largura mínima NBR
  transition: { w: 1.20, area: 2.50,  asp: 1.0 }, // Hall íntimo ou átrio
  stair:      { w: 2.00, area: 4.00,  asp: 1.0 }, // Fosso de escada padrão U-shape
}

// ── GRID ESTRUTURAL (Estilo "LEGO Flexível") ────────────
const GRID_MAJOR = 3.00; // Malha Estrutural Principal (ex: Pilares)
const GRID_MINOR = 0.60; // Módulo de Crescimento Progressivo
const GRID_FINE  = 0.15; // Módulo de Ajuste Fino (Vedação e Áreas Molhadas)

function snapToGrid(val: number, type: RoomType | 'terrain'): number {
  let box = GRID_MINOR; 
  
  // Áreas complexas ou de vedação fina usam o Box de 15cm
  if (['bathroom', 'laundry', 'corridor', 'transition'].includes(type)) {
     box = GRID_FINE; 
  }
  // Os eixos primários (Salas, Quartos, Terreno e Garagem) crescem em 0.60m
  return Math.round(val / box) * box;
}

// ── Cria RoomRect com dimensões calculadas ──
function makeRect(
  room: Room,
  baseX: number,
  baseY: number,
  _maxWm: number
): RoomRect {
  const spec = ROOM_MINS[room.type] || { w: 1.8, area: 4, asp: 1.2 }
  
  // 1. Pega os móveis obrigatórios
  const suggestions = FURNITURE_DB[room.type] || []
  
  // Largura necessária: todos os móveis em uma linha + folgas de 20cm
  const totalFWidth = suggestions.reduce((sum, s) => sum + s.w, 0) + (suggestions.length * 0.20)
  // Largura mínima é o maior entre a Spec e a soma dos móveis
  // Adicionamos um JITTER de até 30cm para cada geração ser diferente
  const baseW = Math.max(spec.w, Math.min(6.0, totalFWidth))
  const roomW = jitter(baseW, 0.4) 
  
  // Profundidade: Móvel mais profundo + 0.80m (60cm circulação + 20cm folga)
  const maxFDepth = suggestions.reduce((max, s) => Math.max(max, s.d), 0)
  const baseH = Math.max(spec.w, maxFDepth + 0.80)
  const roomH = jitter(baseH, 0.4)

  // Ignora o room.areaPerUnit se for maior que o necessário (Zero Ociosidade)
  let wM = Math.max(spec.w, roomW)
  let hM = Math.max(spec.w, roomH)

  // Arredonda as paredes e coordenadas para se encaixarem na Modulação Construtiva
  wM     = snapToGrid(wM, room.type)
  hM     = snapToGrid(hM, room.type)
  const snapX = snapToGrid(baseX, room.type)
  const snapY = snapToGrid(baseY, room.type)

  return {
    id:     room.id,
    type:   room.type,
    name:   room.name,
    sector: room.sector,
    finish: room.finish || 'Cimentado',
    isWetArea: room.isWetArea || false,
    x: snapX,
    y: snapY,
    width:  wM,
    height: hM,
    areaM2: wM * hM,
    doors:  [],
    windows: [],
    furnitures: [],
    floor: 0, // Padrão térreo
  }
}

// ── Detecta paredes externas ─────────────────
type Wall = 'top' | 'right' | 'bottom' | 'left'

function getExtWalls(
  r: RoomRect,
  minX: number, minY: number,
  maxX: number, maxY: number
): Wall[] {
  const walls: Wall[] = []
  if (r.y             <= minY + 6)  walls.push('top')
  if (r.x + r.width  >= maxX - 6)  walls.push('right')
  if (r.y + r.height >= maxY - 6)  walls.push('bottom')
  if (r.x            <= minX + 6)  walls.push('left')
  return walls
}

// ── Porta: 10cm do canto, nunca centralizada ─
function makeDoor(wall: Wall, wallDimPx: number, openLeft: boolean): Door {
  const folga  = m(DOOR_GAP)
  const doorPx = m(DOOR_W)
  const pos    = (folga + doorPx / 2) / wallDimPx
  return { wall, position: Math.min(pos, 0.85), openLeft }
}

// ── Janela centralizada em parede externa ────
function makeWindow(wall: Wall, widthM: number): Window {
  return { wall, position: 0.5, widthPx: m(widthM) }
}

// ── Largura de janela por tipo ───────────────
function winWidth(type: RoomType): number {
  if (['suite', 'bedroom', 'homeOffice'].includes(type)) return 1.10
  if (type === 'bathroom')  return 0.50
  if (type === 'living')    return 1.50
  if (type === 'kitchen')   return 0.80
  if (type === 'laundry')   return 0.50
  return 0.80
}

// ── MOTOR PRINCIPAL ──────────────────────────
export function generateFloorPlan(
  rooms: Room[],
  terrainWidth: number,
  terrainDepth: number,
  frontSetback: number,
  sideSetback: number,
  rearSetback: number,
  _inventory: Furniture[] = [],
  floorsRequested: number = 1,
  concept: import('@/types').ArchConcept = 'l-shape'
): FloorPlan {
  const debugLogs: string[] = []
  debugLogs.push(`[INIT] Iniciando motor procedimental. Conceito: ${concept} | Pavimentos solicitados: ${floorsRequested}`)

  const streetH = 7
  const bldWm = snapToGrid(Math.max(3, terrainWidth - sideSetback * 2), 'terrain')
  const bldHm = snapToGrid(Math.max(3, terrainDepth - frontSetback - rearSetback), 'terrain')

  // CORREÇÃO: Coordenadas devem ser relativas ao início do terreno, não absolutas
  const bldX = snapToGrid(sideSetback, 'terrain')
  const bldY = snapToGrid(Math.max(5, frontSetback), 'terrain')
  
  const cW = m(terrainWidth)
  const cH = m(terrainDepth + streetH)

  const expanded: Room[] = []
  
  // NBR 6492: Corridor
  if (!rooms.some(r => r.type === 'corridor') && rooms.some(r => r.sector === 'private')) {
    expanded.push({ 
      id: 'spine-corridor', type: 'corridor', name: 'Circulação', quantity: 1, 
      areaPerUnit: 6, sector: 'private', environment: 'internal', hasWindow: false, hasDoor: true, 
      finish: 'Laminado', isWetArea: false 
    })
  }

  for (const r of rooms.filter(rm => rm.quantity > 0)) {
    for (let i = 0; i < r.quantity; i++) {
      expanded.push({
        ...r, id: `${r.id}_${i}`,
        name: r.quantity > 1 ? `${r.name} ${i + 1}` : r.name,
        quantity: 1,
      })
    }
  }

  if (expanded.length === 0) {
    return { rooms: [], scale: SCALE, canvasWidth: cW, canvasHeight: cH, valid: false, warnings: ['Nenhum cômodo disponível.'], debugLogs, score: 0 }
  }

  const placed: RoomRect[] = []
  const warnings: string[] = []

  const isLinear  = concept === 'linear'
  const isPatio   = concept === 'patio'
  const isLShape  = concept === 'l-shape'
  const isCompact = concept === 'compact' || concept === 'monolithic' || concept === 'vertical'
  const isHybrid  = concept === 'hybrid'

  // FASE 1: NÚCLEO SOCIAL
  const socialRooms = expanded.filter(r => r.sector === 'social')
  const living = socialRooms.find(r => r.type === 'living') || expanded[0]
  const coreRect = makeRect(living, bldX, bldY, bldWm)
  if (isLinear || isCompact) coreRect.width = Math.max(4, bldWm / (isCompact ? 2 : 3))
  placed.push(coreRect)

  // FASE 2: SERVIÇO
  const serviceRooms = expanded.filter(r => r.sector === 'service')
  let sX = coreRect.x + coreRect.width
  let sY = coreRect.y
  
  // 1. Âncora da Garagem (Rule: Fixed to Front Boundary)
  const garageR = serviceRooms.find(r => r.type === 'garage')
  if (garageR) {
    debugLogs.push(`[RULE] Ancorando Garagem à Linha de Testada Frontal Y=${bldY}m`)
    const rx = makeRect(garageR, Math.max(bldX, bldX + bldWm - 3.2), bldY, bldWm)
    placed.push(rx)
  }

  // 2. Outros Serviços com verificação de colisão
  for (const r of serviceRooms.filter(r => r.type !== 'garage')) {
    if (sX + 1.8 > bldX + bldWm) { 
      sX = bldX; 
      sY = coreRect.y + coreRect.height + 0.6; // Adiciona folga vertical
    }
    
    let rect = makeRect(r, sX, sY, bldWm)
    
    // CORREÇÃO: Verifica colisão e ajusta posição
    if (checkCollision(rect, placed, bldX, bldY, bldWm, bldHm)) {
      // Tenta posicionar abaixo do último cômodo
      sY = coreRect.y + coreRect.height + 0.6;
      rect = makeRect(r, sX, sY, bldWm);
      
      // Se ainda colidir, move para próxima coluna
      if (checkCollision(rect, placed, bldX, bldY, bldWm, bldHm)) {
        sX += GRID_MAJOR;
        sY = coreRect.y;
        rect = makeRect(r, sX, sY, bldWm);
      }
    }
    
    placed.push(rect)
    sX += rect.width + 0.2; // Adiciona folga entre cômodos
  }

  // FASE 3: ESPINHA / JARDIM
  const spine = expanded.find(r => r.type === 'corridor')
  let spineRect: RoomRect | null = null
  if (isPatio || isHybrid) {
    const gardenSize = isPatio ? 4 : 2
    spineRect = {
       id: 'void-garden', type: 'corridor', name: isPatio ? 'Pátio Central' : 'Jardim de Inverno', sector: 'social',
       finish: 'Grama / Pedrisco', isWetArea: true,
       x: bldX + coreRect.width * 0.5, y: bldY + coreRect.height, width: gardenSize, height: gardenSize,
       areaM2: gardenSize * gardenSize, doors: [], windows: [], furnitures: [], floor: 0
    }
    placed.push(spineRect)
  } else if (spine) {
    const spineX = isLShape ? coreRect.x : bldX
    const spineY = coreRect.y + coreRect.height
    spineRect = makeRect(spine, spineX, spineY, bldWm)
    spineRect.width = (isLShape || isCompact) ? coreRect.width : 1.20
    spineRect.height = (isLShape || isCompact) ? 1.20 : snapToGrid(Math.min(8, bldHm - coreRect.height), 'corridor')
    placed.push(spineRect)
  }

  // FASE 4: ALA ÍNTIMA E SOBRADOS
  const privateRooms = expanded.filter(r => r.sector === 'private' && r.type !== 'corridor')
  
  if (floorsRequested > 1) {
    debugLogs.push(`[RULE] Pavimento Superior Ativo. Realocando Ala Íntima para o Piso 1 e gerando Escada.`)
    
    // 1. Gera Escada no Térreo anexada ao Living
    const stairR: Room = { id: 'stair-0', type: 'stair', name: 'Escada', quantity: 1, areaPerUnit: 4, sector: 'social', hasWindow: false, hasDoor: false, finish: 'Concreto', isWetArea: false, environment: 'internal' }
    const stairX = coreRect.x + coreRect.width - 1.80; // Múltiplo de 0.60
    const stairY = coreRect.y;
    const stairRect = makeRect(stairR, stairX, stairY, bldWm)
    stairRect.floor = 0
    placed.push(stairRect)

    // 2. Hall Superior (Transition) no Piso 1 exatamente em cima da Escada
    const transR: Room = { id: 'trans-1', type: 'transition', name: 'Hall Superior', quantity: 1, areaPerUnit: 2.5, sector: 'private', hasWindow: false, hasDoor: true, finish: 'Laminado', isWetArea: false, environment: 'internal' }
    const transRect = makeRect(transR, stairX, stairY, bldWm)
    transRect.floor = 1
    placed.push(transRect)

    // 3. Distribuição dos Quartos (Floor: 1) // HomeOffice pode ficar no 0
    let uY = transRect.y + transRect.height
    let privY = bldY + coreRect.height
    let privX = bldX

    for (const r of privateRooms) {
      if (r.type === 'homeOffice') {
        const rect = makeRect(r, privX, privY, bldWm)
        rect.floor = 0
        placed.push(rect)
        privY += rect.height
      } else {
        const rect = makeRect(r, coreRect.x, uY, bldWm)
        rect.floor = 1 // Trava cômodo no céu
        placed.push(rect)
        uY += rect.height 
      }
    }
  } else {
    // Lógica Térrea (Original)
    let privX = bldX
    let privY = bldY
    if (isLShape && spineRect) {
       privX = coreRect.x + coreRect.width
       privY = coreRect.y
    } else if (spineRect) {
       privX = spineRect.x
       privY = spineRect.y + spineRect.height
    } else {
       privX = bldX
       privY = coreRect.y + coreRect.height
    }

    let startPrivY = privY;
    let maxColW = 0;
    
    // CORREÇÃO: Sistema de grid com verificação de colisão
    for (const r of privateRooms) {
      let rect = makeRect(r, privX, privY, bldWm)
      
      // Verifica se o cômodo cabe no terreno e não colide com outros
      if (privY + rect.height > bldY + bldHm || 
          checkCollision(rect, placed, bldX, bldY, bldWm, bldHm)) {
        privX += Math.max(GRID_MAJOR, maxColW + 0.6); // Adiciona folga entre cômodos
        privY = startPrivY;
        maxColW = 0;
        rect = makeRect(r, privX, privY, bldWm);
        
        // Se ainda não couber, pula para próxima linha
        if (privX + rect.width > bldX + bldWm) {
          privX = bldX;
          privY += GRID_MAJOR * 2;
          rect = makeRect(r, privX, privY, bldWm);
        }
      }
      
      maxColW = Math.max(maxColW, rect.width);
      rect.floor = 0
      placed.push(rect)
      privY += rect.height
    }
  }

  // FASE 5: PIXELS
  const processed: RoomRect[] = placed.map(rx => {
    const r: RoomRect = { 
      ...rx, 
      floor: rx.floor ?? 0,
      x: m(rx.x), y: m(rx.y), width: m(rx.width), height: m(rx.height),
      doors: [], windows: [], furnitures: [] 
    }
    const ext = getExtWalls(r, m(bldX), m(bldY), m(bldX + bldWm), m(bldY + bldHm))
    if (['suite','bedroom','bathroom','kitchen','living'].includes(r.type) && ext.length > 0) {
      r.windows.push(makeWindow(ext[0], winWidth(r.type)))
    }
    
    // Regra Inteligente de Portas (Filtro Anti-Landscape)
    const intWalls = (['top','right','bottom','left'] as Wall[]).filter(w => !ext.includes(w))
    let doorWall: Wall = intWalls.length > 0 ? intWalls[0] : 'bottom'

    // Garagem sempre aponta para o Portão/Testada (que é o 'top' geométrico)
    if (r.type === 'garage') {
      doorWall = 'top'
      r.doors.push(makeDoor(doorWall, r.width, false))
    } 
    else if (r.type === 'living' && ext.includes('top')) {
      // Porta de Entrada Principal aponta para o passeio (top)
      r.doors.push(makeDoor('top', r.width, false))
    }
    else {
      // Prioridade de paredes internas baseadas no setor para não esbarrar em móvel
      if (r.sector === 'private') doorWall = intWalls.includes('left') ? 'left' : (intWalls.includes('top') ? 'top' : doorWall)
      else if (r.sector === 'service') doorWall = intWalls.includes('left') ? 'left' : (intWalls.includes('right') ? 'right' : doorWall)

      const wallLgt = (doorWall === 'top' || doorWall === 'bottom') ? r.width : r.height
      r.doors.push(makeDoor(doorWall, wallLgt, true))
    }

    const suggestions = FURNITURE_DB[r.type] || []
    
    // Algoritmo Modular de Ancoragem com Prevenção de Colisão (Bounding Box + Clearance)
    const placedItems: { x: number, y: number, w: number, d: number }[] = []

    function isOverlapping(nx: number, ny: number, nw: number, nd: number, itemName: string) {
      const isBed = itemName.includes('Cama');
      const marginSide = isBed ? 0.60 : 0.15; // Clearance ampliado para giro ao redor da cama
      const marginFront = isBed ? 0.60 : 0.15;
      for (const p of placedItems) {
        if (!(nx + nw + marginSide <= p.x ||
              nx - marginSide >= p.x + p.w ||
              ny + nd + marginFront <= p.y ||
              ny - marginFront >= p.y + p.d)) {
           return true; 
        }
      }
      return false;
    }

    suggestions.forEach((it: any, idx) => {
      let fx = 0.15;
      let fy = 0.15;
      
      const rW = p2m(r.width);
      const rH = p2m(r.height);

      // 1. Tenta a Posição IDEAL (A mais correta arquitetonicamente)
      if (r.type === 'living' && it.name.includes('TV')) {
        fx = (rW - it.w) / 2; fy = 0.10;
      } else if (r.type === 'living' && it.name.includes('Sofá')) {
        fx = (rW - it.w) / 2; fy = rH - it.d - 0.20;
      } else if (r.type === 'living' && it.name.includes('Mesa')) {
        fx = (rW - it.w) / 2; fy = (rH - it.d) / 2; 
      } else if ((it.type === 'closet' || it.name.includes('Roupa'))) {
        fx = Math.max(0.0, rW - it.w - 0.05); fy = 0.05;
      } else if (it.name.includes('Cama')) {
        fx = 0.0; fy = Math.max(0.05, (rH - it.d) / 2); // Cama cravada na parede (0.0)
      } else if (it.name.includes('Criado-mudo 1')) {
        fx = 0.0; fy = Math.max(0.05, (rH - 2.00) / 2 - it.d - 0.05);
      } else if (it.name.includes('Criado-mudo 2')) {
        fx = 0.15; fy = Math.min(rH - it.d - 0.15, (rH + 2.00) / 2 + 0.05);
      } else if (['bathroom', 'suite'].includes(r.type) && it.name.includes('Vaso')) {
        fx = 0.15; fy = 0.15;
      } else if (['bathroom', 'suite'].includes(r.type) && it.name.includes('Bancada')) {
        fx = 0.65; fy = 0.10;
      } else if (['bathroom', 'suite'].includes(r.type) && it.name.includes('Box')) {
        fx = Math.max(0.15, rW - it.w - 0.05); fy = Math.max(0.15, rH - it.d - 0.05); 
      } else if (r.type === 'kitchen' && it.type === 'lshelf') {
        fx = Math.max(0.15, rW - it.w - 0.10); fy = 0.10;
      } else if (r.type === 'kitchen' && it.name.includes('Geladeira')) {
        fx = 0.10; fy = 0.10;
      } else if (r.type === 'kitchen' && it.name.includes('Fogão')) {
        fx = Math.max(0.10, rW - it.w - 0.15); fy = 0.10;
      }

      // 2. Resolve Colisões (Caso o móvel tente nascer em cima de outro)
      if (isOverlapping(fx, fy, it.w, it.d, it.name)) {
        let placed = false;
        // Escaneia a malha do cômodo a partir de zero procurando um espaço livre
        for (let tryY = 0.0; tryY <= rH - it.d; tryY += 0.40) {
          for (let tryX = 0.0; tryX <= rW - it.w; tryX += 0.40) {
            if (!isOverlapping(tryX, tryY, it.w, it.d, it.name)) {
              fx = tryX; fy = tryY;
              placed = true;
              break;
            }
          }
          if (placed) break;
        }
      }

      // 3. Previne que o móvel vaze para fora da parede do cômodo
      fx = Math.max(0.0, Math.min(fx, rW - it.w));
      fy = Math.max(0.0, Math.min(fy, rH - it.d));

      placedItems.push({ x: fx, y: fy, w: it.w, d: it.d });

      r.furnitures.push({
        id: `${r.id}_f_${idx}`, name: it.name, width: it.w, depth: it.d,
        x: fx, y: fy, isExisting: false, type: it.type || 'standard'
      })
    })
    return r
  })

  // FASE 6: VALIDAÇÃO HEURÍSTICA E PONTUAÇÃO - DESATIVADA
  // Score heurístico desativado conforme solicitado.
  // debugLogs mantém rastreabilidade da execução.
  debugLogs.push(`[FIM] Motor finalizou renderização isométrica de ${processed.length} cômodos.`)
  return { rooms: processed, scale: SCALE, canvasWidth: cW, canvasHeight: cH, valid: true, warnings, debugLogs, score: 0 }
}


export function renderFloorPlan(
  canvas: HTMLCanvasElement,
  plan: FloorPlan,
  terrainWidth: number,
  terrainDepth: number,
  sideSetback: number,
  frontSetback: number,
  activeFloor: number = 0,
  isLandscape: boolean = false
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  canvas.width  = (isLandscape ? plan.canvasHeight : plan.canvasWidth) * dpr
  canvas.height = (isLandscape ? plan.canvasWidth : plan.canvasHeight) * dpr
  canvas.style.width  = `${isLandscape ? plan.canvasHeight : plan.canvasWidth}px`
  canvas.style.height = `${isLandscape ? plan.canvasWidth : plan.canvasHeight}px`
  
  // Limpa o estado e escala
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (isLandscape) {
    ctx.translate(0, plan.canvasWidth)
    ctx.rotate(-Math.PI / 2)
  }

  // Intercepta e Anula a rotação visual dos Testos (Para ficarem legíveis)
  const originalFillText = ctx.fillText.bind(ctx)
  ctx.fillText = (text: string, x: number, y: number, maxWidth?: number) => {
    if (isLandscape) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(Math.PI / 2)
      if (maxWidth) originalFillText(text, 0, 0, maxWidth)
      else originalFillText(text, 0, 0)
      ctx.restore()
    } else {
      if (maxWidth) originalFillText(text, x, y, maxWidth)
      else originalFillText(text, x, y)
    }
  }

  // Fundo
  ctx.fillStyle = '#FAF8F5'
  ctx.fillRect(0, 0, plan.canvasWidth, plan.canvasHeight)

  // Grade métrica (Ultra sutil)
  ctx.strokeStyle = 'rgba(200,168,130,0.12)'
  ctx.lineWidth = 0.5
  for (let x = 0; x < plan.canvasWidth; x += m(1)) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, plan.canvasHeight); ctx.stroke()
  }
  for (let y = 0; y < plan.canvasHeight; y += m(1)) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(plan.canvasWidth, y); ctx.stroke()
  }

  // ── PAISAGISMO (Jardins nos Recuos) ──────────────
  drawLandscape(ctx, plan, terrainWidth, terrainDepth, sideSetback, frontSetback)

  // ── CENÁRIO URBANO (RUA E CALÇADA) ────────────────
  const streetH = m(7) // Rua padrão 7m
  const sidewalkH = m(2.5) // Calçada 2.5m conforme SPEC
  
  // Desenho da Rua (Asfalto)
  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, plan.canvasWidth, streetH)
  
  // Linha divisória da rua (Tracejada amarela)
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 2
  ctx.setLineDash([20, 15])
  ctx.beginPath(); ctx.moveTo(0, streetH/2); ctx.lineTo(plan.canvasWidth, streetH/2); ctx.stroke()
  ctx.setLineDash([])

  // Desenho da Calçada (Agora INTERNA ao terreno)
  const terrainStartY = streetH
  const terrainStartX = (plan.canvasWidth - m(terrainWidth)) / 2

  ctx.fillStyle = '#E0E0E0'
  ctx.fillRect(terrainStartX, terrainStartY, m(terrainWidth), sidewalkH)
  
  // Meio-fio (Guia)
  ctx.strokeStyle = '#999999'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(terrainStartX, terrainStartY); ctx.lineTo(terrainStartX + m(terrainWidth), terrainStartY); ctx.stroke()

  // ── TERRENO E RECUOS ──────────────────────────────
  // Ajuste do Ponto Zero do Terreno (Inicia APÓS a rua)
  // terrainStartX e terrainStartY definidos acima na calçada

  // Contorno do terreno (Linha de Divisa)
  ctx.strokeStyle = '#1A1714'
  ctx.lineWidth   = 2
  ctx.strokeRect(terrainStartX, terrainStartY, m(terrainWidth), m(terrainDepth))

  // Recuo Frontal Obrigatório (padrão 5m ou o definido no terrain)
  const fRecuoM = Math.max(5, frontSetback)
  const frontRecuoY = terrainStartY + m(fRecuoM)
  ctx.strokeStyle = '#C8A882'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath(); ctx.moveTo(terrainStartX, frontRecuoY); ctx.lineTo(terrainStartX + m(terrainWidth), frontRecuoY); ctx.stroke()
  ctx.setLineDash([])

  // Label Recuo
  ctx.fillStyle = '#C8A882'
  ctx.font = 'italic 10px DM Sans'
  ctx.fillText(`Limite de Recuo Frontal (${fRecuoM.toFixed(2)}m)`, terrainStartX + 5, frontRecuoY - 5)

  // Recuos Laterais
  const sRecuoPx = m(sideSetback)
  ctx.strokeStyle = 'rgba(200, 168, 130, 0.3)'
  ctx.beginPath(); 
  ctx.moveTo(terrainStartX + sRecuoPx, terrainStartY); 
  ctx.lineTo(terrainStartX + sRecuoPx, terrainStartY + m(terrainDepth)); 
  ctx.stroke()

  ctx.fillStyle = '#C8A882'
  ctx.font      = 'bold 11px DM Sans, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`Terreno ${terrainWidth}×${terrainDepth}m`, terrainStartX + 4, terrainStartY - 5)

  if (plan.rooms.length === 0) {
    ctx.fillStyle = '#6B5E52'
    ctx.font      = '14px DM Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Nenhum cômodo gerado.', plan.canvasWidth / 2, plan.canvasHeight / 2)
    ctx.fillText('Verifique as dimensões do terreno.', plan.canvasWidth / 2, plan.canvasHeight / 2 + 20)
    return
  }

  // ── Cômodos (Rendering Técnico) ─────────────────
  const offX = terrainStartX
  const offY = terrainStartY

  const floorRooms = plan.rooms.filter(r => (r.floor || 0) === activeFloor)
  
  if (floorRooms.length === 0 && plan.rooms.length > 0) {
    ctx.fillStyle = '#6B5E52'; ctx.font = '14px DM Sans'; ctx.textAlign = 'center';
    ctx.fillText('Nenhum cômodo neste pavimento.', plan.canvasWidth / 2, plan.canvasHeight / 2)
  }

  // Desenha Calçadas de Acesso (Driveways) caso o andar ativo seja o Térreo
  if (activeFloor === 0) {
    plan.rooms.forEach(rx => {
      if (rx.type === 'garage' && (rx.floor || 0) === 0) {
        ctx.fillStyle = 'rgba(120, 120, 120, 0.4)'; // Concreto para veículos
        ctx.fillRect(offX + rx.x, terrainStartY + sidewalkH, rx.width, rx.y - sidewalkH);
      } else if (rx.type === 'living' && (rx.floor || 0) === 0) {
        ctx.fillStyle = 'rgba(210, 200, 180, 0.6)'; // Caminho social de pedra
        ctx.fillRect(offX + rx.x + m(1), terrainStartY + sidewalkH, m(1.5), rx.y - sidewalkH);
      }
    });
  }

  // 1. FUNDOS E TEXTURAS
  for (const rx of floorRooms) {
    // CORREÇÃO: As coordenadas já estão em pixels, não precisam de offset adicional
    const room = { ...rx, x: offX + rx.x, y: offY + rx.y }
    ctx.fillStyle = SECTOR_FILL[room.sector]
    ctx.fillRect(room.x, room.y, room.width, room.height)
    drawRoomTexture(ctx, room)
  }

  // 2. PAREDES COMPARTILHADAS (MERGE DE TRAÇADO TÉCNICO)
  const wallPath = new Path2D()
  for (const rx of floorRooms) {
    wallPath.rect(rx.x + offX, rx.y + offY, rx.width, rx.height)
  }
  
  ctx.save()
  // A sombra é gerada num único pass-through para não estourar interseções
  ctx.shadowColor = 'rgba(0,0,0,0.1)'
  ctx.shadowBlur = 6
  ctx.shadowOffsetX = 3
  ctx.shadowOffsetY = 3
  ctx.strokeStyle = '#2C2420'
  ctx.lineWidth = 6 
  ctx.lineJoin = 'round'
  ctx.stroke(wallPath)
  ctx.restore()

  for (const rx of floorRooms) {
    const room = { ...rx, x: rx.x + offX, y: rx.y + offY }
    
    // Linha interna branca (efeito alvenaria NBR)
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 1.5
    ctx.strokeRect(room.x + 0.75, room.y + 0.75, room.width - 1.5, room.height - 1.5)

    // 3. Aberturas
    for (const win of room.windows) drawWindow(ctx, room, win)
    for (const door of room.doors) drawDoor(ctx, room, door)

    // 4. Mobiliário
    for (const f of room.furnitures) drawFurniture(ctx, room, f)

    // 5. Labels
    ctx.save()
    const lx = room.x + room.width / 2
    const ly = room.y + room.height / 2
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 11px DM Sans, sans-serif'
    ctx.fillStyle = '#2C2420'
    ctx.fillText(room.name, lx, ly)
    
    ctx.font = '9px DM Sans, sans-serif'
    ctx.fillStyle = '#6B5E52'
    ctx.fillText(`${room.areaM2.toFixed(1)} m²`, lx, ly + 14)
    ctx.restore()

    // Medidas
    ctx.fillStyle = 'rgba(107,94,82,0.55)'
    ctx.font = '8px DM Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    const wLabel = (room.width  / SCALE).toFixed(1) + 'm'
    const hLabel = (room.height / SCALE).toFixed(1) + 'm'
    ctx.fillText(wLabel, room.x + room.width / 2, room.y - 3)
    ctx.save()
    ctx.translate(room.x - 3, room.y + room.height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(hLabel, 0, 0)
    ctx.restore()
  }

  // Seta de entrada
  const sala = plan.rooms.find(r => r.type === 'living')
  if (sala) {
    ctx.save()
    ctx.fillStyle = '#8B6F47'
    ctx.font = 'bold 9px DM Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('▼ ENTRADA', sala.x + sala.width / 2, sala.y - 6)
    ctx.restore()
  }

  drawLegend(ctx, plan.canvasWidth, plan.canvasHeight)
  drawNorth(ctx, plan.canvasWidth - 44, 44)
  drawScale(ctx, PAD, plan.canvasHeight - 16)
}

// ── Porta com arco ───────────────────────────
function drawDoor(ctx: CanvasRenderingContext2D, room: RoomRect, door: Door) {
  const dw  = m(DOOR_W)
  ctx.save()

  let x1 = 0, y1 = 0, x2 = 0, y2 = 0
  let hx = 0, hy = 0
  let sa = 0, ea = 0

  switch (door.wall) {
    case 'top':
      x1 = room.x + room.width * door.position - dw / 2; y1 = room.y
      x2 = x1 + dw;                                      y2 = y1
      hx = door.openLeft ? x1 : x2;                      hy = y1
      // Abre para DENTRO (para baixo)
      sa = 0; ea = Math.PI / 2; break
    case 'bottom':
      x1 = room.x + room.width * door.position - dw / 2; y1 = room.y + room.height
      x2 = x1 + dw;                                      y2 = y1
      hx = door.openLeft ? x1 : x2;                      hy = y1
      // Abre para DENTRO (para cima)
      sa = Math.PI; ea = Math.PI * 1.5; break
    case 'left':
      x1 = room.x; y1 = room.y + room.height * door.position - dw / 2
      x2 = x1;     y2 = y1 + dw
      hx = x1;     hy = door.openLeft ? y1 : y2
      // Abre para DENTRO (para a direita)
      sa = -Math.PI / 2; ea = 0; break
    case 'right':
      x1 = room.x + room.width; y1 = room.y + room.height * door.position - dw / 2
      x2 = x1;                  y2 = y1 + dw
      hx = x1;                  hy = door.openLeft ? y1 : y2
      // Abre para DENTRO (para a esquerda)
      sa = Math.PI / 2; ea = Math.PI; break
  }

  // Apaga parede na abertura
  ctx.strokeStyle = '#FAF8F5'
  ctx.lineWidth = 6
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()

  // Arco de abertura (Tracejado Fino)
  ctx.beginPath()
  // Ajuste do sentido do arco para abrir sempre para DENTRO
  ctx.arc(hx, hy, dw, sa, ea, false) 
  ctx.strokeStyle = 'rgba(139, 111, 71, 0.6)'
  ctx.lineWidth = 1
  ctx.setLineDash([3, 2])
  ctx.stroke()
  ctx.setLineDash([])

  // Folha da porta (Linha Média)
  ctx.save()
  ctx.translate(hx, hy)
  // Rotaciona a folha da porta para a posição "aberta" interna
  let rotation = 0
  if (door.wall === 'top')    rotation = Math.PI / 2
  if (door.wall === 'bottom') rotation = -Math.PI / 2
  if (door.wall === 'left')   rotation = 0
  if (door.wall === 'right')  rotation = Math.PI
  
  ctx.rotate(rotation)
  ctx.strokeStyle = '#2C2420'
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(dw, 0); ctx.stroke()
  ctx.restore()

  ctx.restore()
}

// ── Janela ───────────────────────────────────
function drawWindow(ctx: CanvasRenderingContext2D, room: RoomRect, win: Window) {
  ctx.save()
  const ww = win.widthPx
  let wx = 0, wy = 0, wW = 0, wH = 0

  switch (win.wall) {
    case 'top':
      wx = room.x + room.width * win.position - ww / 2; wy = room.y - 2
      wW = ww; wH = 5; break
    case 'bottom':
      wx = room.x + room.width * win.position - ww / 2; wy = room.y + room.height - 3
      wW = ww; wH = 5; break
    case 'left':
      wx = room.x - 2; wy = room.y + room.height * win.position - ww / 2
      wW = 5; wH = ww; break
    case 'right':
      wx = room.x + room.width - 3; wy = room.y + room.height * win.position - ww / 2
      wW = 5; wH = ww; break
  }

  ctx.fillStyle = '#FAF8F5'
  ctx.fillRect(wx - 1, wy - 1, wW + 2, wH + 2)

  ctx.fillStyle = 'rgba(74,142,196,0.3)'
  ctx.fillRect(wx, wy, wW, wH)
  ctx.strokeStyle = '#4A8EC4'
  ctx.lineWidth = 2
  ctx.strokeRect(wx, wy, wW, wH)

  // Linha central
  ctx.lineWidth = 0.8
  ctx.beginPath()
  if (wW >= wH) {
    ctx.moveTo(wx + wW / 2, wy); ctx.lineTo(wx + wW / 2, wy + wH)
  } else {
    ctx.moveTo(wx, wy + wH / 2); ctx.lineTo(wx + wW, wy + wH / 2)
  }
  ctx.stroke()

  // Se for banheiro, a janela é Maxim-ar (Tracejada se acima de 1.50m - SPEC)
  if (room.type === 'bathroom') {
    ctx.setLineDash([2, 2])
    ctx.strokeStyle = '#4A8EC4'
    ctx.lineWidth = 0.5
    ctx.strokeRect(wx-2, wy-2, wW+4, wH+4)
    ctx.setLineDash([])
  }

  ctx.restore()
}

// ── Legenda ──────────────────────────────────
function drawLegend(ctx: CanvasRenderingContext2D, cW: number, cH: number) {
  const items = [
    { fill: '#EDF6EF', stroke: '#3a7a54', label: 'Social' },
    { fill: '#EDF0F8', stroke: '#3a5080', label: 'Privativo' },
    { fill: '#F7EDE0', stroke: '#8a5a2d', label: 'Serviço' },
    { fill: 'rgba(74,142,196,0.3)', stroke: '#4A8EC4', label: 'Janela' },
  ]
  const lW = 105, lH = items.length * 18 + 14
  const lx = cW - lW - 8, ly = cH - lH - 8

  ctx.fillStyle = 'rgba(250,248,245,0.95)'
  ctx.strokeStyle = '#C8A882'
  ctx.lineWidth = 1
  ctx.fillRect(lx, ly, lW, lH)
  ctx.strokeRect(lx, ly, lW, lH)

  items.forEach((it, i) => {
    const iy = ly + 8 + i * 18
    ctx.fillStyle = it.fill
    ctx.fillRect(lx + 8, iy, 12, 11)
    ctx.strokeStyle = it.stroke
    ctx.lineWidth = 1
    ctx.strokeRect(lx + 8, iy, 12, 11)
    ctx.fillStyle = '#1A1714'
    ctx.font = '9px DM Sans, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(it.label, lx + 24, iy + 5)
  })
}

// ── Mobiliário Técnico (Spec Atualização 2 e 3) ─
function drawFurniture(ctx: CanvasRenderingContext2D, room: RoomRect, f: any) {
  const fw = m(f.width)
  const fd = m(f.depth)
  const fx = room.x + m(f.x)
  const fy = room.y + m(f.y)

  ctx.save()
  // Corpo do móvel
  ctx.fillStyle = f.isExisting ? 'rgba(58, 80, 128, 0.08)' : 'rgba(107, 94, 82, 0.04)'
  ctx.fillRect(fx, fy, fw, fd)
  
  // Linha conforme SPEC (Pena Fina 1px)
  ctx.strokeStyle = f.isExisting ? '#3A5080' : '#6B5E52'
  ctx.lineWidth = 1
  ctx.strokeRect(fx, fy, fw, fd)

  // Identificação [EX] se existir
  ctx.fillStyle = f.isExisting ? '#3A5080' : '#6B5E52'
  ctx.font = 'bold 7px DM Sans'
  ctx.textAlign = 'center'
  ctx.fillText(f.isExisting ? `[EX] ${f.name}` : f.name, fx + fw/2, fy + fd/2 - 1)
  
  // Cotas do móvel (Medidas Técnicas - SPEC)
  ctx.font = '6px DM Mono, monospace'
  ctx.fillStyle = 'rgba(107, 94, 82, 0.6)'
  ctx.fillText(`${f.width.toFixed(2)}x${f.depth.toFixed(2)}`, fx + fw/2, fy + fd/2 + 7)

  ctx.restore()
}

// ── Norte Técnico ──────────────────────────────
function drawNorth(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save()
  ctx.translate(x, y)
  
  // Círculo da bússola
  ctx.strokeStyle = '#1A1714'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.stroke()
  
  // Seta do Norte
  ctx.fillStyle = '#1A1714'
  ctx.beginPath()
  ctx.moveTo(0, -15) // Ponta
  ctx.lineTo(5, 5)
  ctx.lineTo(-5, 5)
  ctx.fill()
  
  ctx.font = 'bold 12px DM Sans'
  ctx.textAlign = 'center'
  ctx.fillText('N', 0, -22)
  
  ctx.restore()
}

// ── Escala gráfica ─────────────────────────────
function drawScale(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const barPx = m(5)
  ctx.save()
  ctx.strokeStyle = '#1A1714'
  ctx.fillStyle = '#1A1714'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + barPx, y); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(x + barPx, y - 4); ctx.lineTo(x + barPx, y + 4); ctx.stroke()
  ctx.font = '9px DM Sans, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('5m', x + barPx / 2, y - 4)
  ctx.restore()
}

/**
 * Desenha hachuras e texturas variadas por cômodo
 */
function drawRoomTexture(ctx: CanvasRenderingContext2D, room: RoomRect) {
  ctx.save()
  ctx.beginPath(); ctx.rect(room.x, room.y, room.width, room.height); ctx.clip()
  
  // Áreas Molhadas: Grid de Porcelanato (60x60 ou 90x90)
  if (['kitchen', 'bathroom', 'laundry'].includes(room.type)) {
    ctx.strokeStyle = 'rgba(0,0,0,0.04)'
    ctx.lineWidth = 0.5
    const grid = m(room.type === 'bathroom' ? 0.40 : 0.80)
    for (let gx = room.x; gx < room.x + room.width; gx += grid) {
      ctx.beginPath(); ctx.moveTo(gx, room.y); ctx.lineTo(gx, room.y + room.height); ctx.stroke()
    }
    for (let gy = room.y; gy < room.y + room.height; gy += grid) {
      ctx.beginPath(); ctx.moveTo(room.x, gy); ctx.lineTo(room.x + room.width, gy); ctx.stroke()
    }
  } 
  // Área Social/Privada: Taco/Parquet (Madeira)
  else if (room.sector === 'social' || room.sector === 'private' && room.type !== 'corridor') {
    ctx.strokeStyle = 'rgba(139, 111, 71, 0.08)'
    ctx.lineWidth = 0.5
    const step = m(0.12)
    for (let gx = room.x; gx < room.x + room.width; gx += step) {
      ctx.beginPath(); ctx.moveTo(gx, room.y); ctx.lineTo(gx, room.y + room.height); ctx.stroke()
    }
  }

  ctx.restore()
}

/**
 * Adiciona elementos de paisagismo (grama, pedrisco, árvores) nos recuos
 */
function drawLandscape(
  ctx: CanvasRenderingContext2D, 
  plan: FloorPlan,
  terrainWidth: number,
  terrainDepth: number,
  _sideSetback: number,
  _frontSetback: number
) {
  const streetH = m(7)
  const terrainStartY = streetH
  const terrainStartX = (plan.canvasWidth - m(terrainWidth)) / 2
  
  // 1. Grama (Base dos recuos)
  ctx.fillStyle = '#F1F4ED' // Verde pastel muito claro
  ctx.fillRect(terrainStartX, terrainStartY, m(terrainWidth), m(terrainDepth))

  // 2. Hachura de Grama (Pontilhados sutil)
  ctx.fillStyle = 'rgba(94, 122, 63, 0.1)'
  for (let i = 0; i < 40; i++) {
    const rx = terrainStartX + Math.random() * m(terrainWidth)
    const ry = terrainStartY + Math.random() * m(terrainDepth)
    // Só desenha se NÃO estiver em cima de um cômodo
    if (!plan.rooms.some(r => rx > r.x && rx < r.x + r.width && ry > r.y && ry < r.y + r.height)) {
      ctx.beginPath(); ctx.arc(rx, ry, 1, 0, Math.PI * 2); ctx.fill()
    }
  }

  // 3. Árvores Decorativas (Círculos orgânicos) nos cantos do recuo frontal
  const drawTree = (tx: number, ty: number) => {
    ctx.save()
    ctx.fillStyle = 'rgba(94, 122, 63, 0.15)'
    ctx.beginPath(); ctx.arc(tx, ty, 15, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = 'rgba(94, 122, 63, 0.3)'
    ctx.setLineDash([2, 2])
    ctx.beginPath(); ctx.arc(tx, ty, 15, 0, Math.PI * 2); ctx.stroke()
    ctx.restore()
  }

  drawTree(terrainStartX + m(1.5), terrainStartY + streetH + m(2))
  drawTree(terrainStartX + m(terrainWidth) - m(1.5), terrainStartY + streetH + m(2))
}
