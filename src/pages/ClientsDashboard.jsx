import React, { useState } from "react";
import Btn from "../Btn/Btn";
import Input from "../Input/Input";
import "./ClientsDashboard.css";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../card/Card";
import FormModal from "../form-modal/FormModal";

const ClientsDashboard = ({ setSideBarOpen, modalOpen, setModalOpen }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      {modalOpen && <FormModal setModalOpen={setModalOpen} />}
      <div
        className={`dashbord-container ${modalOpen ? "blurred" : ""}`}
        onClick={() => setSideBarOpen(false)}
      >
        <div className='search-bar'>
          <div className='search-bar-items'>
            <label for='search' className='search-label'>
              <AiOutlineSearch className='search-icon' />
              Search
            </label>
            <Input
              class='search'
              type='search'
              id='search'
              name='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>
          <Btn to={false} color='weekend' onClick={() => setModalOpen(true)}>
            + Add now
          </Btn>
        </div>
        {/* ======================================================================== */}
        <div className='cards-container'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default ClientsDashboard;
