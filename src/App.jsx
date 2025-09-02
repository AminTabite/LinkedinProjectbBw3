import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BarraNavigazioneLinkedIn from "./components/Navbar";

import "bootstrap-icons/font/bootstrap-icons.css";
import MyFooter from "./components/MyFooter";
import ProfilePage from "./components/ProfilePage";
import PaginaLavoro from "./components/JobsPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <BarraNavigazioneLinkedIn />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/network" element={<div>Network Page</div>} />
          <Route path="/jobs" element={<PaginaLavoro />} />
          <Route path="/messaging" element={<div>Messaging Page</div>} />
          <Route
            path="/notifications"
            element={<div>Notifications Page</div>}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <MyFooter />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
