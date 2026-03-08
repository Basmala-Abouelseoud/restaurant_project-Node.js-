import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import menuRoutes from './modules/menu/index.js';
import authRoutes from './modules/auth/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bookingRoutes from './modules/booking/index.js'; 
import contactRoutes from './modules/contact/index.js'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Restaurant API", version: "1.0.0" },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {          
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  
  apis: ["./modules/menu/routes/*.js", "./modules/auth/routes/*.js", "./modules/booking/routes/*.js","./modules/contact/routes/*.js" ],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/', menuRoutes);
app.use('/', authRoutes);
app.use('/', bookingRoutes);
app.use('/', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});