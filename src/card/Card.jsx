import React from "react";
import "./Card.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdPauseCircleOutline } from "react-icons/md";
import { c } from "react-icons/md";

const Card = () => {
  return (
    <div className='hr-card-container'>
      <div className='card-img-options'>
        <img className='hr-card-img' src='/images/test.jpg' alt='client' />
        <div className='image-options-container'>
          <MdModeEditOutline className='img-options' />
          <MdPauseCircleOutline className='img-options' />
          <MdPauseCircleOutline className='img-options' />
        </div>
      </div>
      <div className='card-info'>
        <h1>Sara Khaled Ahmed</h1>
        <h2>HR Head</h2>
        <h3>Business Development</h3>
      </div>
    </div>
  );
};

export default Card;
