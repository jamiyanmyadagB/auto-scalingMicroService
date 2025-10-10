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
    service: 'product-service',
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
    service: 'product-service',
    message: 'CPU load test completed',
    iterations: iterations,
    result: result,
    timestamp: new Date().toISOString()
  });
});

// Get all products
app.get('/products', (req, res) => {
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

// Get product by ID
app.get('/products/:id', (req, res) => {
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

// Create product
app.post('/products', (req, res) => {
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
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'product-service'
  });
});

module.exports = app;
