import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import SimulatorWizard from '@/components/Simulator/SimulatorWizard'

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-creme flex flex-col">
      <Header />
      <main className="flex-1">
        <SimulatorWizard />
      </main>
      <Footer />
    </div>
  )
}
