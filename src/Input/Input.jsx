import React from "react";
import "./Input.css";

const Input = ({ type, placeHolder, id, label, value, onChange, name }) => {
  return (
    <div className='input-container'>
      <input
        autocomplete='off'
        className={type}
        type={type}
        placeholder={placeHolder}
        id={id}
        value={value}
        onChange={onChange}
        name={name}
      />
      <label class='label' for={id}>
        {label}
      </label>
    </div>
  );
};

export default Input;
