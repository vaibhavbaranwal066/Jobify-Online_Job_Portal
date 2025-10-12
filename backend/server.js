import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';

// File Imports
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// DOTENV config
dotenv.config();

// MongoDB connection
connectDB();

// Rest Object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobsRoutes);

// Validation middleware
app.use(errorMiddleware);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Node Server running in ${process.env.DEV_MODE} mode on port ${PORT}`);
});