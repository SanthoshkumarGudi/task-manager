
import axios from "axios";

import { useState, useContext, useEffect } from "react";
import TaskContext from "../../context/TaskContext";
import AuthContext from "../../context/AuthContext";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const TaskForm = ({ taskToEdit, onClose }) => {
  const { fetchTasks, editTask } = useContext(TaskContext);
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : "");
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : "pending");
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : "medium");
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate.split("T")[0] : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, status, priority, dueDate };

    try {
      if (taskToEdit) {
        await editTask(taskToEdit._id, taskData); // Update task
      } else {
        await axios.post("http://localhost:5000/api/tasks", taskData, {
          headers: { Authorization: token },
        }); // Create new task
        fetchTasks();
      }

      onClose();
    } catch (error) {
      console.error("Error saving task:", error.response.data);
      alert("Failed to save task. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Priority</InputLabel>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>

      <TextField type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

      <Button variant="contained" color="primary" type="submit">
        {taskToEdit ? "Update Task" : "Add Task"}
      </Button>
    </form>
  );
};

export default TaskForm;