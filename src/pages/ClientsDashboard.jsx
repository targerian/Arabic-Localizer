import React, { useContext, useState } from "react";
import "./ClientsDashboard.css";
import { BiSearch } from "react-icons/bi";
import Card from "../card/Card";
import FormModal from "../form-modal/FormModal";
import { clientsContext } from "../store/ContextProvider";
import { useEffect } from "react/cjs/react.development";
import { Form } from "react-bootstrap";
import useGetUsers from "../api/apiHooks/useGetUsers";
import useSearchUser from "../api/apiHooks/useSearchUser";
import { GET_USERS } from "../api/quereis";
import { NetworkStatus, useQuery } from "@apollo/client";
import useDidMountEffect from "../hooks/useDidMountEffect";

const ClientsDashboard = ({ modalOpen, setModalOpen }) => {
  //global state managment and states =========================================================================
  const { clientsData, setClientsData } = useContext(clientsContext);
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);

  //initial rendering==========================================================================================
  // const [
  //   getUsers,
  //   { error = usersError, data = usersData, loading = usersLoading },
  // ] = useGetUsers();

  // const fetchData = async () => {
  //   await getUsers();
  //   const getUsersData = usersData?.users_by_role.data;
  //   setClientsData(getUsersData);
  // };

  // useEffect(() => {
  //   setLoad(true);
  //   fetchData();
  //   setLoad(false);
  // }, [data]);

  const { error, data, loading, refetch, networkStatus, previousData } =
    useQuery(GET_USERS, {
      onCompleted: (data) => {
        const response = data.users_by_role.data;
        console.log(response);
        setClientsData(response);
      },
    });
  useEffect(() => {
    if (search === "") {
      if (networkStatus === NetworkStatus.refetch) {
        setLoad(true);
      }
      setClientsData([]);
      refetch();
      const response = data?.users_by_role.data;
      setClientsData(response);
      setLoad(false);
    } else return;
  }, [search]);

  // handle search =================================================================================================

  const [serachUser, { searchError, searchData, searchLoading }] =
    useSearchUser();

  const fetchSearch = () => {
    if (search !== "") {
      setLoad(true);
      serachUser({
        variables: {
          name: search.toLocaleLowerCase(),
        },
      });
      const response = searchData?.users_by_role.data;
      setClientsData(response);
      setLoad(false);
    } else return;
  };

  // removing search query from the initial rendering================================================================

  useDidMountEffect(fetchSearch, [search, searchData]);

  //=======================================================
  const handleDelete = (i) => {
    const filtered = clientsData.filter((client) => client.id !== i);
    setClientsData(filtered);
  };

  return (
    <>
      <div className={`dashbord-container`}>
        {modalOpen && <FormModal setModalOpen={setModalOpen} />}
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
            className="mt-4 mt-md-0 ms-md-2 weekends"
            onClick={() => setModalOpen(true)}
          >
            <span className="plus">+</span>
            <span>Add new</span>
          </button>
        </div>
        {/* ============================================================================================================ */}
        <div className="cards-container d-flex flex-row justify-content-center justify-content-md-start row-wrap align-items-start align-self-start ">
          {searchLoading || loading || load ? (
            <span>loading</span>
          ) : (
            clientsData?.map((client) => (
              <Card
                key={client.id}
                name={client.name}
                img={client.img_path || "/images/user.jpg"}
                role={client.user_type}
                position={client.position.name}
                attendance={client.working_status}
                department={client.department.name}
                office={client.office.name}
                sDate={client.starts_at}
                dManager={client.manager.name}
                copiedManager={client.copied_managers}
                handleDelete={() => handleDelete(client.id)}
                modalOpen={modalOpen}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ClientsDashboard;
