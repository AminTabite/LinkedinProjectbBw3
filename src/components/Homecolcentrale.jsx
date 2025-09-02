import { Container, Row, Col } from "react-bootstrap";

const Homecolcentrale = () => {
  return (
    <>
      <Container fluid className="h-auto my-5">
        <Row>
          <Col>
            <div className="d-flex flex-column">
              {" "}
              {/* post completo */}
              <div className="d-flex flex-column align-items-center gap-2">
                {" "}
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
                  {" "}
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
                  </p>{" "}
                </div>
              </div>
            </div>{" "}
            {/* post completo fine */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homecolcentrale;
