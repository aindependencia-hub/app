import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Ruler, Layout, Truck, Settings, ArrowLeft, Terminal } from 'lucide-react';

const DocsPage: React.FC = () => {
  const sections = [
    {
      id: 'conceito',
      title: 'Visão Geral e Conceito Social',
      icon: <Book className="w-6 h-6" />,
      content: 'O simulador Independência foca na funcionalidade absoluta. O objetivo é permitir que o usuário planeje sua casa adequando móveis reais a uma estrutura técnica profissional, sem desperdício de espaço.',
    },
    {
      id: 'ociosidade-zero',
      title: 'Lógica de Ociosidade Zero',
      icon: <Ruler className="w-6 h-6" />,
      content: 'REGRA DE OURO: O cômodo deve ser dimensionado apenas para caber o móvel + a circulação. Largura da Parede = Largura do Mobiliário + 1.20m (60cm de cada lado para fluxo).',
    },
    {
      id: 'fluxo',
      title: 'Fluxo de Circulação (DNA)',
      icon: <Layout className="w-6 h-6" />,
      content: 'A casa deve seguir uma sequência lógica: Garagem → Sala → Cozinha → Área de Serviço. No setor privado: Sala → Corredor → Quartos/Banheiros.',
    },
    {
      id: 'tecnica',
      title: 'Representação Técnica (NBR 6492)',
      icon: <Terminal className="w-6 h-6" />,
      content: 'Paredes em corte (grossa - 4px), esquadrias e móveis fixos (média - 2px), móveis móveis e cotas (fina - 1px). Indicadores de nível (+0.10m) e arco de abertura de portas são obrigatórios.',
    },
    {
      id: 'inventario',
      title: 'Inventário "Estou de Mudança"',
      icon: <Truck className="w-6 h-6" />,
      content: 'Permite integrar móveis que você já possui. O sistema bloqueia reduções de parede que impeçam o encaixe desses itens [EX] e remove sugestões de móveis novos equivalentes.',
    },
  ];

  const techStack = [
    { name: 'React', desc: 'Biblioteca para construção da interface via componentes.' },
    { name: 'Vite', desc: 'Ferramenta de build ultra-rápida para desenvolvimento.' },
    { name: 'TypeScript', desc: 'Adiciona tipagem estática para evitar erros de lógica.' },
    { name: 'Tailwind CSS', desc: 'Framework de estilização baseado em classes utilitárias.' },
    { name: 'Lucide React', desc: 'Pacote de ícones vetoriais modernos.' },
    { name: 'Radix UI', desc: 'Base de componentes acessíveis e robustos.' },
  ];

  const engineLogic = [
    { 
      title: '1. Biblioteca de Medidas (FURNITURE_DB)', 
      desc: 'Baseamos o tamanho dos cômodos em móveis Reais. Ex: Um quarto de casal DEVE caber uma Cama Queen (1.58m x 1.98m) + 60cm de cada lado.' 
    },
    { 
      title: '2. Algoritmo de Massa Única (makeRect)', 
      desc: 'Eliminamos corredores inúteis. O sistema calcula a soma dos móveis e gera um retângulo "justo" (Zero-Idleness).' 
    },
    { 
      title: '3. Sequência de Fluxo (Room Order)', 
      desc: 'Os cômodos são ancorados na ordem: Garagem (entrada) -> Sala -> Cozinha -> Área Privada.' 
    },
    { 
      title: '4. Renderização Canvas', 
      desc: 'Usamos a API do Canvas para desenhar as paredes (4px), pisos hachurados e a bússola de Norte magnético.' 
    },
    { 
      title: '5. Proteção de Aberturas', 
      desc: 'O motor bloqueia a colocação de móveis em um raio de 1.20m à frente de qualquer porta para garantir passagem livre.' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1714] font-sans pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-[#E8D5B7] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-[#8B6F47] hover:text-[#2C2420] transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Voltar</span>
        </Link>
        <h1 className="text-xl font-bold uppercase tracking-widest text-[#2C2420]">Memorial Descritivo Técnico</h1>
        <div className="w-20" /> {/* Spacer */}
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-extrabold text-[#2C2420] mb-4">Documentação do Sistema</h2>
          <p className="text-lg text-[#6B5E52] max-w-2xl mx-auto">
            Este guia serve como base técnica para o desenvolvimento e consulta dos parâmetros arquitetônicos do Independência Simulator.
          </p>
        </div>

        {/* Core Concepts */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-l-4 border-[#8B6F47] pl-4">
            <h3 className="text-2xl font-bold text-[#2C2420]">Conceitos Fundamentais</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-white p-8 rounded-2xl border border-[#E8D5B7] shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="bg-[#FAF8F5] w-12 h-12 rounded-lg flex items-center justify-center text-[#8B6F47] mb-6 group-hover:bg-[#8B6F47] group-hover:text-white transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2C2420] mb-3">{section.title}</h3>
                <p className="text-[#6B5E52] leading-relaxed text-sm">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20 bg-white rounded-3xl border border-[#E8D5B7] p-10">
          <div className="flex items-center gap-3 mb-10">
            <Settings className="w-8 h-8 text-[#8B6F47]" />
            <h3 className="text-2xl font-bold text-[#2C2420]">Stack de Tecnologia (Frameworks)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="border-b border-[#F0E6D6] pb-4">
                <h4 className="font-bold text-[#8B6F47] mb-1">{tech.name}</h4>
                <p className="text-sm text-[#6B5E52]">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engine Deep Dive */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-l-4 border-[#2C2420] pl-4">
            <h3 className="text-2xl font-bold text-[#2C2420]">Entendendo o Motor (floorPlanEngine.ts)</h3>
          </div>
          <div className="bg-[#2C2420] rounded-3xl p-10 text-white">
            <p className="text-[#A89F94] mb-10 max-w-3xl">
              O arquivo <code className="bg-[#3D342E] px-2 py-1 rounded">floorPlanEngine.ts</code> é o cérebro do sistema. 
              Ele transforma os desejos do usuário em geometrias arquitetônicas precisas.
            </p>
            <div className="space-y-8">
              {engineLogic.map((logic, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="text-[#8B6F47] font-mono font-bold text-xl pt-1">0{idx + 1}</span>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{logic.title}</h4>
                    <p className="text-[#A89F94] leading-relaxed">{logic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs Table */}
        <div className="mt-16 bg-white rounded-2xl border border-[#E8D5B7] overflow-hidden">
          <div className="bg-[#2C2420] p-6 text-white">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Parâmetros de Lógica (FURNITURE_DB)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E8D5B7]">
                  <th className="p-4 font-bold">Item</th>
                  <th className="p-4 font-bold">Dimensão (L x P)</th>
                  <th className="p-4 font-bold">Aplicação Típica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D5B7]">
                <tr>
                  <td className="p-4">Cama Queen Size</td>
                  <td className="p-4 text-[#8B6F47]">1.58m x 1.98m</td>
                  <td className="p-4">Suíte Master / Quarto Casal</td>
                </tr>
                <tr>
                  <td className="p-4">Sofá 3 Lugares</td>
                  <td className="p-4 text-[#8B6F47]">2.10m x 0.90m</td>
                  <td className="p-4">Sala de Estar principal</td>
                </tr>
                <tr>
                  <td className="p-4">Veículo Corolla</td>
                  <td className="p-4 text-[#8B6F47]">1.80m x 4.65m</td>
                  <td className="p-4">Mínimo para Garagem Técnica</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-20 text-center pb-12">
          <p className="text-sm text-[#999] font-mono">
            &copy; 2026 Independência Simulator Engine . NBR 6492 Compliant . IA Documentation v1
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DocsPage;
