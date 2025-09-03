import { Container, Row, Col } from "react-bootstrap";
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
      <Container style={{ paddingTop: "5em" }}>
        <Row>
          <Col xs={0} md={4}>
            <ColSxRete />
          </Col>
          <Col xs={12} md={8}>
            <ReteCentrale />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rete;
