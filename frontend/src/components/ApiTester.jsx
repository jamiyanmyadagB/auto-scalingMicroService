import { useState } from 'react'
import { Play, Loader } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { callAuthService, callUserService, callProductService } from '../services/api'

const ApiTester = () => {
  const [loading, setLoading] = useState({})
  const [responses, setResponses] = useState({})

  const makeApiCall = async (service, apiCall) => {
    setLoading(prev => ({ ...prev, [service]: true }))
    
    try {
      const response = await apiCall()
      setResponses(prev => ({ 
        ...prev, 
        [service]: { 
          success: true, 
          data: response, 
          timestamp: new Date().toLocaleTimeString() 
        } 
      }))
      toast.success(`${service} API call successful`)
    } catch (error) {
      setResponses(prev => ({ 
        ...prev, 
        [service]: { 
          success: false, 
          error: error.message, 
          timestamp: new Date().toLocaleTimeString() 
        } 
      }))
      toast.error(`${service} API call failed`)
    } finally {
      setLoading(prev => ({ ...prev, [service]: false }))
    }
  }

  const services = [
    { name: 'Auth Service', key: 'auth', apiCall: callAuthService },
    { name: 'User Service', key: 'users', apiCall: callUserService },
    { name: 'Product Service', key: 'products', apiCall: callProductService },
  ]

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-primary-900 mb-6">API Gateway Tester</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {services.map((service) => (
          <button
            key={service.key}
            onClick={() => makeApiCall(service.key, service.apiCall)}
            disabled={loading[service.key]}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            {loading[service.key] ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>Call {service.name}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(responses).map(([service, response]) => (
          <div key={service} className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary-900 capitalize">{service}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                response.success ? 'bg-success text-white' : 'bg-danger text-white'
              }`}>
                {response.success ? 'SUCCESS' : 'ERROR'}
              </span>
            </div>
            <div className="text-xs text-primary-600 mb-2">{response.timestamp}</div>
            <pre className="text-xs bg-primary-100 p-2 rounded overflow-x-auto">
              {response.success 
                ? JSON.stringify(response.data, null, 2)
                : response.error
              }
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApiTester
