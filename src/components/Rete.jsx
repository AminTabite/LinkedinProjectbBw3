import { Container, Row, Col } from "react-bootstrap";
import MiniFooter from "./MiniFooter";
import ColSxRete from "./ColSxRete";
import ReteCentrale from "./ReteCentrale";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Rete = () => {
  const navigate = useNavigate();
  const savedData = localStorage.getItem("userIdSession");
  useEffect(() => {
    if (!savedData) {
      navigate("/login", { replace: true });
    }
  }, [savedData, navigate]);
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container style={{ paddingTop: "5em" }} fluid="lg">
        <Row>
          <Col className="d-none d-lg-inline" xs={0} md={4}>
            <ColSxRete />
            <div className="mt-3 text-center">
              <Container className="px-2">
                <div className="d-flex flex-wrap justify-content-center small text-muted mb-2">
                  <span className="mx-2 mb-1">Informazioni</span>
                  <span className="mx-2 mb-1">Accessibilità</span>
                  <span className="mx-2 mb-1">Centro assistenza</span>
                  <span className="mx-2 mb-1">Privacy e condizioni ▾</span>
                  <span className="mx-2 mb-1">
                    Opzioni per gli annunci pubblicitari
                  </span>
                  <span className="mx-2 mb-1">Pubblicità</span>
                  <span className="mx-2 mb-1">Servizi alle aziende ▾</span>
                  <span className="mx-2 mb-1">Scarica l’app LinkedIn</span>
                  <span className="mx-2 mb-1">Altro</span>
                </div>

                <div className="d-flex align-items-center justify-content-center small text-muted">
                  <span
                    className="fw-bold me-1"
                    style={{ color: "#0A66C2", fontSize: "14px" }}
                  >
                    Linked
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "#0A66C2",
                        color: "white",
                        borderRadius: "3px",
                        padding: "0 2px",
                        fontSize: "12px",
                        marginLeft: "2px",
                      }}
                    >
                      in
                    </span>
                  </span>
                  <span className="ms-1">LinkedIn Corporation © 2025</span>
                </div>
              </Container>
            </div>
          </Col>
          <Col xs={12} lg={8}>
            <ReteCentrale />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rete;
