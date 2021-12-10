import React from "react";
import Btn from "../Btn/Btn";
import "./Navbar.css";
import { IoMdNotifications } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({ setSideBarOpen, modalOpen }) => {
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
    <div className={`nav-container ${modalOpen ? "blurred" : ""}`}>
      <GiHamburgerMenu
        className='ham-menu'
        onClick={() => setSideBarOpen((prev) => !prev)}
      />
      <div className='nav-links-container'>
        <span className='now-date'>
          {weekDay[new Date().getDay()] +
            " " +
            new Date().toLocaleString().replace(",", "")}
        </span>
        <Btn to='/' color='green'>
          Sign in
        </Btn>
        <div className='nav-icon-container'>
          <IoMdNotifications />
          <div className='nav-notification-number'>1</div>
        </div>
        <img className='nav-img' src='/images/test.jpg' alt='profile' />
        <div className='nav-name'>
          <h1>Ahmed Khaled</h1>
          <FaAngleDown className='nav-name-dropdown' />
        </div>
        <FaAngleDown className='nav-dropdown' />
      </div>
    </div>
  );
};

export default NavBar;
