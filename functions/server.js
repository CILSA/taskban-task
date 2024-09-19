// functions/server.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { fetchTasks, addTask, fetchTaskById, updateTaskById, deleteTaskById } from "./controllers/taskController.js";

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Rutas de tareas
router.get("/tasks", fetchTasks); // Obtener tareas por boardId
router.post("/tasks", addTask); // Crear una nueva tarea
router.get("/tasks/:taskId", fetchTaskById); // Obtener una tarea por ID
router.put("/tasks/:taskId", updateTaskById); // Actualizar una tarea por ID
router.delete("/tasks/:taskId", deleteTaskById); // Eliminar una tarea por ID

// Registrar las rutas de tareas
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
