# Auto-Scaling Microservices Project

Production-ready microservices with auto-scaling, Docker, and Kubernetes.

## 🏗️ How It Works

- **3 Services**: Auth, User, Product (Node.js/Express)
- **API Gateway**: Routes `/auth/*`, `/users/*`, `/products/*` 
- **Auto-Scaling**: HPA scales 1-5 replicas at 50% CPU
- **Docker + K8s**: Container orchestration with health checks

## ✅ Quick Test

```bash
# 1. Individual service
cd services/auth-service && npm start
curl http://localhost:3000/  # JSON response

# 2. CPU load test
curl http://localhost:3000/load  # Generates load

# 3. Full stack
docker-compose up --build
curl http://localhost:3000/auth/  # Through gateway
```

## 🎯 Success Indicators

- ✅ JSON responses from all endpoints
- ✅ Docker containers start without errors  
- ✅ Gateway routes requests correctly
- ✅ CPU load triggers auto-scaling

## 🔧 Quick Fixes

- **Port 3000 conflict**: `taskkill /PID <PID> /F`
- **Docker not running**: Start Docker Desktop

## Architecture

```
auto-scale-microservices/
│
├── services/
│   ├── auth-service/     # Authentication microservice
│   ├── user-service/     # User management microservice
│   └── product-service/  # Product management microservice
│
├── gateway/              # API Gateway (Express + http-proxy-middleware)
├── k8s/                  # Kubernetes manifests
├── .github/workflows/    # CI/CD pipeline
└── docker-compose.yml    # Local development setup
```

## Services Overview

### Auth Service (Port 3000)
- **Health Check**: `GET /`
- **CPU Load Test**: `GET /load`
- **Login**: `POST /login`

### User Service (Port 3000)
- **Health Check**: `GET /`
- **CPU Load Test**: `GET /load`
- **Get Users**: `GET /users`
- **Get User**: `GET /users/:id`
- **Create User**: `POST /users`

### Product Service (Port 3000)
- **Health Check**: `GET /`
- **CPU Load Test**: `GET /load`
- **Get Products**: `GET /products`
- **Get Product**: `GET /products/:id`
- **Create Product**: `POST /products`

### API Gateway (Port 3000)
Routes requests to appropriate microservices:
- `/auth/*` → auth-service
- `/users/*` → user-service
- `/products/*` → product-service

## How It Works

### Architecture Overview

This microservices system demonstrates a complete production-ready setup with:

1. **Three Independent Services**: Auth, User, and Product services running on Node.js/Express
2. **API Gateway**: Single entry point that routes requests to appropriate services
3. **Auto-Scaling**: Horizontal Pod Autoscaler that scales services based on CPU usage
4. **Containerization**: Docker containers for all services
5. **Orchestration**: Kubernetes deployment with proper networking and health checks

### Service Communication Flow

```
Client Request → API Gateway → Microservice → Response
```

- **API Gateway** acts as the single entry point (port 3000)
- **Routes** requests based on URL paths:
  - `/auth/*` → auth-service
  - `/users/*` → user-service  
  - `/products/*` → product-service
- **Services** communicate internally via Kubernetes services or Docker networking

### Auto-Scaling Mechanism

- **HPA (Horizontal Pod Autoscaler)** monitors CPU usage
- **Target**: 50% CPU utilization
- **Scaling**: 1-5 replicas per service
- **Trigger**: High CPU load from `/load` endpoints

### Health Monitoring

Each service includes:
- **Liveness Probe**: Checks if service is running
- **Readiness Probe**: Checks if service is ready for traffic
- **Health Endpoint**: `GET /` returns service status
- **Logging**: Request logging middleware

## How to Check It's Working

### ✅ Step 1: Verify Individual Services

Start each service individually and test:

```bash
# Auth Service
cd services/auth-service
npm install && npm start
# Test: curl http://localhost:3000/
# Expected: {"service":"auth-service","status":"healthy",...}

# User Service  
cd ../user-service
npm install && npm start
# Test: curl http://localhost:3001/
# Expected: {"service":"user-service","status":"healthy",...}

# Product Service
cd ../product-service
npm install && npm start
# Test: curl http://localhost:3002/
# Expected: {"service":"product-service","status":"healthy",...}
```

### ✅ Step 2: Test CPU Load (Auto-Scaling Trigger)

```bash
# Test CPU load endpoint on any service
curl http://localhost:3000/load
# Expected: {"service":"auth-service","message":"CPU load test completed",...}
```

### ✅ Step 3: Verify Docker Compose (Full Stack)

```bash
cd ../../
docker-compose up --build
# Expected: All 4 services start successfully
```

Test through gateway:
```bash
# Gateway health
curl http://localhost:3000/
# Expected: {"service":"api-gateway","status":"healthy",...}

# Services through gateway
curl http://localhost:3000/auth/
curl http://localhost:3000/users/
curl http://localhost:3000/products/
# Expected: JSON responses from each service
```

### ✅ Step 4: Verify Kubernetes Deployment

```bash
kubectl apply -f k8s/
# Expected: "deployment", "service", "horizontalpodautoscaler" created

# Check all components
kubectl get pods
kubectl get services
kubectl get hpa
# Expected: All services running with proper replicas
```

### ✅ Step 5: Test Auto-Scaling in Kubernetes

```bash
# Generate load to trigger scaling
for i in {1..10}; do curl http://<node-ip>:30080/auth/load & done

# Watch HPA scale up
kubectl get hpa --watch
# Expected: Replicas increase from 1 to up to 5
```

### ✅ Step 6: Verify Business Logic

