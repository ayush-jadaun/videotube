import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser";
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/error.middlewares.js";


dotenv.config();

const app = express();
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", 
  credentials: true, 
};

app.use(cors(corsOptions));

// Common middleware (uncomment if needed)
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/users", userRouter)
app.use(errorHandler)

export { app };
