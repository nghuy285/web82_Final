import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
