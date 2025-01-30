import { createContext, useState, useCallback } from "react";
import axios from "axios";

const TaskContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "" }); // Filters state
  const token = localStorage.getItem("token");

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(API_BASE_URL+"/api/tasks", taskData, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) => [...prevTasks, res.data]); // Add the new task to the state
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Failed to save task.");
    }
  };
  

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(API_BASE_URL+"/api/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
      alert("Failed to fetch tasks.");
    }
  }, [token]);

  const editTask = async (taskId, updatedData) => {
    try {
      await axios.put(`${API_BASE_URL}/api/tasks/${taskId}`, updatedData, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
      alert("Failed to update the task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
      alert("Failed to delete the task.");
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, editTask, deleteTask, filters, setFilters }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
