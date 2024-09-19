import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

// Configura Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

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
