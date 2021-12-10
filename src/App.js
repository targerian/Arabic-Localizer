import "./App.css";
import NavBar from "./navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientsDashboard from "./pages/ClientsDashboard";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<ClientsDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
