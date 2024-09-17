// Importa Firebase y Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

// Configura Firebase (usa tu propia configuración obtenida de Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCx8GI5km0guJojFuOb9KDKNSclqFQBhLI",
    authDomain: "taskban-v1.firebaseapp.com",
    projectId: "taskban-v1",
    storageBucket: "taskban-v1.appspot.com",
    messagingSenderId: "774075443466",
    appId: "1:774075443466:web:0b1ccf90595264ef8872f3",
    measurementId: "G-1MCX6F9W86"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
        console.error("Error al obtener las tareas:", error);
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
            console.log("No se encontró la tarea con ese ID");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener la tarea:", error);
        throw error;
    }
};

// Crear una nueva tarea
export const createTask = async (task) => {
    try {
        const tasksCollection = collection(db, 'tasks');
        const docRef = await addDoc(tasksCollection, task);
        return docRef.id; // Devuelve el ID generado por Firestore
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    }
};

// Actualizar una tarea existente
export const updateTask = async (taskId, updatedTask) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc(taskRef, updatedTask);
        console.log(`Tarea con ID ${taskId} actualizada`);
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        throw error;
    }
};

// Eliminar una tarea
export const deleteTask = async (taskId) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
        console.log(`Tarea con ID ${taskId} eliminada`);
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        throw error;
    }
};
