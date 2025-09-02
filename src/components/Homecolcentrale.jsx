import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Homecolcentrale = () => {
  return (
    <>
      <Container fluid className="h-auto my-5">
        <Row>
          <Col>
            <div className="d-flex flex-column">
              {/* post completo */}
              <div className="d-flex flex-column align-items-start gap-2">
                {/* foto e testo */}
                {/* immagine profilo */}
                <img
                  src="https://dummyimage.com/40x40/000/fff"
                  alt="foto profilo"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                {/* info utente */}
                <div>
                  <h6 className="mb-0">Nome Cognome</h6>
                  <p className="mb-0 small">lavora presso azienda x</p>
                  <p className="mb-0 text-muted small">
                    x giorni fa - <i className="bi bi-globe"></i>
                  </p>
                </div>
                <div>
                  {/*contenuto testo*/}
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ex diam, sagittis vitae sapien id, scelerisque luctus
                    nunc. Proin ac lobortis sapien. Integer tincidunt finibus
                    dolor, et gravida sapien consectetur vitae. Curabitur ornare
                    lobortis malesuada. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Nunc
                    pretium velit eros, id aliquam eros sodales quis. Nulla et
                    mi a dui ultrices facilisis sed nec dolor. Vivamus ac
                  </p>
                  <img
                    src="https://dummyimage.com/300x300/000/fff"
                    alt="post"
                    className=" w-auto h-auto"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className=" p-2 border-bottom">
                  <p> pinco pallino e altre x persone hanno messo like</p>
                  <span className="ms-5 ">26 commenti - 9 diffusioni post</span>
                </div>
                <div>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="outline-secondary"
                      className="bg-transparent border-0">
                      <i className="bi bi-hand-thumbs-up"></i>
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="bg-transparent border-0">
                      <i className="bi bi-chat"></i>
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="bg-transparent border-0">
                      <i className="bi bi-arrow-repeat"></i>
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="bg-transparent border-0">
                      <i className="bi bi-send"></i>
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
            {/* post completo fine */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homecolcentrale;
