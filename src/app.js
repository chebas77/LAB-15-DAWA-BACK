const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const authRouter = require('./routes/auth');

const app = express();

// Configurar CORS para permitir peticiones desde el frontend
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://127.0.0.1:3000',
  'https://lab-15-dawa-front.vercel.app',
  'https://lab-15-dawa-front-*.vercel.app' // Para preview deployments de Vercel
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir peticiones sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    // Verificar si el origin está en la lista permitida o es un deployment de Vercel
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  maxAge: 86400 // 24 horas
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware para desarrollo
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'API E-commerce funcionando',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories'
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Ruta no encontrada',
    path: req.path
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;
