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
    service: 'api-gateway',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3000,
    routes: {
      '/api/auth': 'auth-service',
      '/api/users': 'user-service',
      '/api/products': 'product-service'
    }
  });
});

// Auth Service Routes
app.get('/auth/', (req, res) => {
  res.json({
    service: 'auth-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: 3000
  });
});

app.get('/auth/load', (req, res) => {
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

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password required'
    });
  }
  
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

// User Service Routes
app.get('/users/', (req, res) => {
  res.json({
    service: 'user-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: 3000
  });
});

app.get('/users/load', (req, res) => {
  const iterations = 100000000;
  let result = 0;
  
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i);
  }
  
  res.json({
    service: 'user-service',
    message: 'CPU load test completed',
    iterations: iterations,
    result: result,
    timestamp: new Date().toISOString()
  });
});

app.get('/users/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.json({
    users: users,
    total: users.length,
    service: 'user-service'
  });
});

app.get('/users/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json({
      user: user,
      service: 'user-service'
    });
  } else {
    res.status(404).json({
      error: 'User not found',
      service: 'user-service'
    });
  }
});

app.post('/users/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  res.status(201).json({
    user: newUser,
    message: 'User created successfully',
    service: 'user-service'
  });
});

// Product Service Routes
app.get('/products/', (req, res) => {
  res.json({
    service: 'product-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: 3000
  });
});

app.get('/products/load', (req, res) => {
  const iterations = 100000000;
  let result = 0;
  
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i);
  }
  
  res.json({
    service: 'product-service',
    message: 'CPU load test completed',
    iterations: iterations,
    result: result,
    timestamp: new Date().toISOString()
  });
});

app.get('/products/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 199.99, category: 'Audio' },
    { id: 4, name: 'Mouse', price: 29.99, category: 'Accessories' }
  ];
  
  res.json({
    products: products,
    total: products.length,
    service: 'product-service'
  });
});

app.get('/products/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 199.99, category: 'Audio' },
    { id: 4, name: 'Mouse', price: 29.99, category: 'Accessories' }
  ];
  
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json({
      product: product,
      service: 'product-service'
    });
  } else {
    res.status(404).json({
      error: 'Product not found',
      service: 'product-service'
    });
  }
});

app.post('/products/products', (req, res) => {
  const { name, price, category } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({
      error: 'Name, price, and category are required'
    });
  }
  
  const newProduct = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    category
  };
  
  res.status(201).json({
    product: newProduct,
    message: 'Product created successfully',
    service: 'product-service'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Gateway error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'api-gateway'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested route does not exist',
    availableRoutes: ['/api/auth', '/api/users', '/api/products']
  });
});

module.exports = app;
