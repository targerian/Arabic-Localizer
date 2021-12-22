import React, { useContext, useState } from "react";
import Btn from "../Btn/Btn";
import Input from "../Input/Input";
import "./ClientsDashboard.css";
import { BiSearch } from "react-icons/bi";
import Card from "../card/Card";
import FormModal from "../form-modal/FormModal";
import { clientsContext } from "../store/ContextProvider";
import { useEffect } from "react/cjs/react.development";
import { Form } from "react-bootstrap";

const ClientsDashboard = ({ modalOpen, setModalOpen }) => {
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
      client.name.toLowerCase().includes(search)
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
      <div className={`dashbord-container`}>
        <div className="w-100 d-flex flex-column flex-md-row justify-content-start align-items-start align-items-md-center">
          <div className="w-100 w-md-auto d-flex flex-row justify-content-center align-items-center flex-fill me-2 ">
            <label
              for="search"
              className="d-flex flex-row justify-content-center align-items-center pe-3 ps-4 bg-white search-label"
            >
              <BiSearch className="me-2 search-icon" />
              Search
            </label>
            <Form.Control
              size="lg"
              type="search"
              id="search"
              name="search"
              value={search}
              className="flex-fill search-input"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </div>
          <button
            className="mt-4 mt-md-0 weekends"
            onClick={() => setModalOpen(true)}
          >
            <span className="plus">+</span>
            <span>Add new</span>
          </button>
        </div>
        {/* ======================================================================== */}
        <div className="cards-container d-flex flex-row justify-content-center justify-content-md-start row-wrap align-items-start align-self-start ">
          {filteredList ? (
            filteredList.map((client) => (
              <Card
                key={client.id}
                name={client.name}
                img={client.image}
                role={client.role}
                attendance={client.attendance}
                department={client.department}
                office={client.office}
                sDate={client.sDate}
                dManager={client.dManager}
                handleDelete={() => handleDelete(client.id)}
                modalOpen={modalOpen}
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
