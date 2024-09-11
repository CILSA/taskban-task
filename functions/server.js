import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();
app.use(cors());

const router = express.Router();

// Mock data para tareas
const tasks = [
  { id: 1, title: "Task 1", boardId: 1, description: "Task 1 Description" },
  { id: 2, title: "Task 2", boardId: 1, description: "Task 2 Description" },
  { id: 3, title: "Task 3", boardId: 2, description: "Task 3 Description" },
  { id: 4, title: "Task 4", boardId: 3, description: "Task 4 Description" },
];

// Ruta para obtener las tareas por ID del tablero
router.get("/tasks", (req, res) => {
  const { boardId } = req.query;

  // Validar si boardId fue enviado
  if (!boardId) {
    return res.status(400).json({ message: "Board ID is required" });
  }

  // Filtrar las tareas según el ID del tablero
  const boardTasks = tasks.filter((task) => task.boardId === Number(boardId));
  res.json(boardTasks);
});

// Registrar el router
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
