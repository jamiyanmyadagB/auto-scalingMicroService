# Auto-Scaling Microservices Dashboard

Modern React frontend dashboard for visualizing microservices architecture and auto-scaling capabilities.

## Features

- **Real-time Service Status**: Monitor Auth, User, and Product services
- **API Gateway Testing**: Test all microservices from the UI
- **Load Generator**: Demonstrate auto-scaling with CPU load simulation
- **Live Charts**: Real-time visualization of requests, pods, and CPU usage
- **System Logs**: Live terminal-style log streaming
- **Architecture Diagram**: Visual representation of the system

## Tech Stack

- React 18 with Vite
- Tailwind CSS for styling
- Chart.js for data visualization
- Axios for API calls
- React Hot Toast for notifications

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

The dashboard connects to your microservices API at:
- Development: `http://localhost:3000`
- Production: `https://auto-scale-microservices.vercel.app`

Set the `VITE_API_URL` environment variable to override the default API URL.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Features Demo

1. **Service Status**: Real-time health checks for all microservices
2. **Load Generation**: Simulate CPU load to trigger auto-scaling
3. **Auto-Scaling Visualization**: Watch pods scale from 1-5 based on CPU usage
4. **API Testing**: Test all endpoints directly from the dashboard
5. **Live Monitoring**: Real-time charts and logs

This dashboard demonstrates a complete understanding of microservices architecture, DevOps practices, and modern frontend development.
