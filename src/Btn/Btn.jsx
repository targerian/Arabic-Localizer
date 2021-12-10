import React from "react";
import { Link } from "react-router-dom";
import "./Btn.css";

const Btn = ({ to, children, color, onClick, required }) => {
  function pickColor(color) {
    if (color === "green") {
      return "green";
    } else if (color === "weekend") {
      return "weekend";
    }
  }
  return (
    <Link to={to}>
      <button
        onClick={onClick}
        className={`btn-container ${pickColor(color)}`}
        required={required}
      >
        {children}
      </button>
    </Link>
  );
};

export default Btn;
