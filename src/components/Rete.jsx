import { Container, Row, Col } from "react-bootstrap";
import MiniFooter from "./MiniFooter";
import ColSxRete from "./ColSxRete";
import ReteCentrale from "./ReteCentrale";

const Rete = () => {
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container style={{ paddingTop: "5em" }}>
        <Row>
          <Col xs={0} md={4}>
            <ColSxRete />
            <MiniFooter />
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
