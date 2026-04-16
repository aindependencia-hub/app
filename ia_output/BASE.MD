BIM (Building Information Modeling)


"O sistema utiliza uma estrutura de Instâncias de Dados onde cada cômodo é um objeto autônomo, encapsulando identidades, regras da NBR e propriedades técnicas em uma única chave mestre."


Para pedir que a IA faça essa "nutrição" (copiar do dicionário para o master), você deve usar o termo "Mapear e Atribuir".

O Conceito de "Injeção Normalizada"


Aqui está a hierarquia que você deve seguir para o seu sistema ser profissional, do Macro (maior) para o Micro (menor), e como o Schema entra nisso:
1. A Hierarquia das Constantes (O DNA)
Pense nisso como as pastas do seu projeto, onde a informação flui de cima para baixo:
PROJETO (O Universo): É a raiz. Contém o ID, o Cliente e o Terreno.
TERRENO (O Limite): Define onde a casa pode existir (as bordas do mundo).
EDIFICAÇÃO (O Estilo): Define se é Térreo, Sobrado ou Comercial (as regras de jogo).
PAVIMENTOS (Os Níveis): Térreo, 1º andar, etc.
CÔMODOS (Os Espaços): Onde entram as áreas e nomes (Sala, Quarto).
COMPONENTES (O Recheio): Portas, Janelas, Tomadas.
PROPRIEDADES (O Detalhe): Largura, Altura, Material, Cor.


Criar um Grafo de Conectividade

https://mermaid.ai/d/891379eb-3fe1-4359-a7ee-fe1f42378021

Transformar em Lista de Adjacencia

Lista de todas as constantes “filhas” (keys de cômodos)     
  presentes no objeto pai ROOM_MASTER_DATA:
  - LIVING_ROOM
  - MASTER_BEDROOM 
  - SIMPLE_BEDROOM                                          
  - SHARED_BEDROOM
  - KITCHEN
  - DINING_ROOM
  - OFFICE
  - BATHROOM_SIMPLE
  - BATHROOM_MASTER
  - BATHROOM_SHARED
  - UTILITY_ROOM
  - STORAGE
  - ENTRY_HALL
  - CORRIDOR
  - PANTRY
  - POWDER_ROOM
  - VARANDA
  - BALCONY
  - TERRACE
  - GARAGE
  - EXERCISE_ROOM
  - JARDIM
  - POOL
  - STAIRS
  - OUTDOOR_KITCHEN

  Essas são as chaves principais usadas no ROOM_MASTER_DATA.
  Cada uma delas contém estruturas aninhadas (dimensions,
  components, validation, etc.), mas os itens acima são os
  identificadores de nível superior do objeto.

const listaAdjacencia = {
  RUA: ['ENTRY_HALL'],
  ENTRY_HALL: ['RUA', 'LIVING_ROOM', 'GARAGE'],
  LIVING_ROOM: ['ENTRY_HALL', 'DINING_ROOM', 'CORRIDOR', 'VARANDA'],
  DINING_ROOM: ['LIVING_ROOM', 'KITCHEN'],
  KITCHEN: ['DINING_ROOM', 'PANTRY', 'UTILITY_ROOM'],
  CORRIDOR: [
    'LIVING_ROOM', 
    'MASTER_BEDROOM', 
    'SIMPLE_BEDROOM', 
    'SHARED_BEDROOM', 
    'OFFICE', 
    'STAIRS'
  ],
  MASTER_BEDROOM: ['CORRIDOR', 'BATHROOM_MASTER'],
  SIMPLE_BEDROOM: ['CORRIDOR', 'BATHROOM_SIMPLE'],
  SHARED_BEDROOM: ['CORRIDOR', 'BATHROOM_SHARED'],
  UTILITY_ROOM: ['KITCHEN', 'STORAGE', 'OUTDOOR_KITCHEN'],
  OUTDOOR_KITCHEN: ['UTILITY_ROOM', 'TERRACE'],
  TERRACE: ['OUTDOOR_KITCHEN', 'POOL', 'EXERCISE_ROOM'],
  GARAGE: ['ENTRY_HALL', 'STAIRS'],
  // ... e assim por diante para os outros nós
};