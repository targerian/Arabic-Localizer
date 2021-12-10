import React from "react";
import "./SideBar.css";

const SideBar = ({ setSideBarOpen }) => {
  return (
    <div className='side-bar-container' onClick={() => setSideBarOpen(false)}>
      sidebar
    </div>
  );
};

export default SideBar;
