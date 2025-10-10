import { Activity, Server, Zap } from 'lucide-react'

const Header = ({ systemHealthy }) => {
  return (
    <header className="glass-card border-b border-primary-300 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Server className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-primary-900">
                Auto-Scaling Microservices Platform
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">
                System Status:
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                systemHealthy 
                  ? 'bg-success text-white animate-pulse-slow' 
                  : 'bg-danger text-white'
              }`}>
                {systemHealthy ? 'HEALTHY' : 'UNHEALTHY'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-primary-600">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-semibold">Auto-Scaling Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
