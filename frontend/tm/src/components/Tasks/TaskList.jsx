import React, { useEffect, useContext } from "react";
import TaskContext from "../Auth/context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, fetchTasks, filters } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, [fetchTasks]);

  // Apply both status and priority filters
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filters.status ? task.status === filters.status : true;
    const matchesPriority = filters.priority ? task.priority === filters.priority : true;
    return matchesStatus && matchesPriority; // Match both conditions
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p>No tasks match the selected filters. Add some tasks or adjust your filters!</p>
      )}
    </div>
  );
};

export default TaskList;
