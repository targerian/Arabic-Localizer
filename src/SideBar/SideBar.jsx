import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { CgScreen } from "react-icons/cg";

import "./SideBar.css";
import { FaCoffee, FaPrayingHands, FaUserFriends } from "react-icons/fa";

const sideData = [
  { name: "Dashboard", icon: <MdOutlineDashboard className="side-bar-icon" /> },
  { name: "Workplace", icon: <CgScreen className="side-bar-icon" /> },
  { name: "Holidays", icon: <FaCoffee className="side-bar-icon" /> },
  { name: "Employees", icon: <FaUserFriends className="side-bar-icon" /> },
  {
    name: "Inbound Requests",
    icon: <FaPrayingHands className="side-bar-icon" />,
  },
];

const SideBar = ({ modalOpen }) => {
  return (
    <div
      className={`side-bar-container d-flex flex-column justify-content-start align-items-center `}
    >
      <div style={{ position: "fixed" }}>
        {sideData.map((element, index) => (
          <div
            key={index}
            className="d-flex flex-column justify-content-center align-items-center my-3 px-2 py-2 element-container"
          >
            {element.icon}
            <span className="side-text">{element.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
