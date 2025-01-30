import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", taskData, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) => [...prevTasks, res.data]);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedData, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? res.data : task))
      );
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: token },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
