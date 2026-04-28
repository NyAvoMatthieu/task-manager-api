const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

// Routes principales
router
  .route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

// Routes avec ID
router
  .route('/:id')
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;