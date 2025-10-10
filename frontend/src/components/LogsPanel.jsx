import { useState, useEffect, useRef } from 'react'
import { Terminal, Activity } from 'lucide-react'

const LogsPanel = () => {
  const [logs, setLogs] = useState([
    { timestamp: '12:00:01', level: 'INFO', service: 'Gateway', message: 'System initialized' },
    { timestamp: '12:00:02', level: 'INFO', service: 'Auth', message: 'Health check passed' },
    { timestamp: '12:00:03', level: 'INFO', service: 'User', message: 'Database connected' },
  ])
  const logsEndRef = useRef(null)

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [logs])

  useEffect(() => {
    const interval = setInterval(() => {
      const services = ['Gateway', 'Auth', 'User', 'Product']
      const levels = ['INFO', 'WARN', 'ERROR']
      const messages = [
        'Request processed successfully',
        'Health check completed',
        'Cache updated',
        'Connection established',
        'Metrics collected',
        'Load balancer updated'
      ]

      const newLog = {
        timestamp: new Date().toLocaleTimeString(),
        level: levels[Math.floor(Math.random() * levels.length)],
        service: services[Math.floor(Math.random() * services.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      }

      setLogs(prev => [...prev.slice(-9), newLog])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getLevelColor = (level) => {
    switch (level) {
      case 'INFO': return 'text-success'
      case 'WARN': return 'text-warning'
      case 'ERROR': return 'text-danger'
      default: return 'text-primary-600'
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary-900 flex items-center space-x-2">
          <Terminal className="w-6 h-6" />
          <span>System Logs</span>
        </h2>
        <div className="flex items-center space-x-2 text-primary-600">
          <Activity className="w-4 h-4 animate-pulse" />
          <span className="text-sm">Live</span>
        </div>
      </div>

      <div className="bg-primary-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
        {logs.map((log, index) => (
          <div key={index} className="mb-2 flex items-start space-x-3">
            <span className="text-primary-400 text-xs">{log.timestamp}</span>
            <span className={`font-bold ${getLevelColor(log.level)}`}>{log.level}</span>
            <span className="text-primary-300">[{log.service}]</span>
            <span className="text-primary-200">{log.message}</span>
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  )
}

export default LogsPanel
