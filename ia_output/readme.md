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


Exatamente! Para que a IA (ou "mainha", como você chamou carinhosamente) entregue um código que não precise de mil correções depois, você deve agir como um **arquiteto de software**. O segredo é dar a ela o "mapa da linha de montagem" antes de ela começar a bater o martelo.
Aqui está um roteiro de como você pode pedir isso de forma profissional e organizada:
### O Roteiro do Pedido (O Prompt Perfeito)
Você pode estruturar sua conversa seguindo estes 4 passos:
#### 1. O Contexto (O que é a máquina?)
Diga o que a função faz no mundo real.
> *"IA, quero que você crie uma função que será o motor de cálculo do meu projeto de arquitetura. Ela será responsável por transformar medidas brutas em um objeto estruturado."*
> 
#### 2. O Contrato (Entrada e Saída)
Defina as peças que entram e o produto que sai.
> *"**O Contrato é o seguinte:**
>  * **Entrada:** Um objeto com largura, comprimento e uma constante de espessura_parede.
>  * **Saída:** Um objeto JSON contendo a area_total, o perimetro e as coordenadas_dos_vertices."*
> 
#### 3. A Estrutura Interna (As Estações da Linha de Montagem)
Diga exatamente os passos que você quer que ela siga lá dentro.
> *"Quero que a função siga rigorosamente estas etapas internas:*
>  1. **Validação:** Verifique se as medidas são maiores que zero.
>  2. **Cálculo:** Calcule a área e os pontos X e Y de cada canto da casa.
>  3. **Montagem:** Agrupe tudo em um objeto organizado.
>  4. **Retorno:** Retorne esse objeto final para que eu possa usar em outra função de renderização 2D."*
> 
#### 4. O Estilo (As Regras de Ouro)
Defina como o código deve parecer.
> *"Use nomes de variáveis claros em português e adicione comentários explicando cada cálculo."*
> 
### Exemplo de como enviar o comando:
Se você copiar e colar algo parecido com o texto abaixo, o resultado será muito superior:
> "IA, vamos criar uma função mestre.
> **Contrato de Entrada:** medidas (objeto com L e C).
> **Contrato de Saída:** blueprint (objeto processado).
> **Lógica Interna:**
>  1. Valide se os dados existem.
>  2. Calcule a área total e as coordenadas cartesianas dos 4 cantos.
>  3. Monte o objeto blueprint com os resultados.
>  4. Retorne o objeto.
> Gere o código em [Linguagem, ex: JavaScript/Python] focado em performance."
> 
### Por que isso funciona?
Quando você define o **Contrato** primeiro:
 * Você evita que a IA invente nomes de variáveis malucos.
 * Você garante que a saída da Função A se encaixe perfeitamente na entrada da Função B (como peças de LEGO).
 * Você mantém o controle do fluxo de dados do seu App, garantindo que a "linha de montagem" nunca trave por falta de informação.
Faz sentido essa forma de organizar o "pedido" para ela? Se você tiver uma função específica em mente agora, pode me passar os dados que eu te ajudo a montar esse contrato!


Mapeamento de Dependências 

Perfeito. Se você já tem as "peças" (constantes) prontas, você não quer que a IA fabrique peças novas; você quer que ela use o seu **estoque atual**.
Para evitar que ela invente nomes aleatórios, você deve aplicar o que chamamos de **Mapeamento de Dependências**.
Aqui está como você organiza esse comando para ela:
### 1. Liste o seu "Estoque" (As Constantes Atuais)
Antes de pedir a função, você apresenta as constantes que já existem. Isso serve como um "manual de peças" para a IA.
> **Exemplo:** "IA, eu já possuo as seguintes constantes no meu projeto:
>  * ESPESSURA_PAREDE = 0.15
>  * ESCALA_PDF = 1.0
>  * COR_LINHA = '#000000'"
> 
### 2. Defina o Uso Mandatório
Você deve dar uma ordem direta para ela não criar variáveis globais novas nem nomes genéricos.
> **Comando:** "Ao criar a função, você **deve obrigatoriamente** utilizar as constantes listadas acima. Não invente novos valores fixos dentro da função."
> 
### O Modelo de Prompt "Blindado"
Se você quiser que ela crie a função agora, use este modelo de estrutura:
**Contexto:**
"Estou organizando meu projeto de arquitetura e preciso de uma função de montagem."
**Peças Disponíveis (Constantes):**
*(Cole aqui suas constantes, ex: CONST_A = 10, CONST_B = 20)*
**O Contrato:**
 * **Entrada:** (O que o usuário vai digitar, ex: largura e altura).
 * **Saída:** (O objeto que você quer receber de volta).
