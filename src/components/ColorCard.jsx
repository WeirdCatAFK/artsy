// ColorCard.jsx
import React from "react";

function ColorCard({ color, draggable, onDragStart, onDrop, onDragOver }) {
  const style = {
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    width: "100px",
    height: "100px",
    margin: "10px",
    border: "1px solid #000",
    cursor: draggable ? "move" : "default",
  };

  return (
    <div className="color-card"
      style={style}
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    />
  );
}

export default ColorCard;
