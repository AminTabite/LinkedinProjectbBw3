import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";

// NB: il componente ha larghezza che va in base al container in cui è messo

function ProfileMainSection() {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk";
  const [experiences, setExperiences] = useState([]);
  const [show, setShow] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    area: "",
    imgLink: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    const body = {
      role: newExperience.role,
      company: newExperience.company,
      area: newExperience.area,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate || null,
      description: newExperience.description,
      image: newExperience.imgLink || null,
    };

    fetch(
      "https://striveschool-api.herokuapp.com/api/profile/68b597351627c60015f8c568/experiences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore");
        }
      })
      .then((savedExperiences) => {
        setExperiences([...experiences, savedExperiences]);
        setNewExperience({
          role: "",
          company: "",
          area: "",
          imgLink: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const findExperiences = () => {
      fetch(
        "https://striveschool-api.herokuapp.com/api/profile/68b597351627c60015f8c568/experiences",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Error while fetching experiences");
          }
        })
        .then((experiences) => {
          console.log(experiences);
          setExperiences(experiences);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    findExperiences();
  }, []);

  return (
    <div>
      <div className="mb-3 profileCards border">
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
      <div className="profileCards mb-3 p-4 border">
        <div className="d-flex justify-content-between">
          <h4>Esperienza</h4>
          <div className="d-flex justify-content-between">
            <GoPencil className="me-3" onClick={handleShow} />
            <p>ICO2</p>
          </div>
        </div>
        {experiences.length === 0 ? (
          <p>Aggiungi esperienze al tuo profilo per mostrarle qui!</p>
        ) : (
          experiences.map((exp) => {
            return (
              <div key={exp._id} className="d-flex align-items-center mb-3">
                {exp.image === "..." ? (
                  <img src="https://placehold.co/28x28" />
                ) : (
                  <img
                    src={exp.image}
                    style={{ width: "50px", height: "50px" }}
                    className="me-3"
                  />
                )}
                <div className="d-flex flex-column">
                  <p className="my-0">{exp.role}</p>
                  <p className="my-0">
                    {exp.company} – {exp.area || "Area non definita"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="profileCards mb-3 p-4 border">
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
      <div className="profileCards mb-3 p-4 border">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inserisci una nuova esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="form.ControlInput1">
              <Form.Label>Ruolo:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                value={newExperience.role}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, role: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput2">
              <Form.Label>Azienda:</Form.Label>
              <Form.Control
                type="text"
                required
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput3">
              <Form.Label>Città:</Form.Label>
              <Form.Control
                type="text"
                required
                value={newExperience.area}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, area: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput4">
              <Form.Label>Inizio lavoro:</Form.Label>
              <Form.Control
                type="date"
                required
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
                placeholder="Formato YYYY-MM-DD"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput5">
              <Form.Label>Fine lavoro:</Form.Label>
              <Form.Control
                type="date"
                required
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
                }
                placeholder="Formato YYYY-MM-DD, lasciare vuoto se lavoro attuale"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput6">
              <Form.Label>Breve descrizione dell'impiego:</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput7">
              <Form.Label>Inserisci un immagine:</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://immagine.prova"
                value={newExperience.imgLink}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    imgLink: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Aggiungi l'esperienza
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileMainSection;
