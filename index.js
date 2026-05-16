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
    origin: [
      'http://localhost:4200',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// ─── Static files ─────────────────────────────────────────────────────────────
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));

// ─── Database ─────────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Critical Error: MongoDB connection failed!', err);
    process.exit(1); 
  });

// ─── Swagger ──────────────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Restaurant API', version: '1.0.0' },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}`, description: 'Local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/modules/menu/routes/*.js',
    './src/modules/auth/routes/*.js',
    './src/modules/booking/routes/*.js',
    './src/modules/contact/routes/*.js',
    './src/modules/category/routes/*.js',
    './src/modules/dashboard/routes/*.js',
  ],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

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

// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, statusCode: 404, errorMessage: 'Not_found', cause: 'Route not found' });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use(globalErrorHandler);

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});