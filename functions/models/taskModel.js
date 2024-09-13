import { log } from 'console';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('functions', 'tasks.json');

// Cargar tareas desde el archivo JSON
const loadTasks = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("no existe");

            return [];
        }
        throw error;
    }
};

// Guardar tareas en el archivo JSON
const saveTasks = async (tasks) => {
    const data = JSON.stringify(tasks, null, 2);
    await fs.writeFile(filePath, data, 'utf-8');
};

// Obtener tareas por ID del tablero
export const getTasksByBoardId = async (boardId) => {
    const tasks = await loadTasks();
    return tasks.filter(task => task.boardId === boardId);
};

// Crear una nueva tarea
export const createTask = async (task) => {
    const tasks = await loadTasks();
    const newTask = {
        ...task,
        TareaId: tasks.length ? tasks[tasks.length - 1].TareaId + 1 : 1,
    };
    tasks.push(newTask);
    await saveTasks(tasks);
    return newTask.TareaId;
};