**Instruções de Montagem:**
 1. **Não invente nomes:** Use apenas as constantes que eu forneci e os parâmetros de entrada.
 2. **Lógica:** (Explique o cálculo, ex: "multiplique a entrada pela CONST_A").
 3. **Retorno:** Entregue o objeto pronto para o meu sistema de 2D.
### Por que fazer assim?
Isso cria o que chamamos de **Código Previsível**. Se você sabe que a função usa a sua constante ESPESSURA_PAREDE, quando você precisar mudar a espessura de todas as casas do seu App, você muda em um único lugar (na constante) e a função — que é a linha de montagem — passará a entregar o produto atualizado automaticamente.
Se a IA inventar um nome aleatório dentro da função, essa conexão se quebra e você terá que caçar o erro em cada linha de código.
**Dica Extra:** Se você estiver usando um arquivo separado para constantes (como um config.js ou constants.py), diga para ela: *"Considere que estas constantes estão sendo importadas de um arquivo externo"*. Isso ajuda ela a estruturar o código de forma ainda mais profissional.


Sim, existem termos técnicos muito específicos para isso. O que você está descrevendo é uma área avançada da computação aplicada à arquitetura. Se você pesquisar por termos genéricos, vai achar apenas vídeos de desenho, mas com os termos abaixo, você vai encontrar o "motor" (a lógica) desse quebra-cabeça.
Aqui estão os termos para você pesquisar no YouTube ou Google:
### 1. Generative Floor Plan Design (Design Generativo de Plantas)
Este é o termo principal. "Generativo" significa que o computador cria várias soluções sozinho com base em regras que você define. Em vez de você desenhar uma casa, você cria a lógica e a função gera 50 opções de plantas que funcionam.
### 2. Constraint-Based Layout Design (Layout Baseado em Restrições)
As "restrições" são as suas regras (ex: "o banheiro não pode abrir para a cozinha"). Pesquise por isso para entender como os programadores criam funções que resolvem quebra-cabeças espaciais sem que as peças se sobreponham.
### 3. Space Syntax ou Adjacency Matrix (Sintaxe Espacial ou Matriz de Adjacência)
Este é o nome técnico para o "quem pode acessar quem".
 * **Adjacency Matrix:** É uma tabela que a função lê para saber se o Quarto A deve estar encostado no Banheiro B.
 * **Bubble Diagram to Floor Plan:** Mostra como transformar aqueles círculos de "bolhas" de acesso em paredes reais.
### 4. Procedural Generation (Geração Procedural)
Muito usado em jogos, mas aplicado à arquitetura para criar layouts automáticos. Se você pesquisar **"Procedural Floor Plan Generation"**, verá como as funções organizam os cômodos em um grid de forma lógica e variada.
### Como estruturar a pesquisa para ver código na prática:
Se você quer ver como alguém constrói essa "linha de montagem" no código, tente estas frases:
 * *"Algorithmic Floor Plan Generation"*
 * *"Automated layout planning using architectural constraints"*
 * *"Generating 2D floor plans from adjacency graphs"*
