import { Link } from 'react-router-dom'
import { Cpu, CheckCircle, ArrowRight, Star } from 'lucide-react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

const FEATURES = [
  { title: 'Perfil Familiar', desc: 'Adaptamos o projeto à sua família: adultos, crianças, pets e necessidades especiais.' },
  { title: 'Orçamento Inteligente', desc: 'Calcule automaticamente a área máxima pelo seu investimento disponível.' },
  { title: 'Análise de Terreno', desc: 'Informe as dimensões, recuos e desnível para um projeto tecnicamente preciso.' },
  { title: 'Planta Baixa 2D', desc: 'Geração automática com setorização por cores, portas e janelas posicionadas.' },
]

const STEPS = [
  { n: '01', label: 'Perfil', desc: 'Conte sobre sua família' },
  { n: '02', label: 'Orçamento', desc: 'Defina o investimento' },
  { n: '03', label: 'Terreno', desc: 'Dimensões e recuos' },
  { n: '04', label: 'Ambientes', desc: 'Personalize os cômodos' },
  { n: '05', label: 'Resumo', desc: 'Alertas técnicos automáticos' },
  { n: '06', label: 'Planta', desc: 'Sua planta baixa 2D' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-creme">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background ornament */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(135deg, #C8A882 25%, transparent 25%) -10px 0, linear-gradient(225deg, #C8A882 25%, transparent 25%) -10px 0',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-dourado/15 border border-dourado/30 px-4 py-1.5 rounded-full text-xs font-body text-dourado-dark mb-8">
            <Star size={12} className="fill-dourado-dark" />
            Simulador Arquitetônico Inteligente
          </div>

          <h1 className="font-title text-5xl sm:text-6xl md:text-7xl font-light text-escuro leading-tight mb-6">
            Projete sua casa<br />
            <em className="text-dourado-dark not-italic">antes de construir</em>
          </h1>

          <p className="font-body text-escuro/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Em 6 etapas simples, geramos a planta baixa personalizada do seu sonho —
            com análise técnica automática, setorização e medidas preliminares.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/simulador"
              id="hero-start-btn"
              className="inline-flex items-center gap-2 gradient-gold text-escuro px-8 py-4
                         rounded-sm font-body font-semibold text-base shadow-lg
                         hover:shadow-xl hover:brightness-105 active:scale-95 transition-all duration-300"
            >
              <Cpu size={18} />
              Iniciar Simulação Gratuita
              <ArrowRight size={18} />
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 border border-escuro/20 text-escuro px-8 py-4
                         rounded-sm font-body text-base hover:bg-escuro/5 transition-all duration-200"
            >
              Como funciona
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-escuro/50">
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              Gratuito & sem cadastro
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              Planta gerada na hora
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={14} className="text-green-600" />
              Salvo automaticamente
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-20 px-6 bg-escuro/3">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-title text-4xl text-escuro font-light mb-3">Como Funciona</h2>
            <p className="text-escuro/50 font-body">6 etapas simples para o projeto da sua casa.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STEPS.map(step => (
              <div key={step.n} className="card-premium group hover:border-dourado/40 transition-all duration-300">
                <p className="font-title text-3xl font-light text-dourado/60 mb-2 group-hover:text-dourado transition-colors">
                  {step.n}
                </p>
                <p className="font-body font-semibold text-escuro text-sm mb-1">{step.label}</p>
                <p className="text-xs text-escuro/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-title text-4xl text-escuro font-light mb-3">Recursos do Simulador</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="card-premium">
                <div className="w-2 h-8 bg-dourado rounded-full mb-4" />
                <h3 className="font-title text-xl text-escuro font-light mb-2">{f.title}</h3>
                <p className="font-body text-sm text-escuro/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-escuro">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-title text-4xl text-creme font-light mb-4">
            Pronto para começar?
          </h2>
          <p className="font-body text-creme/50 mb-8">
            Simule agora mesmo. É grátis, sem cadastro e salva seu progresso automaticamente.
          </p>
          <Link
            to="/simulador"
            id="cta-start-btn"
            className="inline-flex items-center gap-2 gradient-gold text-escuro px-8 py-4
                       rounded-sm font-body font-semibold shadow-lg
                       hover:brightness-110 active:scale-95 transition-all duration-300"
          >
            <Cpu size={18} />
            Iniciar Simulação
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
