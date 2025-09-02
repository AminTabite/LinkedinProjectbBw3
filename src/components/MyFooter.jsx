import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

const MyFooter = () => {
  const [language, setLanguage] = useState("lingua");
  return (
    <div style={{ background: "#F4F2EE" }} id="footer" className="pt-3">
      <Container>
        <Row>
          <Col xs={2}>
            <p>
              <a href="#">Informazioni</a>
            </p>
            <p>
              <a href="#">Informativa sulla comunity professionale</a>
            </p>
            <p>
              <a href="#">Privacy e condizioni</a>
            </p>
            <p>
              <a href="#">Sales solutions</a>
            </p>
            <p>
              <a href="#">Centro sicurezza</a>
            </p>
          </Col>
          <Col xs={2}>
            <p>
              <a href="#">Accessibilità</a>
            </p>
            <p>
              <a href="#">Carriera</a>
            </p>
            <p>
              <a href="#">Opzioni annunci</a>
            </p>
            <p>
              <a href="#">Mobile</a>
            </p>
          </Col>
          <Col xs={2}>
            <p>
              <a href="#">Talent solutions</a>
            </p>
            <p>
              <a href="#">Soluzione di marketing</a>
            </p>
            <p>
              <a href="#">Pubblicità</a>
            </p>
            <p>
              <a href="#">Piccole imprese</a>
            </p>
          </Col>
          <Col xs={3}>
            <div className="d-flex">
              <div className="fs-5">
                <i className="bi bi-question-circle-fill"></i>{" "}
              </div>
              <div>
                <p className="fs-5 ms-2 mb-0">
                  <a href="#">Domande?</a>
                </p>
                <p className=" ms-2 mt-0" style={{ fontSize: "0.7em" }}>
                  Visita il nostro centro assistenza
                </p>
              </div>
            </div>
            <div className="d-flex">
              <div className="fs-5">
                <i className="bi bi-gear-fill"></i>
              </div>
              <div>
                <p className="fs-5 ms-2 mb-0">
                  <a href="#">Gestisci il tuo account e privacy</a>
                </p>
                <p className=" ms-2 mt-0" style={{ fontSize: "0.7em" }}>
                  Vai alle impostazioni
                </p>
              </div>
            </div>
            <div className="d-flex">
              <div className="fs-5">
                <i className="bi bi-shield-shaded"></i>
              </div>
              <div>
                <p className="fs-5 ms-2 mb-0">
                  <a href="#">Trasparenza sui contenuti consigliati</a>
                </p>
                <p className=" ms-2 mt-0" style={{ fontSize: "0.7em" }}>
                  Scopri di più
                </p>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div>
              <p className=" ms-2 mb-0 mt-4" style={{ fontSize: "0.8em" }}>
                Seleziona la lingua
              </p>
              <DropdownButton id="dropdown-basic-button" title={language}>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => {
                    setLanguage("Italiano");
                  }}
                >
                  Italiano
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => {
                    setLanguage("English");
                  }}
                >
                  English
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  onClick={() => {
                    setLanguage("Espanol");
                  }}
                >
                  Espanol
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyFooter;
