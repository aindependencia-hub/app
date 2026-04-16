import { useState } from 'react'
import AdminLogin from '@/components/Admin/AdminLogin'
import AdminDashboard from '@/components/Admin/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('indep_admin_auth') === '1'
  )

  function handleLogout() {
    sessionStorage.removeItem('indep_admin_auth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
