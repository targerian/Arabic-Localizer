import React, { useContext, useState } from "react";
import Btn from "../Btn/Btn";
import Input from "../Input/Input";
import "./ClientsDashboard.css";
import { AiOutlineSearch } from "react-icons/ai";
import Card from "../card/Card";
import FormModal from "../form-modal/FormModal";
import { clientsContext } from "../store/ContextProvider";
import { useEffect } from "react/cjs/react.development";

const ClientsDashboard = ({ setSideBarOpen, modalOpen, setModalOpen }) => {
  const { clientsData, setClientsData } = useContext(clientsContext);
  const [search, setSearch] = useState("");
  //===============================================
  // handle search
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(clientsData);
  }, [clientsData]);

  useEffect(() => {
    const filtered = clientsData.filter((client) =>
      client.fName.includes(search)
    );
    setFilteredList(filtered);
  }, [search, clientsData]);
  //=======================================================
  const handleDelete = (i) => {
    const filtered = clientsData.filter((client) => client.id !== i);
    setClientsData(filtered);
  };

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
            <input
              class='search-client'
              type='search'
              id='search'
              name='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>
          <button className='weekend' onClick={() => setModalOpen(true)}>
            + Add now
          </button>
        </div>
        {/* ======================================================================== */}
        <div className='cards-container'>
          {filteredList ? (
            filteredList.map((client) => (
              <Card
                key={client.id}
                name={client.fName}
                img={client.image}
                role={client.role}
                attendance={client.attendance}
                department={client.department}
                handleDelete={() => handleDelete(client.id)}
              />
            ))
          ) : (
            <span>no employees data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientsDashboard;
