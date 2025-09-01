import { Col, Container, Row } from "react-bootstrap";
import ColonnaDestra from "./ColonnaDestra";
import ProfileMainSection from "./ProfileMainSection";

const ProfilePage = () => {
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={7}>
            <ProfileMainSection />
          </Col>
          <Col xs={0} md={5}>
            <ColonnaDestra />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
