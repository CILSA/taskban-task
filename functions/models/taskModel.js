import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
    measurementId: process.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener tareas por ID del usuario
export const getTasksByUserId = async (userId) => {
    try {
        const tasksCollection = collection(db, 'tasks');
        const q = query(tasksCollection, where('tutorUser', '==', userId));
        const tasksSnapshot = await getDocs(q);
        const tasksList = tasksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return tasksList;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// Obtener tareas por ID del board
export const getTasksByBoardId = async (boardId) => {
    try {
        const tasksCollection = collection(db, 'tasks');
        const q = query(tasksCollection, where('boardId', '==', boardId));
        const tasksSnapshot = await getDocs(q);
        const tasksList = tasksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return tasksList;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// Obtener una tarea por ID
export const getTaskById = async (taskId) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        const taskSnapshot = await getDoc(taskRef);
        if (taskSnapshot.exists()) {
            return { id: taskSnapshot.id, ...taskSnapshot.data() };
        } else {
            console.log("Task not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
};

// Crear una nueva tarea
export const createTask = async (task) => {
    try {
        const tasksCollection = collection(db, 'tasks');
        const docRef = await addDoc(tasksCollection, task);
        return docRef.id;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

// Actualizar una tarea existente
export const updateTask = async (taskId, updatedTask) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, updatedTask);
        console.log(`Task with ID ${taskId} updated`);
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
        console.log(`Task with ID ${taskId} deleted`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
