import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import globalErrorHandler from './src/middleware/globalErrorHandler.js';

import menuRoutes from './src/modules/menu/index.js';
import authRoutes from './src/modules/auth/index.js';
import bookingRoutes from './src/modules/booking/index.js';
import contactRoutes from './src/modules/contact/index.js';
import categoryRoutes from './src/modules/category/index.js';
import dashboardRoutes from './src/modules/dashboard/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// ─── Static files ─────────────────────────────────────────────────────────────
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));

// ─── Database ────────────────────────────────────────────
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.DATABASE_URL);
  isConnected = true;
  console.log('Connected to MongoDB');
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, errorMessage: 'Database connection failed' });
  }
});

// ─── Swagger ──────────────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Restaurant API', version: '1.0.0' },
    servers: [{ url: 'https://restaurant-project-node-js.vercel.app/api' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
apis: [
    path.join(__dirname, './src/modules/menu/routes/*.js'),
    path.join(__dirname, './src/modules/auth/routes/*.js'),
    path.join(__dirname, './src/modules/booking/routes/*.js'),
    path.join(__dirname, './src/modules/contact/routes/*.js'),
    path.join(__dirname, './src/modules/category/routes/*.js'),
    path.join(__dirname, './src/modules/dashboard/routes/*.js'),
  ],
};

app.use('/api-docs', (req, res, next) => {
  res.setHeader('Content-Security-Policy', '');
  next();
});

const swaggerOptionsCustom = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
  ]
};

app.use(
  '/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerJsdoc(swaggerOptions), swaggerOptionsCustom)
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', menuRoutes);
app.use('/api', authRoutes);
app.use('/api', bookingRoutes);
app.use('/api', contactRoutes);
app.use('/api', categoryRoutes);
app.use('/api', dashboardRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health-check', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, statusCode: 404, errorMessage: 'Route not found' });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use(globalErrorHandler);

export default app;