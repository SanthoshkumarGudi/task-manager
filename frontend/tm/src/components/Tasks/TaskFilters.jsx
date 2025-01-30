import { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const TaskFilters = ({ setFilteredTasks }) => {
  const { tasks } = useContext(TaskContext);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleFilterChange = () => {
    let filtered = tasks;

    if (status) {
      filtered = filtered.filter((task) => task.status === status);
    }

    if (priority) {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    setFilteredTasks(filtered);
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: "20px" }}>
      <Grid item xs={6} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleFilterChange();
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              handleFilterChange();
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TaskFilters;
