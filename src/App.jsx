import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BarraNavigazioneLinkedIn from "./components/Navbar";
import ColonnaDestra from "./components/ColonnaDestra";
import ProfileMainSection from "./components/ProfileMainSection";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";
import MyFooter from "./components/MyFooter";

function App() {
  return (
    <BrowserRouter>
      <BarraNavigazioneLinkedIn />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>Home Page</div>
              <Container>
                <Row xs={2} className="mt-5">
                  <Col>
                    <ProfileMainSection />
                  </Col>
                  <Col>
                    <ColonnaDestra />
                  </Col>
                </Row>
              </Container>
            </>
          }
        />
        <Route path="/network" element={<div>Network Page</div>} />
        <Route path="/jobs" element={<div>Jobs Page</div>} />
        <Route path="/messaging" element={<div>Messaging Page</div>} />
        <Route path="/notifications" element={<div>Notifications Page</div>} />
        <Route path="/profile" element={<div>Profile Page</div>} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
