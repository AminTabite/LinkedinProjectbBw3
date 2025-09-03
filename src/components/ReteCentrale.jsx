import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ottieniUtentiAction } from "../redux/users";
const ReteCentrale = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.arrayUtenti);
  
  useEffect(() => {
    dispatch(ottieniUtentiAction());
  }, [dispatch]);

  return (
    <>
      <div className="netCentrale rounded-3">
        <Container fluid className="mb-2">
          <h5 className="pt-2">
            People you may know based on your recent activity
          </h5>
          <Row className="g-2">
            {users && users.length > 0 &&
              users.slice(8, 16).map((user, index) => {
                return (
                  <Col xs={6} md={4} lg={3} key={user._id || index}>
                    <Card
                      className="mb-3 shadow-sm border-0"
                      style={{ height: "15em" }}
                    >
                      <div className="position-relative">
                        <Card.Img
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80"
                          alt="cover"
                          style={{ height: "60px", objectFit: "cover" }}
                        />
                        <img
                          src={user.image || "https://placebear.com/300/300"}
                          className="rounded-circle border border-3 border-white position-absolute"
                          style={{
                            width: "80px",
                            height: "80px",
                            bottom: "-44px",
                            left: "45px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <Card.Body
                        className="p-2 w-100 d-flex flex-column justify-content-end align-items-center"
                        style={{ paddingTop: "40px !important" }}
                      >
                        <div className="d-flex align-items-start w-100">
                          <div className="flex-grow-1 pt-3 text-center">
                            <Card.Title className="fs-6 mb-1 text-center">
                              {user.name + " " + user.surname}
                            </Card.Title>
                            <Card.Text className="text-muted small mb-1 text-center">
                              {user.title}
                            </Card.Text>
                            <Button
                              className="bg-white border border-1 border-primary text-primary rounded-pill w-100"
                              style={{ fontWeight: "500" }}
                            >
                              <i className="bi bi-person-plus-fill"></i> Connetti
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
      <div className="netCentrale rounded-3">
        <Container fluid className="my-3 ">
          <h5 className="pt-2">Popular on LinkedIn</h5>
          <Row className="g-2">
            {users && users.length > 0 &&
              users.slice(0, 8).map((user, index) => {
                return (
                  <Col xs={6} lg={4} key={user._id || index}>
                    <Card
                      className="mb-3 shadow-sm border-0"
                      style={{ height: "15em" }}
                    >
                      <div className="position-relative">
                        <Card.Img
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80"
                          alt="cover"
                          style={{ height: "60px", objectFit: "cover" }}
                        />
                        <img
                          src={user.image || "https://placebear.com/300/300"}
                          className="rounded-circle border border-3 border-white position-absolute"
                          style={{
                            width: "80px",
                            height: "80px",
                            bottom: "-40px",
                            left: "70px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <Card.Body
                        className="p-2 w-100 d-flex flex-column justify-content-end align-items-center"
                        style={{ paddingTop: "40px !important" }}
                      >
                        <div className="d-flex align-items-start w-100">
                          <div className="flex-grow-1 pt-3 text-center">
                            <Card.Title className="fs-6 mb-1 text-center">
                              {user.name + " " + user.surname}
                            </Card.Title>
                            <Card.Text className="text-muted small mb-1 text-center">
                              {user.title}
                            </Card.Text>
                            <Button
                              className="bg-white border border-1 border-primary text-primary rounded-pill w-100"
                              style={{ fontWeight: "500" }}
                            >
                              <i className="bi bi-person-plus-fill"></i> Segui
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ReteCentrale;
