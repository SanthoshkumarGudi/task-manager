import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import TaskFilters from "../components/Tasks/TaskFilters";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <TaskFilters />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ alignSelf: "center" }}
        >
          Add Task
        </Button>
      </div>
      <TaskList />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "400px",
          }}
        >
          <TaskForm onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
