# Resolução de Problemas: Tela em Branco ao Iniciar Simulação

Este documento registra a solução para o erro de "Tela em Branco" que ocorria após atualizações de lógica no motor de simulação.

## 🔍 Sintoma
Ao clicar em "Iniciar Simulação", o usuário via apenas o fundo do aplicativo (bg-creme), mas o conteúdo do simulador (wizard) não era renderizado.

## 🛠 Causa Raíz
O sistema utiliza `localStorage` para persistir o progresso do usuário. Quando novos campos eram adicionados à estrutura de dados do simulador (ex: `inventory`, `RoomRect.furnitures`), os dados antigos salvos no navegador não possuíam esses campos. 

Ao carregar o estado, o JavaScript encontrava valores `undefined` em locais onde o React esperava arrays ou objetos, causando um erro de execução que impedia a renderização.

## 🚀 Solução Aplicada (Deep Merge)
Em vez de substituir o estado global pelos dados do `localStorage` cegamente, implementamos uma **mesclagem profunda** (Deep Merge) no arquivo `src/lib/store.ts`.

### Lógica da Correção:
```typescript
function loadState(): SimulatorState {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const parsed = JSON.parse(saved)
    return {
      ...initialState, // 1. Começa com o modelo atualizado
      ...parsed,      // 2. Sobrepõe com o progresso do usuário
      // 3. Garante que sub-objetos também sejam mesclados
      familyProfile: { ...initialState.familyProfile, ...(parsed.familyProfile || {}) },
      budget:        { ...initialState.budget,        ...(parsed.budget || {})        },
      terrain:       { ...initialState.terrain,       ...(parsed.terrain || {})       },
      inventory:     parsed.inventory || [],
      step:          parsed.step || 1
    }
  }
  return initialState
}
```

## 📝 Boas Práticas Futuras
Sempre que adicionar uma nova propriedade ao `SimulatorState` em `src/types/index.ts`:
1. Adicione o valor padrão em `initialState` no arquivo `src/lib/store.ts`.
2. Garanta que a função `loadState` faça o fallback (`|| []` ou `|| {}`) para esse novo campo.

---
*Documento gerado automaticamente pelo assistente de IA em 2026-04-13.*
