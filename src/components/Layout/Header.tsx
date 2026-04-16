import { Link, useLocation } from 'react-router-dom'
import { Home, LayoutDashboard, Cpu } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  const appName = import.meta.env.VITE_APP_NAME || 'Independência'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-creme/90 backdrop-blur-md border-b border-dourado/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-escuro rounded-sm flex items-center justify-center group-hover:bg-dourado transition-colors duration-300">
            <span className="text-creme font-title text-lg font-light group-hover:text-escuro transition-colors duration-300">I</span>
          </div>
          <span className="font-title text-2xl font-light text-escuro tracking-wide">
            {appName}
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm font-body transition-all duration-200
              ${location.pathname === '/' ? 'bg-dourado/20 text-escuro' : 'text-escuro/60 hover:text-escuro hover:bg-dourado/10'}`}
          >
            <Home size={14} />
            <span className="hidden sm:inline">Início</span>
          </Link>
          <Link
            to="/simulador"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm font-body transition-all duration-200
              ${location.pathname === '/simulador' ? 'bg-dourado/20 text-escuro' : 'text-escuro/60 hover:text-escuro hover:bg-dourado/10'}`}
          >
            <Cpu size={14} />
            <span className="hidden sm:inline">Simulador</span>
          </Link>
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm font-body transition-all duration-200
              ${location.pathname === '/admin' ? 'bg-dourado/20 text-escuro' : 'text-escuro/60 hover:text-escuro hover:bg-dourado/10'}`}
          >
            <LayoutDashboard size={14} />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
