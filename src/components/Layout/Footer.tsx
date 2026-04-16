export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-escuro text-creme/60 py-8 px-6 text-center font-body text-sm">
      <div className="max-w-4xl mx-auto">
        <p className="font-title text-2xl font-light text-creme mb-2">Independência</p>
        <p className="text-xs text-creme/40 mb-4">Simulador Arquitetônico Inteligente</p>
        <div className="w-12 h-px bg-dourado/40 mx-auto mb-4" />
        <p className="text-creme/40 text-xs">
          © {year} Independência Arquitetura. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
