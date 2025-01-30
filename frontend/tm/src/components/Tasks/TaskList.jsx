import { useContext, useState } from "react";
import TaskContext from "../../context/TaskContext";
import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";
import { Grid } from "@mui/material";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  return (
    <div>
      <TaskFilters setFilteredTasks={setFilteredTasks} />
      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;
