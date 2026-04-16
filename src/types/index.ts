// ============================================
// Independência — Tipos TypeScript Centrais
// ============================================

export interface FamilyProfile {
  adults: number;
  children: number;
  hasHomeOffice: boolean;
  cars: number;
  pets: boolean;
  accessibility: boolean;
}

export interface Budget {
  maxValue: number;         // R$ total
  pricePerM2: number;       // default: 3500
  maxArea: number;          // calculado: maxValue / pricePerM2
}

export interface Terrain {
  width: number;            // metros
  depth: number;            // metros
  unevenness: number;       // desnível em metros
  frontSetback: number;     // recuo frontal (m)
  sideSetback: number;      // recuo lateral (m)
  rearSetback: number;      // recuo de fundo (m)
  totalArea: number;        // calculado
  buildableArea: number;    // área aproveitável
}

export type RoomType =
  | 'suite'
  | 'bedroom'
  | 'living'
  | 'kitchen'
  | 'bathroom'
  | 'garage'
  | 'balcony'
  | 'laundry'
  | 'homeOffice'
  | 'corridor'
  | 'transition'
  | 'stair'; // Nó vertical para sobrados

export type SectorType = 'social' | 'private' | 'service' | 'external';
export type EnvironmentType = 'internal' | 'external';

export type ArchConcept = 
  | 'compact' 
  | 'l-shape' 
  | 'patio' 
  | 'linear' 
  | 'stepped' 
  | 'suspended' 
  | 'modules' 
  | 'hybrid' 
  | 'vertical' 
  | 'monolithic';

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  quantity: number;
  areaPerUnit: number;      // m² por unidade
  sector: SectorType;
  environment: EnvironmentType; // 'internal' ou 'external'
  hasWindow: boolean;
  hasDoor: boolean;
  finish: string;           // NBR 6492: Acabamento de piso
  isWetArea: boolean;       // Define hachura de grid
}

export interface RoomRect {
  id: string;
  type: RoomType;
  name: string;
  sector: SectorType;
  floor: number;           // 0 = Térreo, 1 = Superior
  x: number;               // pixels no canvas
  y: number;
  width: number;
  height: number;
  areaM2: number;
  finish: string;
  isWetArea: boolean;
  doors: Door[];
  windows: Window[];
  furnitures: Furniture[];
}

export interface Furniture {
  id: string;
  name: string;
  width: number;  // metros
  depth: number;  // metros
  x: number;      // pixels relativo ao cômodo
  y: number;
  isExisting: boolean; // Se é [EX] do inventário
  type?: 'standard' | 'island' | 'lshelf' | 'closet' | 'vehicle';
}

export interface Door {
  wall: 'top' | 'right' | 'bottom' | 'left';
  position: number;        // 0-1 ao longo da parede
  openLeft: boolean;       // sentido de abertura
}

export interface Window {
  wall: 'top' | 'right' | 'bottom' | 'left';
  position: number;        // 0-1 ao longo da parede
  widthPx: number;
}

export interface FloorPlan {
  rooms: RoomRect[];
  scale: number;           // pixels por metro
  canvasWidth: number;
  canvasHeight: number;
  valid: boolean;
  warnings: string[];
  debugLogs: string[];     // Log paso-a-passo gerado pelo algoritmo
  score: number;           // Avaliação Heurística de Arquitetura (0 a 100)
}

export interface TechnicalAlert {
  type: 'error' | 'warning' | 'info';
  message: string;
  rule: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectSummary: string;
  createdAt: string;
  status: 'novo' | 'em_atendimento' | 'finalizado';
  architectId?: string;
}

export interface Architect {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  calendlyUrl: string;
  photo?: string;
  rating: number;
}

export interface SimulatorState {
  step: number;
  familyProfile: FamilyProfile;
  budget: Budget;
  terrain: Terrain;
  rooms: Room[];
  inventory: Furniture[]; // [EX] Inventário de mudança
  floors: number; // 1 = Térrea, 2 = Sobrado
  concept: ArchConcept;
  floorPlan: FloorPlan | null;
  alerts: TechnicalAlert[];
  leadCaptured: boolean;
  leadData: Partial<Lead>;
}

export const DEFAULT_ROOMS: Room[] = [
  { id: 'suite-1', type: 'suite', name: 'Suíte Master', quantity: 1, areaPerUnit: 18, sector: 'private', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Laminado Madeira', isWetArea: false },
  { id: 'bedroom-1', type: 'bedroom', name: 'Quarto Social', quantity: 2, areaPerUnit: 12, sector: 'private', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Laminado Madeira', isWetArea: false },
  { id: 'living-1', type: 'living', name: 'Estar/Jantar', quantity: 1, areaPerUnit: 30, sector: 'social', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Porcelanato Polido', isWetArea: false },
  { id: 'kitchen-1', type: 'kitchen', name: 'Cozinha Gourmet', quantity: 1, areaPerUnit: 12, sector: 'social', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Porcelanato Acetinado', isWetArea: true },
  { id: 'bathroom-1', type: 'bathroom', name: 'Banheiro Social', quantity: 1, areaPerUnit: 4, sector: 'social', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Porcelanato', isWetArea: true },
  { id: 'bathroom-2', type: 'bathroom', name: 'Banheiro Suíte', quantity: 1, areaPerUnit: 5, sector: 'private', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Porcelanato', isWetArea: true },
  { id: 'garage-1', type: 'garage', name: 'Garagem', quantity: 1, areaPerUnit: 25, sector: 'service', environment: 'internal', hasWindow: false, hasDoor: true, finish: 'Piso Intertravado', isWetArea: false },
  { id: 'laundry-1', type: 'laundry', name: 'Área de Serviço', quantity: 1, areaPerUnit: 6, sector: 'service', environment: 'internal', hasWindow: true, hasDoor: true, finish: 'Cerâmico', isWetArea: true },
  { id: 'balcony-1', type: 'balcony', name: 'Varanda Gourmet', quantity: 1, areaPerUnit: 12, sector: 'social', environment: 'external', hasWindow: false, hasDoor: true, finish: 'Porcelanato Amadeirado', isWetArea: true },
];

export const ROOM_COLORS: Record<SectorType, string> = {
  social: '#E8D5B7',
  private: '#B7CCD5',
  service: '#B7D5C0',
  external: '#D5B7D5', // Cor para áreas externas
};

export const SECTOR_LABELS: Record<SectorType, string> = {
  social: 'Social',
  private: 'Privativo',
  service: 'Serviço',
  external: 'Externo',
};
