import React, { useState } from "react";

function Input({ value, handleSubmit , ...props}) {
  const [newItem, setNewItem] = useState(value? value : "");

  const handleInputChange = (e) => setNewItem(e.target.value);

  const handleOuterSubmit = () => {
    handleSubmit(newItem.trim());
    setNewItem("");
  };
  return (
    <input
      type="text"
      value={newItem}
      autoFocus
      onChange={handleInputChange}
      onBlur={handleOuterSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleOuterSubmit();
      }}
      {... props}
    />
  );
}

export default Input;
