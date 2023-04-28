import React, { useState, useEffect } from "react";
import { Form } from "./components/form";
import { Filters } from "./components/filters";
import { Task } from "./components/task";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (newTask) => {
    if (newTask.trim() !== "") {
      const id = Date.now().toString();
      const updatedTasks = [...tasks, { id, task: newTask, completed: false }];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }else{
      alert("Please, enter a task")
    }
  };

  const handleEditTask = (taskToEdit, editedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskToEdit.id) {
        return {
          ...task,
          task: editedTask,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggleTask = (taskToToggle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskToToggle.id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
  };

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  let filteredTasks = tasks;
  if (activeFilter === "Active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (activeFilter === "Completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  return (
    <div className="App">
      <Form onSubmit={handleAddTask} />
      <Filters tasks={tasks} onFilter={handleFilter} activeFilter={activeFilter} />
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          completed={task.completed}
          isEditing={editingTaskId === task.id}
          onEdit={() => setEditingTaskId(task.id)}
          onCancelEdit={() => setEditingTaskId(null)}
          onDelete={() => handleDeleteTask(task.id)}
          onToggle={() => handleToggleTask(task)}
          onEditSubmit={handleEditTask}
        />
      ))}
    </div>
  );
}

export default App