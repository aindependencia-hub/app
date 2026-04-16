# Independência Simulator

## 📋 Visão Geral
Simulador arquitetônico para planejamento de casa com foco no conceito **"Furniture-First"** — dimensionar a estrutura apenas para caber os móveis + circulação mínima, sem espaços vazios inúteis.

## 🎯 Conceito Principal
**Prioridade aos móveis:** A casa é gerada como um polígono sólido contínuo (técnica "Massa Única"/Anchoring), considerando apenas:
- Largura dos móveis + 1.20m de fluxo (60cm de cada lado)
- Proteção de passagem (1.20m na frente de portas)
- "Shrink-wrap" que ajusta paredes ao somatório dos móveis

## 🏗️ Funcionalidades
- **Dimensionamento inteligente:** Cálculo de paredes com base no mobiliário real
- **Fluxo garantido:** Cadeias sociais/serviço e privadas otimizadas
- **Referência técnica:** Baseado em NBR 6492 e normas de obras
- **Marcos de projeto:** Itens existentes marcados como [EX] (não substituídos)
- **Integração IA:** Algoritmos de automação arquitetônica (Antigravity)

## 📍 Estrutura do Projeto
```
src/
├── lib/
│   ├── store.ts      # Lógica de estado e carregamento (deep merge)
│   └── cache/        # Sistema de persistência no localStorage
├── types/
│   └── index.ts      # Tipos do simulador (SimulatorState)
└── index.html        # Interface principal
```

## 📊 Parâmetros de Implantação
- **Rua:** 7.00m (asfalto)
- **Calçada:** 2.50m (obrigatória, externa ao limite edificável)
- **Recuo frontal:** Mínimo 5.00m
- **Orientação solar:** Bússola de Norte magnético (janelas Leste)

## 🏠 Dimensões Mínimas por Ambiente
| Ambiente | Largura | Área | Observação |
|----------|---------|------|------------|
| Sala de Estar | 3.00m | 10m² | Distância TV 1.50m |
| Suíte Principal | 2.50m | 9m² | 0.60m nas 3 faces da cama |
| Banheiro | 1.10m | 2.80m² | 60cm livre frente |
| Garagem | 3.00m | 15m² | Para Corolla (4.65m) |

## 🔄 Fluxo de Circulação
1. **Entrada:** Rua → Calçada → Garagem/Social
2. **Cadeia Social-Serviço:** Garagem ↔ Sala ↔ Cozinha ↔ Área serviço
3. **Cadeia Social-Privada:** Sala → Corredor → Quartos/Banheiros
4. **Conectividade:** Portas → 80cm de passagem, sem interruptores no verso

## 📐 Representação Técnica
- **Linha grossa (4px):** Paredes em corte (plano 1.50m)
- **Linha média (2px):** Esquadrias (portas/janelas) e fixos
- **Linha fina (1px):** Móveis móveis, cotas, texturas
- **Traçada:** Projeções acima do corte, janelas Maxim-ar

## 🎨 Atualização 5: Consolidação Técnica (IA Antigravity)
- **Massa única:** Eliminação de frestas entre setores
- **Proteção de passagem:** Bloqueio em raio 1.20m das portas
- **Otimização "Shrink-wrap":** Paredes ajustam automaticamente
- **Rampa técnica:** Garagem integrada à rua e calçada

## 📝 Boas Práticas
- Ao adicionar novo campo no `SimulatorState`, atualizar:
  1. `initialState` em `src/lib/store.ts`
  2. Função `loadState()` com fallback (`|| {}` ou `|| []`)
- Itens marcados `[EX]` mantém dimensões originais (não substituídos)
- **Constantes centralizadas:** Consultar `lib/constants.js` para todos os tipos de cômodos, dimensões mínimas e categorias

## 📁 Estrutura do Projeto
```
src/
├── lib/
│   ├── store.ts          # Lógica de estado e carregamento
│   ├── cache/            # Sistema de persistência (localStorage)
│   └── constants.js      # 📋 Constantes de cômodos e áreas (este arquivo)
├── types/
│   └── index.ts          # Tipos do simulador
└── index.html            # Interface principal
```

## 📋 Constantes Disponíveis (`lib/constants.js`)
- **ROOM_TYPES** - Todos os tipos de cômodos suportados
- **ROOM_MIN_DIMENSIONS** - Dimensões mínimas por ambiente
- **ROOM_CATEGORIES** - Categorias de cômodos
- **ROOM_CRITICALITY** - Prioridades de importância
- **WALL_TYPES** - Tipos de paredes e estruturas
- **DEFAULT_CLEARANCE**, **DOOR_CLEARANCE**, **MIN_CIRCULATION** - Espaçamentos padrão
- **REFERENCE_FURNITURE** - Móveis de referência para cálculo

## 🛠️ Tecnologias
- **Framework:** React 18 + TypeScript
- **Build:** Vite 5
- **Estilização:** TailwindCSS + Animate
- **Gerenciamento:** Estado próprio com deep merge

## 📝 Documentação Completa
Ver `SPEC.html` para especificação técnica detalhada.

## ⚠️ Notas de Migração
Se atualizando versões:
1. Adicione novos campos no `initialState`
2. Implemente fallback na função `loadState()`
3. Teste a compatibilidade com dados antigos do `localStorage`

*Documento gerado pelo Independência Simulator Engine*
*Referência: NBR 6492 / NBR 15575 / Código de Obras Residencial*