import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import ServiceStatus from '../components/ServiceStatus'
import ApiTester from '../components/ApiTester'
import LoadGenerator from '../components/LoadGenerator'
import ScalingChart from '../components/ScalingChart'
import LogsPanel from '../components/LogsPanel'
import ArchitectureDiagram from '../components/ArchitectureDiagram'
import { callAuthService, callUserService, callProductService } from '../services/api'

const Dashboard = () => {
  const [services, setServices] = useState({
    auth: { status: false, loading: true },
    users: { status: false, loading: true },
    products: { status: false, loading: true }
  })

  useEffect(() => {
    const checkServices = async () => {
      const serviceChecks = [
        { key: 'auth', call: callAuthService },
        { key: 'users', call: callUserService },
        { key: 'products', call: callProductService }
      ]

      for (const service of serviceChecks) {
        try {
          await service.call()
          setServices(prev => ({ ...prev, [service.key]: { status: true, loading: false } }))
        } catch (error) {
          setServices(prev => ({ ...prev, [service.key]: { status: false, loading: false } }))
        }
      }
    }

    checkServices()
    const interval = setInterval(checkServices, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceStatus 
          service="Authentication Service" 
          status={services.auth.status} 
          loading={services.auth.loading}
        />
        <ServiceStatus 
          service="User Management Service" 
          status={services.users.status} 
          loading={services.users.loading}
        />
        <ServiceStatus 
          service="Product Catalog Service" 
          status={services.products.status} 
          loading={services.products.loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ApiTester />
        <LoadGenerator />
      </div>

      <ScalingChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LogsPanel />
        <ArchitectureDiagram />
      </div>
    </div>
  )
}

export default Dashboard
