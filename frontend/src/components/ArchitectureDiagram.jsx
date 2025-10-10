import { ArrowRight, Server, Database, Cloud, Shield } from 'lucide-react'

const ArchitectureDiagram = () => {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-primary-900 mb-6">System Architecture</h2>
      
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="glass-card p-4 w-64 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Cloud className="w-6 h-6 text-primary-600" />
              <span className="font-bold text-primary-900">Client</span>
            </div>
            <div className="text-xs text-primary-600">React Dashboard</div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-primary-400" />
          
          <div className="glass-card p-4 w-64 text-center border-2 border-success">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Server className="w-6 h-6 text-success" />
              <span className="font-bold text-primary-900">API Gateway</span>
            </div>
            <div className="text-xs text-primary-600">Load Balancer & Router</div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-primary-400" />
          
          <div className="flex space-x-4">
            <div className="glass-card p-3 w-32 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Shield className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-bold text-primary-900">Auth</span>
              </div>
              <div className="text-xs text-primary-600">Service</div>
            </div>
            
            <div className="glass-card p-3 w-32 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Database className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-bold text-primary-900">Users</span>
              </div>
              <div className="text-xs text-primary-600">Service</div>
            </div>
            
            <div className="glass-card p-3 w-32 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Server className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-bold text-primary-900">Products</span>
              </div>
              <div className="text-xs text-primary-600">Service</div>
            </div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-primary-400" />
          
          <div className="glass-card p-4 w-64 text-center border-2 border-warning">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Cloud className="w-6 h-6 text-warning" />
              <span className="font-bold text-primary-900">Kubernetes</span>
            </div>
            <div className="text-xs text-primary-600">Auto-Scaling Orchestration</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <h4 className="font-bold text-primary-900 mb-2">Horizontal Scaling</h4>
            <p className="text-sm text-primary-600">1-5 pods based on CPU usage</p>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <h4 className="font-bold text-primary-900 mb-2">Health Monitoring</h4>
            <p className="text-sm text-primary-600">Liveness & readiness probes</p>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <h4 className="font-bold text-primary-900 mb-2">Load Balancing</h4>
            <p className="text-sm text-primary-600">Automatic traffic distribution</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArchitectureDiagram
