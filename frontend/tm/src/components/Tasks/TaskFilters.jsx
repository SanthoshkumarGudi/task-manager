import React, { useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from "@mui/material";
import TaskContext from "../Auth/context/TaskContext";

const TaskFilters = () => {
  const { filters, setFilters } = useContext(TaskContext);

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setFilters((prev) => ({ ...prev, priority: e.target.value }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        Filter Tasks:
      </Typography>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select value={filters.status} onChange={handleStatusChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="open">Completed</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Priority</InputLabel>
        <Select value={filters.priority} onChange={handlePriorityChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaskFilters;
