import { Container, Row, Col } from "react-bootstrap";
import ColonnaDxHome from "./ColonnaDxHome";
import ColonnaSxHome from "./colonnaSxHome";
import MiniFooter from "./MiniFooter";
import Homecolcentrale from "./Homecolcentrale";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const savedData = localStorage.getItem("userIdSession");
  useEffect(() => {
    if (!savedData) {
      navigate("/login", { replace: true });
    }
  }, [savedData, navigate]);
  return (
    <div style={{ paddingTop: "5em", background: "#F4F2EE" }}>
      <Container fluid="lg">
        <Row className="align-items-start g-2">
          <Col className="d-none d-xl-block" xl={3}>
            <ColonnaSxHome />
          </Col>
          <Col xs={12} md={8} xl={6}>
            <Homecolcentrale />
            <div className="d-block d-md-none mb-5">
              <MiniFooter />
            </div>
          </Col>
          <Col className="d-none d-md-block" md={4} xl={3}>
            <ColonnaDxHome />
            <MiniFooter />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
