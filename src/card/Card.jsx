import React from "react";
import "./Card.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Card = ({ name, img, role, attendance, department }) => {
  return (
    <div className='hr-card-container'>
      <div className='card-img-options'>
        <img className='hr-card-img' src={img} alt='client' />
        <div className='image-options-container'>
          <MdModeEditOutline className='img-options' />
          <MdPauseCircleOutline className='img-options' />
          <MdDeleteForever className='img-options' />
        </div>
      </div>
      <div className='card-info'>
        <h1>{name}</h1>
        <h2>{role}</h2>
        <h3>{department}</h3>
        <div className={`attendance-statue ${attendance}`}>{attendance}</div>
      </div>
    </div>
  );
};

export default Card;
