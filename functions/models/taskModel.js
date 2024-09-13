// src/models/taskModel.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Configuración de la base de datos SQLite
const dbPromise = open({
    filename: './functions/database.sqlite',
    driver: sqlite3.Database
});

// Crear la tabla si no existe
const createTable = async () => {
    const db = await dbPromise;
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Tarea (
            TareaId INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            fechaCreacion TEXT NOT NULL,
            fechaVencimiento TEXT,
            boardId INTEGER NOT NULL
        )
    `);
};

// Función para obtener las tareas por ID del tablero
export const getTasksByBoardId = async (boardId) => {
    const db = await dbPromise;
    await createTable(); // Asegurarse de que la tabla exista
    const rows = await db.all(
        'SELECT TareaId, titulo, descripcion, fechaCreacion, fechaVencimiento FROM Tarea WHERE boardId = ?',
        [boardId]
    );
    return rows;
};

// Función para crear una tarea
export const createTask = async (task) => {
    const { titulo, descripcion, fechaCreacion, fechaVencimiento, boardId } = task;
    const db = await dbPromise;
    await createTable(); // Asegurarse de que la tabla exista
    const result = await db.run(
        'INSERT INTO Tarea (titulo, descripcion, fechaCreacion, fechaVencimiento, boardId) VALUES (?, ?, ?, ?, ?)',
        [titulo, descripcion, fechaCreacion, fechaVencimiento, boardId]
    );
    return result.lastID;
};
