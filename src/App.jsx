import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BarraNavigazioneLinkedIn from "./components/Navbar";
import Rete from "./components/Rete";

import "bootstrap-icons/font/bootstrap-icons.css";
import MyFooter from "./components/MyFooter";
import ProfilePage from "./components/ProfilePage";
import Rete from "./components/Rete";

import HomePage from "./components/HomePage";
import PaginaLavoro from "./components/JobsPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <BarraNavigazioneLinkedIn />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/network" element={<Rete />} />
          <Route path="/jobs" element={<PaginaLavoro />} />
          <Route path="/messaging" element={<div>Messaging Page</div>} />
          <Route
            path="/notifications"
            element={<div>Notifications Page</div>}
          />
          <Route
            path="/profile"
            element={
              <>
                <ProfilePage /> <MyFooter />
              </>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <>
                <ProfilePage /> <MyFooter />
              </>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
