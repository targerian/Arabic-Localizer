import React from "react";
import { SpinnerCircular } from "spinners-react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container d-flex justify-content-center align-items-center">
      <SpinnerCircular
        size={120}
        thickness={100}
        speed={500}
        color="#23aaeb"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    </div>
  );
};

export default Spinner;
