import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controller/tasksController.js';

const e = express;
const router = e.Router();
const tasksController = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

export default router;
