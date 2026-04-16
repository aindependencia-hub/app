// React import mantido para JSX
import { ArchConcept } from '@/types';
import { cn } from '@/lib/utils';

interface ConceptOption {
  id: ArchConcept;
  name: string;
  description: string;
  category: 'Economic' | 'Lifestyle' | 'Terrain' | 'Modern';
}

const CONCEPTS: ConceptOption[] = [
  { id: 'compact', name: 'Compacto', description: 'Eficiência máxima e menor custo construtivo.', category: 'Economic' },
  { id: 'vertical', name: 'Vertical', description: 'Uso otimizado de terrenos pequenos crescendo para cima.', category: 'Economic' },
  { id: 'l-shape', name: 'Em "L"', description: 'Articulada para abraçar o pátio e separar as alas.', category: 'Lifestyle' },
  { id: 'patio', name: 'Pátio central', description: 'Vida voltada para dentro, em torno de um jardim.', category: 'Lifestyle' },
  { id: 'linear', name: 'Linear', description: 'Pavilhão longo que permite abertura total para o sol.', category: 'Lifestyle' },
  { id: 'hybrid', name: 'Biofílico', description: 'Onde o jardim entra na casa — espaços rasteiros.', category: 'Lifestyle' },
  { id: 'stepped', name: 'Escalonado', description: 'Acomoda-se ao terreno em aclive ou declive.', category: 'Terrain' },
  { id: 'suspended', name: 'Suspenso', description: 'Sobre pilotis, deixando o chão livre para o jardim.', category: 'Terrain' },
  { id: 'modules', name: 'Módulos', description: 'Blocos conectados que facilitam expansões futuras.', category: 'Terrain' },
  { id: 'monolithic', name: 'Monolítico', description: 'Design limpo, minimalista e imponente.', category: 'Modern' },
];

interface ConceptSelectorProps {
  selected: ArchConcept;
  onChange: (concept: ArchConcept) => void;
}

export function ConceptSelector({ selected, onChange }: ConceptSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONCEPTS.map((concept) => (
          <div 
            key={concept.id}
            className={cn(
              "cursor-pointer transition-all hover:scale-[1.02] border-2 rounded-sm p-4 flex flex-col items-center text-center space-y-2 bg-white",
              selected === concept.id ? "border-dourado bg-dourado/5" : "border-dourado/10"
            )}
            onClick={() => onChange(concept.id)}
          >
            <span className="text-[10px] uppercase tracking-wider font-bold text-escuro/40">
              {concept.category}
            </span>
            <h3 className="font-bold text-sm tracking-tight text-escuro">{concept.name}</h3>
            <p className="text-[11px] text-escuro/60 leading-tight">
              {concept.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
