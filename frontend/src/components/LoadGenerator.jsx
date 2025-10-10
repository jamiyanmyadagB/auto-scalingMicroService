import { useState } from 'react'
import { Zap, Loader, TrendingUp } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { generateLoad } from '../services/api'

const LoadGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [requestCount, setRequestCount] = useState(0)
  const [cpuUsage, setCpuUsage] = useState(12)
  const [activePods, setActivePods] = useState(1)

  const startLoadGeneration = async () => {
    setIsGenerating(true)
    setRequestCount(0)
    setCpuUsage(12)
    setActivePods(1)
    
    toast.success('Starting load generation...')
    
    const interval = setInterval(() => {
      setRequestCount(prev => prev + 1)
      setCpuUsage(prev => Math.min(95, prev + Math.random() * 15))
      
      if (cpuUsage > 50 && activePods < 5) {
        setActivePods(prev => prev + 1)
        toast.success(`Auto-scaling: Increased pods to ${activePods + 1}`)
      }
    }, 1000)

    try {
      for (let i = 0; i < 10; i++) {
        await generateLoad('auth')
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      toast.success('Load generation completed!')
    } catch (error) {
      toast.error('Load generation failed')
    } finally {
      clearInterval(interval)
      setIsGenerating(false)
      
      setTimeout(() => {
        setCpuUsage(12)
        setActivePods(1)
        toast.info('Auto-scaling: Scaled down to 1 pod')
      }, 3000)
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-primary-900">Load Generator</h2>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-warning" />
          <span className="text-sm text-warning font-semibold">Auto-Scaling Demo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary-600">Requests</span>
            <Zap className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900">{requestCount}</div>
        </div>
        
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary-600">CPU Usage</span>
            <TrendingUp className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-primary-900">{cpuUsage.toFixed(1)}%</div>
        </div>
        
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary-600">Active Pods</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < activePods ? 'bg-success' : 'bg-primary-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-2xl font-bold text-primary-900">{activePods}/5</div>
        </div>
      </div>

      <button
        onClick={startLoadGeneration}
        disabled={isGenerating}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
          isGenerating
            ? 'bg-warning text-white cursor-not-allowed'
            : 'btn-danger'
        }`}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Generating Load...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Generate Load</span>
          </div>
        )}
      </button>
    </div>
  )
}

export default LoadGenerator
