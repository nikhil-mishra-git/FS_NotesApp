const express = require('express');
const router = express.Router();
const {createTask,readTask,editTask,updateTask,deleteTask} = require('../controller/task.controller')


// Create Task 
router.post("/create", createTask);

// Read a File
router.get("/read/:fileName", readTask);

// Edit a File - Show Edit Page
router.get("/edit/:fileName", editTask);

// Update a File - Save Edits
router.post("/update/:fileName", updateTask);

// Delete Task
router.get("/delete/:fileName", deleteTask);

module.exports = router;