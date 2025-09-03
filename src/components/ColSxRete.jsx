import { Row, Col, Container, Card, Button } from "react-bootstrap";

const ColSxRete = () => {
  return (
    <div id="Retepartesinistra">
      <Container className="">
        <Row className="mb-4">
          <Col className="p-0">
            <div className="d-flex flex-lg-column rounded-4 bg-white bordofinale">
              <div className="border-bottom">
                <h6 className="ps-2 pt-2">Gestisci la tua rete</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {" "}
                {/*elemento singolo*/}
                <div className="d-flex align-items-center p-2">
                  <i className="bi bi-people m-1 pb-1"></i>
                  <h6 className="ps-2">Collegamenti</h6>
                </div>
                <div className="pe-4">
                  <p>69</p>
                </div>
              </div>
              {/* elemento singolo fine*/}
              <div className="d-flex justify-content-start align-items-center p-2">
                {" "}
                {/*elemento singolo*/}
                <i className="bi bi-person m-1 pb-1"></i>
                <h6 className="ps-2">Persone che segui e followers</h6>
              </div>
              <div className="d-flex justify-content-start align-items-center p-2">
                {" "}
                {/*elemento singolo*/}
                <i className="bi bi-person-plus m-1 pb-1"></i>
                <h6 className="ps-2">Gruppi</h6>
              </div>
              <div className="d-flex justify-content-start align-items-center p-2">
                {" "}
                {/*elemento singolo*/}
                <i className="bi bi-building m-1 pb-1"></i>
                <h6 className="ps-2">Eventi</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {" "}
                {/*elemento singolo*/}
                <div className="d-flex align-items-center p-2">
                  <i className="bi bi-building m-1 pb-1"></i>
                  <h6 className="ps-2">Pagine</h6>
                </div>
                <div className="pe-4">
                  <p>13</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {" "}
                {/* elemento singolo fine*/}
                <div className="d-flex align-items-center p-2">
                  <i className="bi bi-newspaper m-1 pb-1"></i>
                  <h6 className="ps-2">Newsletter</h6>
                </div>
                <div className="pe-4">
                  <p>1</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Card className="mb-3 shadow-sm bordofinale w-100">
            <div className="position-relative">
              <Card.Img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=croph=200&q=80"
                alt="cover"
                style={{ height: "80px", objectFit: "cover" }}
              />
              <img
                src={
                  "https://preview.redd.it/zhk5t5e6dur71.jpg?width=640&crop=smart&auto=webp&s=c0e8bfb068b2924c3ce3753a85dab52cfb3fa31c"
                }
                className="rounded-circle border border-3 border-white position-absolute"
                style={{
                  width: "64px",
                  height: "64px",
                  bottom: "-32px",
                  left: "20px",
                  objectFit: "cover",
                }}
              />
            </div>
            <Card.Body
              className="p-3"
              style={{ paddingTop: "40px !important" }}>
              <div className="d-flex align-items-start">
                <div className="flex-grow-1 pt-3">
                  <Card.Title className="fs-6 mb-1">
                    Impero Nilfgaardiano
                  </Card.Title>
                  <Card.Text className="text-muted small mb-1">
                    <h5> Rimani connesso sulle ultime notizie da Novigrad</h5>
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    Lezioni gratis di magia e alchimia dalle 15:00 alle 18:00
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    - Triss Merigold
                  </Card.Text>
                  <Button className="w-100" variant="info">
                    Prenota ora
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default ColSxRete;
