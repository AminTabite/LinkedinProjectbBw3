import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BarraNavigazioneLinkedIn from "./components/Navbar";

import "bootstrap-icons/font/bootstrap-icons.css";
import MyFooter from "./components/MyFooter";
import ProfilePage from "./components/ProfilePage";
import ColonnaDxHome from "./components/ColonnaDxHome";
import ColonnaSxHome from "./components/colonnaSxHome";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <BarraNavigazioneLinkedIn />
      
  


      <Routes>
       
        <Route path="/" element={<HomePage/>} />
        <Route path="/network" element={<div>Network Page</div>} />
        <Route path="/jobs" element={<div>Jobs Page</div>} />
        <Route path="/messaging" element={<div>Messaging Page</div>} />
        <Route path="/notifications" element={<div>Notifications Page</div>} />
        <Route path="/profile" element={<><ProfilePage /> <MyFooter/> </>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
