import { useState } from 'react'
import { Users, UserCheck, LogOut, BarChart3 } from 'lucide-react'
import ArchitectsList from './ArchitectsList'
import LeadsList from './LeadsList'
import { getLeads } from '@/lib/store'
import { cn } from '@/lib/utils'

interface Props {
  onLogout: () => void
}

type Tab = 'overview' | 'leads' | 'architects'

export default function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('overview')
  const leads = getLeads()

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'novo').length,
    inProgress: leads.filter(l => l.status === 'em_atendimento').length,
    done: leads.filter(l => l.status === 'finalizado').length,
  }

  return (
    <div className="min-h-screen bg-creme">
      {/* Topbar */}
      <header className="bg-escuro text-creme px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-dourado/20 border border-dourado/30 rounded-sm flex items-center justify-center">
            <span className="font-title text-dourado text-lg">I</span>
          </div>
          <div>
            <span className="font-title text-xl font-light">Independência</span>
            <span className="font-body text-xs text-creme/40 ml-2">Painel Admin</span>
          </div>
        </div>
        <button
          id="admin-logout"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm text-creme/60 hover:text-creme transition-colors"
        >
          <LogOut size={15} />
          Sair
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total de Leads', value: stats.total, icon: BarChart3, color: 'text-escuro' },
            { label: 'Novos', value: stats.new, icon: Users, color: 'text-blue-600' },
            { label: 'Em Atendimento', value: stats.inProgress, icon: UserCheck, color: 'text-amber-600' },
            { label: 'Finalizados', value: stats.done, icon: UserCheck, color: 'text-green-600' },
          ].map(stat => (
            <div key={stat.label} className="card-premium text-center">
              <stat.icon size={20} className={cn('mx-auto mb-2', stat.color)} />
              <p className="font-title text-3xl font-light text-escuro">{stat.value}</p>
              <p className="text-xs text-escuro/50 font-body">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-escuro/5 rounded-sm p-1">
          {([
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'leads', label: 'Leads', icon: Users },
            { id: 'architects', label: 'Arquitetos', icon: UserCheck },
          ] as const).map(t => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-1.5 flex-1 px-3 py-2 rounded-sm text-sm font-body transition-all duration-200',
                tab === t.id
                  ? 'bg-escuro text-creme shadow-sm'
                  : 'text-escuro/60 hover:text-escuro'
              )}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-up" key={tab}>
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="card-premium">
                <h3 className="font-body font-semibold text-escuro mb-4">Atividade Recente</h3>
                {leads.slice(0, 5).length > 0 ? (
                  <div className="space-y-3">
                    {leads.slice(0, 5).map(lead => (
                      <div key={lead.id} className="flex items-center justify-between text-sm py-2 border-b border-dourado/10 last:border-0">
                        <div>
                          <span className="font-medium text-escuro">{lead.name}</span>
                          <span className="text-escuro/40 ml-2 text-xs">{lead.email}</span>
                        </div>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          lead.status === 'novo' ? 'bg-blue-100 text-blue-700' :
                          lead.status === 'em_atendimento' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        )}>
                          {lead.status === 'novo' ? 'Novo' : lead.status === 'em_atendimento' ? 'Em Atendimento' : 'Finalizado'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-escuro/40">Nenhuma atividade ainda.</p>
                )}
              </div>
            </div>
          )}
          {tab === 'leads' && <LeadsList />}
          {tab === 'architects' && <ArchitectsList />}
        </div>
      </div>
    </div>
  )
}
