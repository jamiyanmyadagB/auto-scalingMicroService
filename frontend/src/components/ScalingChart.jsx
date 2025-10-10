import { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const ScalingChart = () => {
  const [requestData, setRequestData] = useState([0, 0, 0, 0, 0, 0])
  const [podData, setPodData] = useState([1, 1, 1, 1, 1, 1])
  const [cpuData, setCpuData] = useState([12, 12, 12, 12, 12, 12])

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 100)]
        return newData
      })
      
      setCpuData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 80) + 10]
        return newData
      })
      
      setPodData(prev => {
        const lastCpu = cpuData[cpuData.length - 1]
        const newPods = lastCpu > 50 ? Math.min(5, prev[prev.length - 1] + 1) : Math.max(1, prev[prev.length - 1] - 1)
        return [...prev.slice(1), newPods]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [cpuData])

  const requestChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Requests Over Time' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }

  const podChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Pod Scaling' }
    },
    scales: {
      y: { beginAtZero: true, max: 5, ticks: { stepSize: 1 } }
    }
  }

  const cpuChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'CPU Usage (%)' }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }

  const requestChartData = {
    labels: ['T-10s', 'T-8s', 'T-6s', 'T-4s', 'T-2s', 'Now'],
    datasets: [
      {
        label: 'Requests/sec',
        data: requestData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  }

  const podChartData = {
    labels: ['T-10s', 'T-8s', 'T-6s', 'T-4s', 'T-2s', 'Now'],
    datasets: [
      {
        label: 'Active Pods',
        data: podData,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2
      }
    ]
  }

  const cpuChartData = {
    labels: ['T-10s', 'T-8s', 'T-6s', 'T-4s', 'T-2s', 'Now'],
    datasets: [
      {
        label: 'CPU %',
        data: cpuData,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      }
    ]
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-primary-900 mb-6">Auto-Scaling Visualization</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Line data={requestChartData} options={requestChartOptions} />
        </div>
        <div>
          <Bar data={podChartData} options={podChartOptions} />
        </div>
      </div>
      
      <div className="mt-6">
        <Line data={cpuChartData} options={cpuChartOptions} />
      </div>
    </div>
  )
}

export default ScalingChart
