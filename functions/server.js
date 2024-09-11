// functions/server.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import taskRoutes from "./routes/taskRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

// Registrar las rutas de tareas
app.use('/.netlify/functions/server', taskRoutes);

export const handler = serverless(app);