import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BiCamera, BiBrush, BiClipboard } from "react-icons/bi";

const Herosection = () => {
  return (
    <Container>
      <Row>
        <Card>
          <div className="position-relative">
            <Card.Img
              src="https://placehold.co/600x200"
              alt="cover"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <button
              className="btn btn-light rounded-circle position-absolute"
              style={{ top: "10px", right: "10px" }}
            >
              <BiCamera />
            </button>

            <img
              src="https://placebear.com/100/100"
              alt="profile"
              className="rounded-circle border border-3 border-white position-absolute"
              style={{
                bottom: "10px",
                left: "20px",
                width: "100px",
                height: "100px",
              }}
            />
          </div>
          <Card.Body>
            <div></div>
            <Card.Title>
              Amin Tabite{" "}
              <span>
                <BiClipboard /> <span>He/ Him</span>
              </span>
            </Card.Title>
            <Card.Text>Perito elettrotecnico</Card.Text>
            <Card.Text>
              <div>
                <h6>ITTS CARLO GRASSI</h6>
                <p>Torino, Piemonte, Italia</p>
                <p>69 collegamenti</p>
              </div>
            </Card.Text>
            <div className="d-flex justify-content-lg-start justify-content-start align-items-center">
              <Button className="rounded-5" variant="primary">
                Disponibile per
              </Button>
              <Button className="rounded-5 g-1" variant="outline-primary">
                Aggiungi sezione
              </Button>
              <Button className="rounded-5 g-1" variant="outline-primary">
                Migliora profilo
              </Button>
              <Button className="rounded-5 g-1" variant="outline-dark">
                <span className="d-lg-none">...</span>
                <span className="d-none d-lg-inline">Risorse</span>
              </Button>
            </div>
            <div className="d-flex flex-column justify-content-start bg-body-tertiary  my-4">
              <div className="d-flex justify-content-between">
                <h5>Disponibilitá a lavorare</h5>
                <span>
                  <BiBrush />
                </span>
              </div>

              <p>Ruoli di studente diplomato</p>

              <h6>Mostra dettagli</h6>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Herosection;