### O que você vai encontrar:
Você verá que a função que você quer criar funciona como um **solucionador (solver)**. Ela recebe:
 1. **A Lista de Peças** (Seu array de cômodos).
 2. **O Mapa de Conexões** (Seu grafo de adjacência).
 3. **O Espaço Total** (O limite do terreno).
E ela "tenta" várias combinações até que todas as regras sejam satisfeitas. Se a regra diz que o quarto precisa de uma janela, a função vai girar o "quebra-cabeça" até o quarto tocar a borda externa do grid.
Você pretende que o seu **Independência App** sugira essas variações automaticamente para o usuário ou você quer que ele apenas valide se o que o usuário desenhou está correto conforme as normas?

Essa é a "parte profunda" da programação para arquitetura. Quando saímos de desenhos simples e passamos para sistemas que "entendem" o espaço, estamos usando **Teoria dos Grafos**.
Para o seu projeto, imagine que cada cômodo é um **nó** (um ponto) e cada porta ou passagem é uma **aresta** (a linha que liga os pontos).
Aqui estão os três pilares que sustentam essa lógica:
### 1. Grafo de Adjacência (O Mapa de Relacionamentos)
Em vez de pensar em metros quadrados primeiro, você pensa em conexões. A função lê uma estrutura de dados que diz quem é vizinho de quem.
 * **Na Prática:** Se a Sala está conectada à Cozinha, a função entende que elas precisam compartilhar uma "aresta" (parede).
 * **A Lógica:** Se o Quarto não tem conexão direta com a Cozinha, a função sabe que não pode colocar uma porta entre eles, mesmo que estejam lado a lado no desenho.
### 2. Matriz de Adjacência (A Tabela de Regras)
Para a IA ou para o seu código processar isso rápido, usamos uma **matriz**. É uma tabela onde as linhas e colunas são os cômodos.
|  | Sala | Cozinha | Quarto |
|---|---|---|---|
| **Sala** | 0 | 1 | 1 |
| **Cozinha** | 1 | 0 | 0 |
| **Quarto** | 1 | 0 | 0 |
 * **O "1"** significa que há conexão.
 * **O "0"** significa que não há acesso.
 * **A Função:** Ela percorre essa tabela. Se ela encontrar um "0" entre Cozinha e Quarto, ela "barra" qualquer tentativa de criar uma porta ali.
### 3. Algoritmos de Empacotamento (Bin Packing & Layout Solving)
Depois que a função sabe quem deve estar perto de quem, ela precisa resolver o "quebra-cabeça" físico.
 * **Constraint Solver (Solucionador de Restrições):** É um tipo de função que recebe todas as regras (ex: "Área da sala > 15m²", "Cozinha adjacente à Sala") e começa a testar posições no **Grid**.
 * **O Processo:** Se uma peça não cabe ou quebra uma regra de conexão, o algoritmo faz um *backtracking* (ele volta um passo, gira a peça ou muda a posição e tenta de novo) até que o "contrato" de todas as peças seja satisfeito.
### Como pesquisar para ver isso funcionando:
Se quiser ver programadores resolvendo exatamente isso, procure por estes termos mais técnicos:
 1. **"Graph-based floor plan generation"**: Verá como transformar esses pontos e linhas em paredes.
 2. **"Rectangular Duals in Architecture"**: É o nome matemático para converter um gráfico de conexões em um layout de retângulos (cômodos) que se encaixam perfeitamente sem sobrar buracos.
 3. **"Constraint Satisfaction Problems (CSP) for layout"**: Como programar funções que respeitam limites de espaço e acessos.
### O Caminho para o seu App
Para o seu SaaS, você pode começar criando uma **constante mestre** que guarda essa Matriz de Adjacência. Assim, toda vez que a sua função de "Linha de Montagem" for criar um novo layout, ela consulta essa tabela para saber onde pode ou não "abrir um buraco" na parede para uma porta.
Faz sentido visualizar a casa primeiro como esses pontos interligados antes de pensar no desenho final?
