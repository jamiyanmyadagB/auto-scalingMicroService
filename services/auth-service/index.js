const express = require('express');
const app = express();

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'auth-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000
  });
});

// CPU load simulation endpoint
app.get('/load', (req, res) => {
  const iterations = 100000000;
  let result = 0;
  
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i);
  }
  
  res.json({
    service: 'auth-service',
    message: 'CPU load test completed',
    iterations: iterations,
    result: result,
    timestamp: new Date().toISOString()
  });
});

// Auth endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password required'
    });
  }
  
  // Mock authentication
  if (username === 'admin' && password === 'password') {
    res.json({
      token: 'mock-jwt-token',
      user: { username, role: 'admin' },
      message: 'Authentication successful'
    });
  } else {
    res.status(401).json({
      error: 'Invalid credentials'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'auth-service'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth service running on port ${PORT}`);
});
