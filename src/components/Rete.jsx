import { Container, Row, Col } from "react-bootstrap";

import ColSxRete from "./ColSxRete";

const Rete = () => {
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container style={{ paddingTop: "5em" }}>
        <Row>
          <Col xs={0} md={4}>
            <ColSxRete />
          </Col>
          <Col xs={12} md={8}>
            <p>Prova</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Rete;
