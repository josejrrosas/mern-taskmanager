import express from "express";
import { getAllTasks, createTask, getTaskByID, updateTask, deleteTask } from "../controllers/tasksController.js";
const router = express.Router();
import { validateBody, validateQuery } from '../middleware/validate.js'
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from '../validation/taskSchema.js'


router.get('/api/tasks', validateQuery(listTasksQuerySchema), getAllTasks);
router.post('/api/tasks', validateBody(createTaskSchema), createTask);
router.get('/api/tasks/:id', getTaskByID);
router.put('/api/tasks/:id', validateBody(updateTaskSchema),  updateTask);
router.delete('/api/tasks/:id',  deleteTask);

export default router;