```bash
# Test authentication
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
# Expected: {"token":"mock-jwt-token","user":...}

# Test user management
curl http://localhost:3000/users/users
# Expected: Array of users

# Test product management  
curl http://localhost:3000/products/products
# Expected: Array of products
```

### 🎯 Success Indicators

**Working System Shows**:
- ✅ All services respond with JSON on health endpoints
- ✅ API Gateway routes requests correctly
- ✅ CPU load endpoints generate measurable load
- ✅ Docker containers build and run without errors
- ✅ Kubernetes pods start and become ready
- ✅ HPA scales pods under load
- ✅ Business logic endpoints return proper data

**Common Issues & Fixes**:
- **Port 3000 conflict**: Kill processes with `taskkill /PID <PID> /F`
- **Docker not running**: Start Docker Desktop
- **Service not accessible**: Check firewall and port binding
- **Kubernetes HPA not working**: Ensure metrics-server is installed

## Quick Start

### Local Development with Docker Compose

1. **Clone and navigate to the project:**
   ```bash
   cd auto-scale-microservices
   ```

2. **Run all services:**
   ```bash
   docker-compose up --build
   ```

3. **Test the services:**
   ```bash
   # Gateway health check
   curl http://localhost:3000/
   
   # Auth service through gateway
   curl http://localhost:3000/auth/
   
   # User service through gateway
   curl http://localhost:3000/auth/users
   
   # Product service through gateway
   curl http://localhost:3000/products/
   ```

4. **Test auto-scaling (CPU load):**
   ```bash
   # Generate CPU load on auth service
   curl http://localhost:3000/auth/load
   
   # Generate CPU load on user service
   curl http://localhost:3000/users/load
   
   # Generate CPU load on product service
   curl http://localhost:3000/products/load
   ```

### Kubernetes Deployment

1. **Prerequisites:**
   - Kubernetes cluster with metrics-server installed
   - kubectl configured
   - Docker Hub account

2. **Update Docker Hub username:**
   Replace `yourusername` in all Kubernetes YAML files with your Docker Hub username.

3. **Deploy to Kubernetes:**
   ```bash
   kubectl apply -f k8s/
   ```

4. **Verify deployment:**
   ```bash
   kubectl get pods
   kubectl get services
   kubectl get hpa
   ```

5. **Test the gateway (NodePort):**
   ```bash
   # Get node port
   kubectl get service api-gateway
   
   # Test gateway
   curl http://<node-ip>:30080/
   ```

## Auto-Scaling Configuration

### Horizontal Pod Autoscaler (HPA)
- **Target CPU Utilization**: 50%
- **Min Replicas**: 1
- **Max Replicas**: 5
- **Services with HPA**: All microservices + gateway

### Testing Auto-Scaling
```bash
# Monitor HPA in real-time
kubectl get hpa --watch

# Generate load to trigger scaling
for i in {1..10}; do curl http://localhost:3000/auth/load & done
```

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. **Tests** all services on every push/PR
2. **Builds and pushes** Docker images to Docker Hub
3. **Deploys** to Kubernetes on main branch push

### Required Secrets
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token
- `KUBE_CONFIG`: Base64-encoded kubeconfig file

## API Examples

### Authentication
```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### User Management
```bash
# Get all users
curl http://localhost:3000/users/users

# Create user
curl -X POST http://localhost:3000/users/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Product Management
```bash
# Get all products
curl http://localhost:3000/products/products

# Create product
curl -X POST http://localhost:3000/products/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99,"category":"Electronics"}'
```

## Monitoring and Health Checks

### Health Endpoints
All services expose health check endpoints:
```bash
curl http://localhost:3000/  # Gateway
curl http://localhost:3000/auth/  # Auth service
curl http://localhost:3000/users/  # User service
curl http://localhost:3000/products/  # Product service
```

### Kubernetes Probes
- **Liveness Probe**: Checks if service is running
- **Readiness Probe**: Checks if service is ready to accept traffic
- **Initial Delay**: 30s (liveness), 5s (readiness)
- **Period**: 10s (liveness), 5s (readiness)

## Development

### Running Individual Services
```bash
# Auth service
cd services/auth-service
npm install
npm start

# User service
cd services/user-service
npm install
npm start

# Product service
cd services/product-service
npm install
npm start

# Gateway
cd gateway
npm install
npm start
```

### Environment Variables
- `PORT`: Service port (default: 3000)
- `AUTH_SERVICE_URL`: Auth service URL (gateway only)
- `USER_SERVICE_URL`: User service URL (gateway only)
- `PRODUCT_SERVICE_URL`: Product service URL (gateway only)

## Production Considerations

### Security
- Use HTTPS in production
- Implement proper authentication/authorization
- Use secrets management for sensitive data
- Enable network policies in Kubernetes

### Performance
- Configure appropriate resource limits/requests
- Use horizontal pod autoscaling
- Implement caching where appropriate
- Monitor and log performance metrics

### Reliability
- Implement circuit breakers
- Use retry mechanisms
- Configure proper health checks
- Set up monitoring and alerting

## Troubleshooting

### Common Issues

1. **Services not communicating:**
   - Check network policies
   - Verify service names in Kubernetes
   - Check environment variables

2. **HPA not working:**
   - Ensure metrics-server is installed
   - Check resource requests/limits
   - Verify HPA configuration

3. **Docker build failures:**
   - Check Dockerfile syntax
   - Verify base images
   - Check network connectivity

### Logs
```bash
# Docker Compose logs
docker-compose logs -f [service-name]

# Kubernetes logs
kubectl logs -f deployment/[service-name]
kubectl logs -f deployment/api-gateway
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
