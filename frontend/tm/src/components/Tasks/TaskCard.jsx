import React, { useContext, useState } from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import TaskContext from "../../context/TaskContext";
import TaskForm from "./TaskForm";

const TaskCard = ({ task }) => {
  const { deleteTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task._id); // Call deleteTask function with the task ID
    }
  };

  return (
    <Card
      style={{
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "10px",
      }}
    >
      {isEditing ? (
        <TaskForm taskToEdit={task} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <CardContent>
            <Typography variant="h6" component="h2">
              {task.title}
            </Typography>
            <Typography color="textSecondary" style={{ margin: "10px 0" }}>
              {task.description || "No description provided"}
            </Typography>
            <Typography>Status: {task.status}</Typography>
            <Typography>Priority: {task.priority}</Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ marginLeft: "10px" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default TaskCard;
