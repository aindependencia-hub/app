import { getArchitects } from '@/lib/store'
import { Calendar, Star, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import type { Architect } from '@/types'
import { cn } from '@/lib/utils'

export default function ArchitectsList() {
  const architects: Architect[] = getArchitects()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-title text-2xl text-escuro font-light">Arquitetos Parceiros</h2>
        <span className="text-xs text-escuro/50 bg-dourado/10 px-2 py-1 rounded-sm">
          {architects.filter(a => a.available).length} disponíveis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {architects.map(arch => (
          <div
            key={arch.id}
            className={cn(
              'card-premium transition-all duration-200 hover:shadow-md',
              !arch.available && 'opacity-60'
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-dourado/30 to-dourado/10
                                flex items-center justify-center text-xl font-title text-escuro flex-shrink-0">
                  {arch.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-escuro text-sm">{arch.name}</h3>
                  <p className="text-xs text-escuro/50">{arch.specialty}</p>
                </div>
              </div>

              {/* Status */}
              <div className={cn(
                'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
                arch.available
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-50 text-red-600'
              )}>
                {arch.available
                  ? <><CheckCircle size={11} /> Disponível</>
                  : <><XCircle size={11} /> Indisponível</>
                }
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(arch.rating) ? 'text-dourado fill-dourado' : 'text-escuro/20'}
                />
              ))}
              <span className="text-xs text-escuro/50 ml-1">{arch.rating.toFixed(1)}</span>
            </div>

            {/* Calendly */}
            <a
              href={arch.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`calendly-${arch.id}`}
              className={cn(
                'flex items-center justify-center gap-2 w-full py-2 rounded-sm text-sm font-body',
                'border border-dourado/30 transition-all duration-200',
                arch.available
                  ? 'hover:bg-dourado hover:text-escuro hover:border-dourado text-escuro'
                  : 'pointer-events-none text-escuro/30'
              )}
            >
              <Calendar size={14} />
              Agendar Consulta
              {arch.available && <ExternalLink size={12} className="ml-auto text-escuro/40" />}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
