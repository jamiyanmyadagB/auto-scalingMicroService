import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import { checkSystemHealth } from './services/api'

function App() {
  const [systemHealthy, setSystemHealthy] = useState(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await checkSystemHealth()
        setSystemHealthy(response.status === 'healthy')
      } catch (error) {
        setSystemHealthy(false)
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <Header systemHealthy={systemHealthy} />
      <Dashboard />
    </div>
  )
}

export default App
