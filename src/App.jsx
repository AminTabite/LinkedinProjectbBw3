import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BarraNavigazioneLinkedIn from "./components/Navbar";
import ColonnaDestra from "./components/ColonnaDestra";

function App() {
  return (
    <BrowserRouter>
      <BarraNavigazioneLinkedIn />
      <Routes>
        <Route path="/" element={<><div>Home Page</div><ColonnaDestra/></>} />
        <Route path="/network" element={<div>Network Page</div>} />
        <Route path="/jobs" element={<div>Jobs Page</div>} />
        <Route path="/messaging" element={<div>Messaging Page</div>} />
        <Route path="/notifications" element={<div>Notifications Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
