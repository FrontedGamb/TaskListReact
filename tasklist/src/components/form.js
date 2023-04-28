import React, { useState } from "react";
import "../styles/form.css";

const Form = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    onSubmit(value);
    setValue("");
  };

  return (
    <div className="form">
      <h3>What needs to be done?</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export { Form};