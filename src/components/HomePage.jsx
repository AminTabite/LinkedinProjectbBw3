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
    <div style={{ paddingTop: "7em", background: "#F4F2EE" }}>
      <Container>
        <Row className="align-items-start g-2">
          <Col xs={0} md={3}>
            <ColonnaSxHome />
          </Col>
          <Col xs={12} md={6}>
            <Homecolcentrale />
          </Col>
          <Col xs={0} md={3}>
            <ColonnaDxHome />
            <MiniFooter />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
