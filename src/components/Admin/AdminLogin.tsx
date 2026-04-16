import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface Props {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const correctPw = import.meta.env.VITE_ADMIN_PASSWORD || 'independencia@2024'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (password === correctPw) {
        sessionStorage.setItem('indep_admin_auth', '1')
        onLogin()
      } else {
        setError('Senha incorreta. Tente novamente.')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-escuro flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #C8A882 0, #C8A882 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }} />

      <div className="relative w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-dourado/20 border border-dourado/30 rounded-sm flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-dourado" />
          </div>
          <h1 className="font-title text-3xl text-creme font-light mb-1">Painel Admin</h1>
          <p className="font-body text-creme/40 text-sm">Independência Arquitetura</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-creme/5 border border-dourado/20 rounded-sm p-6 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="text-sm font-medium text-creme/80 block mb-1.5">
                Senha de acesso
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-escuro/50 border border-dourado/30 rounded-sm px-3 py-2.5 pr-10
                             text-creme placeholder:text-creme/30 focus:outline-none
                             focus:border-dourado focus:ring-1 focus:ring-dourado/30"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-creme/40 hover:text-creme/70"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/20 rounded-sm p-2.5">
                {error}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading || !password}
              className="w-full gradient-gold text-escuro py-3 rounded-sm font-body font-semibold
                         hover:brightness-105 active:scale-95 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando…' : 'Entrar'}
            </button>
          </div>
        </form>

        <p className="text-center text-creme/20 text-xs mt-6 font-body">
          Acesso restrito a administradores autorizados
        </p>
      </div>
    </div>
  )
}
