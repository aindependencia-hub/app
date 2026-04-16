import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import SimulatorPage from '@/pages/SimulatorPage'
import AdminPage from '@/pages/AdminPage'
import DocsPage from '@/pages/DocsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<SimulatorPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
