import "./App.css";
import NavBar from "./navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientsDashboard from "./pages/ClientsDashboard";
import { clientsContext } from "./store/ContextProvider";
import { useState } from "react";
import SideBar from "./SideBar/SideBar";

function App() {
  const [clientsData, setClientsData] = useState();
  const clienstValue = { clientsData, setClientsData };
  // ===========================//
  const [sidebaropen, setSideBarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='App'>
      <clientsContext.Provider value={clienstValue}>
        <BrowserRouter>
          {sidebaropen && <SideBar setSideBarOpen={setSideBarOpen} />}
          <NavBar setSideBarOpen={setSideBarOpen} modalOpen={modalOpen} />
          <Routes>
            <Route
              path='/'
              element={
                <ClientsDashboard
                  setSideBarOpen={setSideBarOpen}
                  setModalOpen={setModalOpen}
                  modalOpen={modalOpen}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </clientsContext.Provider>
    </div>
  );
}

export default App;
