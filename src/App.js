import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientsDashboard from "./pages/ClientsDashboard";
import { clientsContext } from "./store/ContextProvider";
import { useState } from "react";
import SideBar from "./components/SideBar/SideBar.jsx";
import Sign from "./pages/Sign";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar } from "./components/navbar/NavBar.jsx";
function App() {
  const [clientsData, setClientsData] = useState([]);
  const clienstValue = { clientsData, setClientsData };
  // ===========================//
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <clientsContext.Provider value={clienstValue}>
          <SideBar modalOpen={modalOpen} />
          <NavBar modalOpen={modalOpen} />
          <Routes>
            <Route exact path="/sign" element={<Sign />} />
            <Route
              path="/"
              element={
                <ClientsDashboard
                  setModalOpen={setModalOpen}
                  modalOpen={modalOpen}
                />
              }
            />
          </Routes>
        </clientsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
