/** @format */
import dotenv from "dotenv";
dotenv.config(); // doit être au tout début !

import express from "express";
import cors from "cors";


const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from "./routes/auth.route.js";
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`✅ Serveur en ligne : http://localhost:${port}`);
});
