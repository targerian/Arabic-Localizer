import React from "react";
import "./Card.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Card = ({ name, img, role, attendance, department, handleDelete }) => {
  return (
    <div className='hr-card-container'>
      <div className='card-img-options'>
        <img className='hr-card-img' src={img} alt='client' />
        <div className='image-options-container'>
          <MdModeEditOutline className='img-options' />
          <MdPauseCircleOutline className='img-options' />
          <MdDeleteForever onClick={handleDelete} className='img-options' />
        </div>
      </div>
      <div className='card-info'>
        <h5>{name.substring(0, 15)}</h5>
        <h6>{role.substring(0, 9)}</h6>
        <h7>{department}</h7>
        <div className={`attendance-statue ${attendance}`}>{attendance}</div>
      </div>
    </div>
  );
};

export default Card;
