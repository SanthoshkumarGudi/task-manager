import { useState } from "react";
import { Container, Button, Grid, Typography } from "@mui/material";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsFormOpen(true)}
            style={{ marginBottom: "10px" }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>

      {isFormOpen && (
        <div style={{ marginBottom: "20px" }}>
          <TaskForm onClose={() => setIsFormOpen(false)} />
        </div>
      )}

      <TaskList />
    </Container>
  );
};

export default Dashboard;
