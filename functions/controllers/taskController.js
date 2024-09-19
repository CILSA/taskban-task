import {
    getTasksByBoardId,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from "../models/taskModel.js";

// Obtener tareas por ID del tablero
export const fetchTasks = async (req, res) => {
    const { boardId } = req.query;

    if (!boardId) {
        return res.status(400).json({ message: "Board ID is required" });
    }

    try {
        const tasks = await getTasksByBoardId(boardId);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

// Obtener una tarea por ID
export const fetchTaskById = async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try {
        const task = await getTaskById(taskId);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Error fetching task" });
    }
};

// Crear una nueva tarea
export const addTask = async (req, res) => {
    const {
        name,
        description,
        boardId,
        columnId,
        createdUser,
        createdDate,
        userInvolved,
        tutorUser,
        status,
        points,
        estimatedStartDate,
        estimatedFinishDate
    } = req.body;

    if (!name || !description || !boardId || !createdUser || !createdDate) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    try {
        const taskId = await createTask(req.body);
        res.status(201).json({ message: "Task created", taskId });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task" });
    }
};

// Actualizar una tarea existente
export const updateTaskById = async (req, res) => {
    const { taskId } = req.params;
    const {
        name,
        description,
        columnId,
        userInvolved,
        tutorUser,
        status,
        points,
        estimatedStartDate,
        estimatedFinishDate
    } = req.body;

    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try {
        const updatedTask = {
            name,
            description,
            columnId,
            userInvolved,
            tutorUser,
            status,
            points,
            estimatedStartDate,
            estimatedFinishDate
        };

        // Filtrar campos no provistos
        Object.keys(updatedTask).forEach(key => updatedTask[key] === undefined && delete updatedTask[key]);

        await updateTask(taskId, updatedTask);
        res.status(200).json({ message: "Task updated" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
};

// Eliminar una tarea por ID
export const deleteTaskById = async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try {
        await deleteTask(taskId);
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Error deleting task" });
    }
};
