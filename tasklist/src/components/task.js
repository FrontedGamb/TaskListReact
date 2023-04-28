import React, { useState } from "react";
import "../styles/task.css";

function Task({ task, onEditSubmit, onDelete, onToggle }) {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleToggle = () => {
    onToggle(task);
  };

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleSubmit = () => {
    if (editedTask.trim() === "") {
      alert("Please enter a task!");
      return;
    }
    onEditSubmit(task, editedTask);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div className="input-task">
        <input
          type="checkbox"
          className="chk-input"
          checked={task.completed}
          onChange={handleToggle}
        />
        {editing ? (
          <div className="editing-input">
            <input
              type="text"
              value={editedTask}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit}>Save</button>
          </div>
        ) : (
          <p>{task.task}</p>
        )}
      </div>
      <div className="btns-taks">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export { Task };