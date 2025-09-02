import { Col, Container, Row } from "react-bootstrap";
import ColonnaDestra from "./ColonnaDestra";
import ProfileMainSection from "./ProfileMainSection";
import Herosection from "./Herosection";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Herosection userId={userId} />
            <ProfileMainSection userId={userId} />
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
