import {
    getTasksByBoardId,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from "../models/taskModel.js";

// Obtener tareas por ID del tablero
export const fetchTasks = async (req, res) => {
    const { boardId } = req.query; // Obteniendo el boardId de los query params

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
        estimatedFinishDate,
        userAssigned // Nuevo campo para el usuario asignado
    } = req.body;

    // Validación de los campos obligatorios
    if (!name || !description || !boardId || !createdUser || !createdDate) {
        return res.status(400).json({ message: "All required fields must be filled" });
    }

    try {
        const newTask = {
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
            estimatedFinishDate,
            userAssigned // Incluir el usuario asignado en la nueva tarea
        };

        const taskId = await createTask(newTask);
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
        estimatedFinishDate,
        userAssigned // Nuevo campo para el usuario asignado
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
            estimatedFinishDate,
            userAssigned // Incluir el usuario asignado en la tarea actualizada
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
