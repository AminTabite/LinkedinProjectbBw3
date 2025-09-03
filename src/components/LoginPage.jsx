import { Col, Container, Row } from "react-bootstrap";
import Login from "./Login";

const ProfilePage = () => {
  return (
    <div
      style={{ background: "#F4F2EE", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <Row className="justify-content-center align-content-center">
          <Login />
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
