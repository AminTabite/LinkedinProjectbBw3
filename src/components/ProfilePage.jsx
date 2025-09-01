import { Col, Container, Row } from "react-bootstrap";
import ColonnaDestra from "./ColonnaDestra";
import ProfileMainSection from "./ProfileMainSection";
import Herosection from "./Herosection";

const ProfilePage = () => {
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Herosection />
            <ProfileMainSection />
          </Col>
          <Col xs={0} md={4}>
            <ColonnaDestra />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
