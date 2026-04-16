/**
 * ARQUIVO: teste.ts
 * Conteúdo: cópia integral da constante consolidada (ROOM_MASTER_DATA + MEDIDAS_OBRIGATORIAS).
 * Utilize este arquivo como referência para o merge ou como backup dos dados atualizados.
 */

export const ROOM_MASTER_DATA = {
  LIVING_ROOM: {
    key: 'living_room',
    name: { pt: 'Sala de Estar', en: 'Living Room' },
    short_description: { pt: 'Área social e de convívio principal.', en: 'Main social and living area.' },
    technical_details: { pt: 'Ambiente de permanência prolongada. Exige ventilação natural e pontos de iluminação cênica.', en: 'Long-stay environment. Requires natural ventilation and accent lighting points.' },
    category: "social",
    criticality: '',
    dimensions: {
      width: { norm: 3.00, current: 3.00, is_custom: false },
      depth: { norm: 3.00, current: 3.00, is_custom: false },
      minArea: 10.00,
      ceilingHeight: 2.70,
      windowWidth: 1.50
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  MASTER_BEDROOM: {
    key: 'master_bedroom',
    name: { pt: 'Quarto Principal', en: 'Master Bedroom' },
    short_description: { pt: 'Suíte principal destinada ao descanso e privacidade.', en: 'Primary suite designed for rest and privacy.' },
    technical_details: { pt: 'Ambiente de permanência prolongada. Requer isolamento acústico, ventilação natural e circuitos de iluminação independentes.', en: 'Long-stay environment. Requires acoustic insulation, natural ventilation, and independent lighting circuits.' },
    category: "private",
    criticality: '',
    dimensions: {
      width: { norm: 2.50, current: 2.50, is_custom: false },
      depth: { norm: 2.50, current: 2.50, is_custom: false },
      minArea: 9.00,
      ceilingHeight: 2.70,
      windowWidth: 0.50
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  SIMPLE_BEDROOM: {
    key: 'simple_bedroom',
    name: { pt: 'Quarto Simples', en: 'Simple Bedroom' },
    short_description: { pt: 'SIMPLE BEDROOM em português.', en: 'SIMPLE BEDROOM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "private",
    criticality: '',
    dimensions: {
      width: { norm: 2.40, current: 2.40, is_custom: false },
      depth: { norm: 2.40, current: 2.40, is_custom: false },
      minArea: 8.00,
      ceilingHeight: 2.60,
      windowWidth: 1.10
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  SHARED_BEDROOM: {
    key: 'shared_bedroom',
    name: { pt: 'Quarto Compartilhado', en: 'Shared Bedroom' },
    short_description: { pt: 'SHARED BEDROOM em português.', en: 'SHARED BEDROOM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "private",
    criticality: '',
    dimensions: {
      width: { norm: 2.00, current: 2.00, is_custom: false },
      depth: { norm: 2.00, current: 2.00, is_custom: false },
      minArea: 7.00,
      ceilingHeight: 2.60,
      windowWidth: 1.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  KITCHEN: {
    key: 'kitchen',
    name: { pt: 'Cozinha', en: 'Kitchen' },
    short_description: { pt: 'KITCHEN em português.', en: 'KITCHEN in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "service",
    criticality: '',
    dimensions: {
      width: { norm: 1.50, current: 1.50, is_custom: false },
      depth: { norm: 1.80, current: 1.80, is_custom: false },
      minArea: 5.00,
      ceilingHeight: 2.60,
      windowWidth: 0.80
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  DINING_ROOM: {
    key: 'dining_room',
    name: { pt: 'Área Gourmet', en: 'Dining Room' },
    short_description: { pt: 'DINING ROOM em português.', en: 'DINING ROOM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "social",
    criticality: '',
    dimensions: {
      width: { norm: 2.00, current: 2.00, is_custom: false },
      depth: { norm: 2.00, current: 2.00, is_custom: false },
      minArea: 6.00,
      ceilingHeight: 2.60,
      windowWidth: 1.10
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  OFFICE: {
    key: 'office',
    name: { pt: 'Escritório', en: 'Office' },
    short_description: { pt: 'OFFICE em português.', en: 'OFFICE in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "work",
    criticality: '',
    dimensions: {
      width: { norm: 2.40, current: 2.40, is_custom: false },
      depth: { norm: 2.40, current: 2.40, is_custom: false },
      minArea: 6.00,
      ceilingHeight: 2.60,
      windowWidth: 1.10
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      instalações: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  BATHROOM_SIMPLE: {
    key: 'bathroom_simple',
    name: { pt: 'Banheiro Simples', en: 'Simple Bathroom' },
    short_description: { pt: 'BATHROOM SIMPLE em português.', en: 'BATHROOM SIMPLE in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "private",
    criticality: '',
    dimensions: {
      width: { norm: 1.10, current: 1.10, is_custom: false },
      depth: { norm: 1.50, current: 1.50, is_custom: false },
      minArea: 2.80,
      ceilingHeight: 2.40,
      windowWidth: 0.50
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  BATHROOM_MASTER: {
    key: 'bathroom_master',
    name: { pt: 'Banheiro Suite', en: 'Master Bathroom' },
    short_description: { pt: 'BATHROOM MASTER em português.', en: 'BATHROOM MASTER in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "private",
    criticality: '',
    dimensions: {
      width: { norm: 1.50, current: 1.50, is_custom: false },
      depth: { norm: 2.00, current: 2.00, is_custom: false },
      minArea: 4.00,
      ceilingHeight: 2.50,
      windowWidth: 0.50
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  BATHROOM_SHARED: {
    key: 'bathroom_shared',
    name: { pt: 'Banheiro Social', en: 'Shared Bathroom' },
    short_description: { pt: 'BATHROOM SHARED em português.', en: 'BATHROOM SHARED in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "private",
    criticality: '',
    dimensions: {
      width: { norm: 1.10, current: 1.10, is_custom: false },
      depth: { norm: 1.80, current: 1.80, is_custom: false },
      minArea: 3.50,
      ceilingHeight: 2.40,
      windowWidth: 0.50
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  UTILITY_ROOM: {
    key: 'utility_room',
    name: { pt: 'Área de Serviço', en: 'Utility Room' },
    short_description: { pt: 'UTILITY ROOM em português.', en: 'UTILITY ROOM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "service",
    criticality: '',
    dimensions: {
      width: { norm: 1.20, current: 1.20, is_custom: false },
      depth: { norm: 1.20, current: 1.20, is_custom: false },
      minArea: 2.00,
      ceilingHeight: 2.40,
      windowWidth: 0.50
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  STORAGE: {
    key: 'storage',
    name: { pt: 'Depósito', en: 'Storage' },
    short_description: { pt: 'STORAGE em português.', en: 'STORAGE in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "service",
    criticality: '',
    dimensions: {
      width: { norm: 1.20, current: 1.20, is_custom: false },
      depth: { norm: 1.20, current: 1.20, is_custom: false },
      minArea: 2.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  ENTRY_HALL: {
    key: 'entry_hall',
    name: { pt: 'Hall de Entrada', en: 'Entry Hall' },
    short_description: { pt: 'ENTRY HALL em português.', en: 'ENTRY HALL in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "social",
    criticality: '',
    dimensions: {
      width: { norm: 1.20, current: 1.20, is_custom: false },
      depth: { norm: 1.20, current: 1.20, is_custom: false },
      minArea: 1.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  CORRIDOR: {
    key: 'corridor',
    name: { pt: 'Corredor', en: 'Corridor' },
    short_description: { pt: 'CORRIDOR em português.', en: 'CORRIDOR in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "circulation",
    criticality: '',
    dimensions: {
      width: { norm: 0.90, current: 0.90, is_custom: false },
      depth: { norm: 1.00, current: 1.00, is_custom: false },
      minArea: 1.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  PANTRY: {
    key: 'pantry',
    name: { pt: 'Despensa', en: 'Pantry' },
    short_description: { pt: 'PANTRY em português.', en: 'PANTRY in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "service",
    criticality: '',
    dimensions: {
      width: { norm: 1.20, current: 1.20, is_custom: false },
      depth: { norm: 1.20, current: 1.20, is_custom: false },
      minArea: 2.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  POWDER_ROOM: {
    key: 'powder_room',
    name: { pt: 'Lavabo', en: 'Powder Room' },
    short_description: { pt: 'POWDER ROOM em português.', en: 'POWDER ROOM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "social",
    criticality: '',
    dimensions: {
      width: { norm: 1.10, current: 1.10, is_custom: false },
      depth: { norm: 1.50, current: 1.50, is_custom: false },
      minArea: 2.80,
      ceilingHeight: 2.40,
      windowWidth: 0.50
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  VARANDA: {
    key: 'varanda',
    name: { pt: 'Varanda', en: 'Varanda' },
    short_description: { pt: 'VARANDA em português.', en: 'VARANDA in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "outdoor_leisure",
    criticality: '',
    dimensions: {
      width: { norm: 2.00, current: 2.00, is_custom: false },
      depth: { norm: 2.00, current: 2.00, is_custom: false },
      minArea: 6.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  BALCONY: {
    key: 'balcony',
    name: { pt: 'Sacada', en: 'Balcony' },
    short_description: { pt: 'BALCONY em português.', en: 'BALCONY in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "outdoor_leisure",
    criticality: '',
    dimensions: {
      width: { norm: 2.00, current: 2.00, is_custom: false },
      depth: { norm: 2.00, current: 2.00, is_custom: false },
      minArea: 6.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  TERRACE: {
    key: 'terrace',
    name: { pt: 'Terraço', en: 'Terrace' },
    short_description: { pt: 'TERRACE em português.', en: 'TERRACE in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "outdoor_leisure",
    criticality: '',
    dimensions: {
      width: { norm: 3.00, current: 3.00, is_custom: false },
      depth: { norm: 3.00, current: 3.00, is_custom: false },
      minArea: 9.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  GARAGE: {
    key: 'garage',
    name: { pt: 'Garagem', en: 'Garage' },
    short_description: { pt: 'GARAGE em português.', en: 'GARAGE in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "circulation",
    criticality: '',
    dimensions: {
      width: { norm: 3.00, current: 3.00, is_custom: false },
      depth: { norm: 4.80, current: 4.80, is_custom: false },
      minArea: 15.00,
      ceilingHeight: 2.50,
      windowWidth: 0.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  EXERCISE_ROOM: {
    key: 'exercise_room',
    name: { pt: 'Área de Ginástica', en: 'Exercise Room' },
    short_description: { pt: 'EXERCISE ROOM em português.', en: 'EXERCISE ROOM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "outdoor_leisure",
    criticality: '',
    dimensions: {
      width: { norm: 2.40, current: 2.40, is_custom: false },
      depth: { norm: 2.40, current: 2.40, is_custom: false },
      minArea: 6.00,
      ceilingHeight: 2.60,
      windowWidth: 1.10
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  JARDIM: {
    key: 'jardim',
    name: { pt: 'Jardim', en: 'Garden' },
    short_description: { pt: 'JARDIM em português.', en: 'JARDIM in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "outdoor_leisure",
    criticality: '',
    dimensions: {
      width: { norm: 3.00, current: 3.00, is_custom: false },
      depth: { norm: 3.00, current: 3.00, is_custom: false },
      minArea: 9.00,
      ceilingHeight: 2.40,
      windowWidth: 0.00
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  POOL: {
    key: 'pool',
    name: { pt: 'Piscina', en: 'Pool' },
    short_description: { pt: 'POOL em português.', en: 'POOL in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "outdoor_leisure",
    criticality: '',
    dimensions: {
      width: { norm: 3.00, current: 3.00, is_custom: false },
      depth: { norm: 6.00, current: 6.00, is_custom: false },
      minArea: 18.00,
      ceilingHeight: 2.50,
      windowWidth: 0.00
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: {}
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  STAIRS: {
    key: 'stairs',
    name: { pt: 'Escadaria', en: 'Stairs' },
    short_description: { pt: 'STAIRS em português.', en: 'STAIRS in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "circulation",
    criticality: '',
    dimensions: {
      width: { norm: 2.00, current: 2.00, is_custom: false },
      depth: { norm: 4.00, current: 4.00, is_custom: false },
      minArea: 4.00,
      ceilingHeight: 2.50,
      windowWidth: 0.00
    },
    components: {
      openings: { door: { width: 0.8, height: 1.8 } },
      installations: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      },
      furniture: [
        { name: 'Sofá L', name_en: 'Living Room', name_pt: 'Sofá L', w: 2.50, d: 2.00 },
        { name: 'Rack/Painel TV', name_en: 'TV Rack/Panel', name_pt: 'Rack/Painel TV', w: 2.00, d: 0.45 },
        { name: 'Mesa de Centro', name_en: 'Coffee Table', name_pt: 'Mesa de Centro', w: 0.80, d: 0.50 }
      ]
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  },
  OUTDOOR_KITCHEN: {
    key: 'outdoor_kitchen',
    name: { pt: 'Cozinha Exterior', en: 'Outdoor Kitchen' },
    short_description: { pt: 'OUTDOOR KITCHEN em português.', en: 'OUTDOOR KITCHEN in English.' },
    technical_details: { pt: 'Ambiente genérico. Requer configurações padrão.', en: 'Generic environment. Requires default settings.' },
    category: "service",
    criticality: '',
    dimensions: {
      width: { norm: 1.50, current: 1.50, is_custom: false },
      depth: { norm: 1.80, current: 1.80, is_custom: false },
      minArea: 5.00,
      ceilingHeight: 2.60,
      windowWidth: 0.80
    },
    components: {
      openings: {
        door: { width: 0.8, height: 1.8 },
        window: { width: 1.50, height: 1.00, sill: 1.00 }
      },
      instalaciones: {
        outlets: { low: 1, medium: 0, high: 0 },
        switches: { standard: 1 },
        lighting_points: 1
      },
      finishes: {
        floor_material: '',
        wall_finish: '',
        ceiling_type: ''
      }
    },
    validation: { min_clearance: 0, natural_light_ratio: 0 }
  }
};