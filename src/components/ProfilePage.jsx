import { Col, Container, Row } from "react-bootstrap";
import ColonnaDestra from "./ColonnaDestra";
import ProfileMainSection from "./ProfileMainSection";
import Herosection from "./Herosection";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const savedData = localStorage.getItem("userIdSession");
  useEffect(() => {
    if (!savedData) {
      navigate("/login", { replace: true });
    }
  }, [savedData, navigate]);
  const { userId } = useParams();
  return (
    <div style={{ background: "#F4F2EE" }}>
      <Container
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
        fluid="lg"
      >
        <Row className="justify-content-center">
          <Col xs={12} lg={8}>
            <Herosection userId={userId} />
            <ProfileMainSection userId={userId} />
          </Col>
          <Col className="d-none d-lg-block" lg={4}>
            <ColonnaDestra />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
