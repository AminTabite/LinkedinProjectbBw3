import { Container, Row, Col } from "react-bootstrap";

// NB: il componente ha larghezza che va in base al container in cui è messo

function ProfileMainSection() {
  return (
    <div>
      <div className="mb-3 profileCards">
        <div className="pt-4 px-4">
          <h4 className="mb-0">Analisi</h4>
          <p className="mt-0">Solo per te</p>
        </div>
        <Container className="mx-0 px-4">
          <Row xs={1} md={3}>
            <Col>
              <div className="d-flex">
                <p>ICO</p>
                <div className="ms-2">
                  <h5 className="mb-0">0 visuliazzazioni del profilo</h5>
                  <p>Aggiorna il tuo profilo per attrarre visitatori.</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex">
                <p>ICO</p>
                <div className="ms-2">
                  <h5 className="mb-0">0 impressioni del post</h5>
                  <p className="mb-0">
                    Crea un post per autmentare l'interesse.
                  </p>
                  <p>Ultimi 7 giorni.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <button className="buttonProfile">Mostra tutte le analisi -&gt;</button>
      </div>
      <div className="profileCards mb-3 p-4">
        <div className="d-flex justify-content-between">
          <h4>Esperienza</h4>
          <div className="d-flex justify-content-between">
            <p className="me-3">ICO1</p>
            <p>ICO2</p>
          </div>
        </div>
        <div className="d-flex align-items-end mb-3">
          <p className="me-3">IMG</p>
          <div className="d-flex flex-column">
            <p className="my-0">Lavoro 1</p>
            <p className="my-0">Azienda - contratto</p>
          </div>
        </div>
        <div className="d-flex align-items-end mb-3">
          <p className="me-3">IMG</p>
          <div className="d-flex flex-column">
            <p className="my-0">Lavoro 1</p>
            <p className="my-0">Azienda - contratto</p>
          </div>
        </div>
      </div>
      <div className="profileCards mb-3 p-4">
        <div className="d-flex justify-content-between">
          <h4>Formazione</h4>
          <div className="d-flex justify-content-between">
            <p className="me-3">ICO1</p>
            <p>ICO2</p>
          </div>
        </div>
        <div className="d-flex align-items-end mb-3">
          <p className="me-3">IMG</p>
          <div className="d-flex flex-column">
            <p className="my-0">Scuola 1</p>
            <p className="my-0">Anno inizio - anno fine</p>
          </div>
        </div>
        <div className="d-flex align-items-end mb-3">
          <p className="me-3">IMG</p>
          <div className="d-flex flex-column">
            <p className="my-0">Scuola 1</p>
            <p className="my-0">Anno inizio - anno fine</p>
          </div>
        </div>
      </div>
      <div className="profileCards mb-3 p-4">
        <div className="d-flex justify-content-between">
          <h4>Competenze</h4>
          <div className="d-flex justify-content-between">
            <p className="me-3">ICO1</p>
            <p>ICO2</p>
          </div>
        </div>
        <div className="skillBorders">
          <p className="my-1">Soft Skill 1</p>
        </div>
        <div className="skillBorders">
          <p className="my-1">Soft Skill 1</p>
        </div>
        <div className="skillBorders">
          <p className="my-1">Soft Skill 1</p>
        </div>
        <div className="skillBorders">
          <p className="my-1">Soft Skill 1</p>
        </div>
        <div className="skillBorders">
          <p className="my-1">Soft Skill 1</p>
        </div>
        <div>
          <p className="my-1">Soft Skill 1</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileMainSection;
