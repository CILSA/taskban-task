// functions/server.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { fetchTasks, addTask } from "./controllers/taskController.js";

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();


router.get("/tasks", fetchTasks);
router.post("/tasks", addTask);
// Registrar las rutas de tareas
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);