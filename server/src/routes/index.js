import express from "express";
import { getAllTasks, createTask, getTaskByID, updateTask, deleteTask } from "../controllers/tasksController.js";
const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTaskByID);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
