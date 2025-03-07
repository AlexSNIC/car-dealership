import Input from "./Input";
import { useState } from "react";

export default function ClickInput({ value, handleSubmit, ...props }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleOuterSubmit = (value) => {
    if(value)
      handleSubmit(value);
    setIsEditing(false);
  }
  return (
    <li className="database__item">
      {isEditing ? (
        <Input
          handleSubmit={handleOuterSubmit}
          {...props}
          value={value}
        />
      ) : (
        <div className="full-size" onClick={() => setIsEditing(true)}>
          +
        </div>
      )}
    </li>
  );
}