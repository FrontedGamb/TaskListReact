import React, { useState, useEffect } from "react";
import "../styles/filters.css";

const Filters = ({ tasks, onFilter, activeFilter }) => {
  const [remainingTasks, setRemainingTasks] = useState(0);

  useEffect(() => {
    const remaining = tasks.filter((task) => !task.completed);
    setRemainingTasks(remaining.length);
  }, [tasks]);

  const handleFilter = (filter) => {
    onFilter(filter);
  };

  return (
    <div>
      <div className="btns-filters">
        <button
          className={activeFilter === "All" ? "active" : ""}
          onClick={() => handleFilter("All")}
        >
          All
        </button>
        <button
          className={activeFilter === "Active" ? "active" : ""}
          onClick={() => handleFilter("Active")}
        >
          Active
        </button>
        <button
          className={activeFilter === "Completed" ? "active" : ""}
          onClick={() => handleFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <div className="remaining-task">
        <p>{remainingTasks} task remaining</p>
      </div>
    </div>
  );
};

export { Filters };