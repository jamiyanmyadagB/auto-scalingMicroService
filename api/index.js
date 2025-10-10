const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

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
      '/auth': 'auth-service',
      '/users': 'user-service',
      '/products': 'product-service'
    }
  });
});

// Service URLs for Vercel deployment
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'https://auto-scaling-microservice-auth.vercel.app';
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'https://auto-scaling-microservice-user.vercel.app';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || 'https://auto-scaling-microservice-product.vercel.app';

// Proxy middleware options
const proxyOptions = {
  changeOrigin: true,
  logLevel: 'warn',
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(503).json({
      error: 'Service unavailable',
      message: 'The requested service is currently unavailable'
    });
  }
};

// Proxy routes
app.use('/auth', createProxyMiddleware({
  target: AUTH_SERVICE_URL,
  pathRewrite: {
    '^/auth': '',
  },
  ...proxyOptions
}));

app.use('/users', createProxyMiddleware({
  target: USER_SERVICE_URL,
  pathRewrite: {
    '^/users': '',
  },
  ...proxyOptions
}));

app.use('/products', createProxyMiddleware({
  target: PRODUCT_SERVICE_URL,
  pathRewrite: {
    '^/products': '',
  },
  ...proxyOptions
}));

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
    availableRoutes: ['/auth', '/users', '/products']
  });
});

module.exports = app;
