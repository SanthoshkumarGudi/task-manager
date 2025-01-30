const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/tasks - Fetch all tasks for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Server error. Could not fetch tasks." });
  }
});

// POST /api/tasks - Create a new task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: "Title and Due Date are required" });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status: status || "pending",
      priority: priority || "medium",
      dueDate,
      user: req.user.id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Server error. Could not create task." });
  }
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Server error. Could not update task." });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const taskId = req.params.id; // Get task ID from URL
      console.log("Task ID to delete:", taskId); // Log task ID
  
      // Find the task by ID
      const task = await Task.findById(taskId);
  
      // Check if task exists
      if (!task) {
        console.error("Task not found");
        return res.status(404).json({ error: "Task not found" });
      }
  
      // Check if the user owns the task
      if (task.user.toString() !== req.user.id) {
        console.error("Unauthorized user");
        return res.status(403).json({ error: "Unauthorized to delete this task" });
      }
  
      // Use deleteOne() to delete the task
      await Task.deleteOne({ _id: taskId });
      console.log("Task deleted successfully");
      res.json({ message: "Task deleted successfully" });
    } catch (err) {
      console.error("Error during task deletion:", err); // Log the error
      res.status(500).json({ error: "Server error. Could not delete task." });
    }
  });
  
  

module.exports = router;
