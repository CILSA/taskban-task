// controllers/taskController.js
import { getTasksByBoardId, createTask } from "../models/taskModel.js";

export const fetchTasks = async (req, res) => {
    const { boardId } = req.query;

    if (!boardId) {
        return res.status(400).json({ message: "Board ID is required" });
    }

    try {
        // Convertir boardId a número si es necesario
        const tasks = await getTasksByBoardId(parseInt(boardId, 10));
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

export const addTask = async (req, res) => {
    const { titulo, descripcion, fechaCreacion, fechaVencimiento, boardId } = req.body;

    if (!titulo || !descripcion || !fechaCreacion || !boardId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const taskId = await createTask(req.body);
        res.status(201).json({ message: "Task created", taskId });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task" });
    }
};
