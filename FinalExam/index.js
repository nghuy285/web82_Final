import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors';


dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,  
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));
const POST = process.env.PORT || 3000;
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
  
app.listen(POST, () => {
  console.log(`Server is running on port ${POST}`);
});
