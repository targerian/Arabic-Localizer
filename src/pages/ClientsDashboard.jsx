import React, { useState } from "react";
import Btn from "../Btn/Btn";
import Input from "../Input/Input";
import "./ClientsDashboard.css";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../card/Card";

const ClientsDashboard = () => {
  const [search, setSearch] = useState("");
  return (
    <div className='dashbord-container'>
      <div className='search-bar'>
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
        <Btn to='/' color='weekend'>
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
  );
};

export default ClientsDashboard;
