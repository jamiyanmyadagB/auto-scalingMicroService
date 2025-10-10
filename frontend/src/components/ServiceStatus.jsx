import { CheckCircle, XCircle, Loader } from 'lucide-react'

const ServiceStatus = ({ service, status, loading }) => {
  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-primary-900">{service}</h3>
        {loading ? (
          <Loader className="w-6 h-6 text-warning animate-spin" />
        ) : status ? (
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-success" />
            <span className="status-online">Online</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <XCircle className="w-6 h-6 text-danger" />
            <span className="status-offline">Offline</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-primary-600">Response Time:</span>
          <span className="font-mono text-primary-800">{loading ? '...' : '< 100ms'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-primary-600">CPU Usage:</span>
          <span className="font-mono text-primary-800">{loading ? '...' : '12%'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-primary-600">Memory:</span>
          <span className="font-mono text-primary-800">{loading ? '...' : '64MB'}</span>
        </div>
      </div>
    </div>
  )
}

export default ServiceStatus
