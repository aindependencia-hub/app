import { useState } from 'react'
import { getLeads, saveLead } from '@/lib/store'
import type { Lead } from '@/types'
import { cn } from '@/lib/utils'
import { User, Mail, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react'

const STATUS_CONFIG = {
  novo: { label: 'Novo', color: 'bg-blue-100 text-blue-700', icon: Circle },
  em_atendimento: { label: 'Em Atendimento', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  finalizado: { label: 'Finalizado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

export default function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>(() => getLeads())

  function updateStatus(lead: Lead, status: Lead['status']) {
    const updated = { ...lead, status }
    saveLead(updated)
    setLeads(getLeads())
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  if (leads.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-title text-2xl text-escuro font-light">Leads Capturados</h2>
        <div className="card-premium text-center py-12 text-escuro/40">
          <User size={32} className="mx-auto mb-3 opacity-30" />
          <p className="font-body text-sm">Nenhum lead capturado ainda.</p>
          <p className="text-xs mt-1">Os leads aparecem quando alguém solicitar o PDF com medidas.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-title text-2xl text-escuro font-light">Leads Capturados</h2>
        <div className="flex gap-2 text-xs">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {leads.filter(l => l.status === 'novo').length} novos
          </span>
          <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
            {leads.filter(l => l.status === 'em_atendimento').length} em atendimento
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {leads.map(lead => {
          const cfg = STATUS_CONFIG[lead.status]
          const StatusIcon = cfg.icon
          return (
            <div key={lead.id} className="card-premium hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-sm bg-dourado/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-title text-lg text-escuro">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-body font-semibold text-escuro text-sm truncate">
                        {lead.name}
                      </h3>
                      <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0', cfg.color)}>
                        <StatusIcon size={10} />
                        {cfg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-escuro/50 mb-1">
                      <Mail size={11} />
                      <a href={`mailto:${lead.email}`} className="hover:text-dourado-dark transition-colors">
                        {lead.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-escuro/40">
                      <Clock size={11} />
                      {formatDate(lead.createdAt)}
                    </div>
                    {lead.projectSummary && (
                      <p className="text-xs text-escuro/50 mt-1.5 bg-dourado/5 px-2 py-1 rounded-sm truncate">
                        📐 {lead.projectSummary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status selector */}
                <select
                  id={`status-${lead.id}`}
                  value={lead.status}
                  onChange={e => updateStatus(lead, e.target.value as Lead['status'])}
                  className="text-xs border border-dourado/20 rounded-sm px-2 py-1 bg-white
                             text-escuro focus:outline-none focus:border-dourado flex-shrink-0"
                >
                  <option value="novo">Novo</option>
                  <option value="em_atendimento">Em Atendimento</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
