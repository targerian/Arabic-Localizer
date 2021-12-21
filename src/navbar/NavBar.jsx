import React from "react";
import Btn from "../Btn/Btn";
import "./Navbar.css";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({  modalOpen }) => {
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div
      className={`d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center align-items-md-start mb-2 nav-container `}
    >
      <GiHamburgerMenu
        className='ham-menu'
      />
      <div className='d-flex flex-col flex-md-row justify-content-end align-items-center nav-links-container '>
        <span className='now-date'>
          {weekDay[new Date().getDay()] +
            " " +
            new Date().toLocaleString().replace(",", "")}
        </span>
        <div className='d-flex flex-row justify-content-center align-items-center nav-links-specific-container'>
          <Btn to='/' color='green'>
            Sign in
          </Btn>
          <div className='nav-icon-container'>
            <IoMdNotifications className='nav-icon' />
            <div className='nav-notification-number'>1</div>
          </div>
          <div className='nav-name'>
            <img className='nav-img' src='/images/test.jpg' alt='profile' />
            <span>Ahmed Khaled</span>
            <FaAngleDown className='nav-name-dropdown' />
          </div>
          <FaAngleDown className='nav-dropdown' />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
