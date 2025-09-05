import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BarraNavigazioneLinkedIn from "./components/Navbar";
import Rete from "./components/Rete";

import "bootstrap-icons/font/bootstrap-icons.css";
import MyFooter from "./components/MyFooter";
import ProfilePage from "./components/ProfilePage";

import HomePage from "./components/HomePage";
import PaginaLavoro from "./components/JobsPage";
import LoginPage from "./components/LoginPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/auth";
import NonExisting from "./components/NonExisiting";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Carica i dati utente dal localStorage all'avvio dell'app
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <BarraNavigazioneLinkedIn />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/network" element={<Rete />} />
        <Route path="/jobs" element={<PaginaLavoro />} />
        <Route path="/messaging" element={<NonExisting />} />
        <Route path="/notifications" element={<NonExisting />} />
        <Route path="/aziende" element={<NonExisting />} />
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
