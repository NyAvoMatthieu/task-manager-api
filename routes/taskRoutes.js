const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

const validateTask = require('../middlewares/validateTask');

// Routes principales
// router
//   .route('/')
//   .get(taskController.getTasks)
//   .post(taskController.createTask);

// // Routes avec ID
// router
//   .route('/:id')
//   .put(taskController.updateTask)
//   .delete(taskController.deleteTask);


router
  .route('/')
  .get(taskController.getTasks)
  .post(validateTask, taskController.createTask);

router
  .route('/:id')
  .put(validateTask, taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;