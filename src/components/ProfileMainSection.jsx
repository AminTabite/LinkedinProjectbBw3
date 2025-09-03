import { Container, Row, Col, Button, Modal, Form, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { FiPlus } from "react-icons/fi";
import { MdPeople } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { TOKEN } from "../config/constants";
import clientApi from "../services/api";

// NB: il componente ha larghezza che va in base al container in cui è messo

function ProfileMainSection({ userId }) {
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d) ? "" : d.toISOString().split("T")[0];
  };
  const [experiences, setExperiences] = useState([]);
  const [currentProfileId, setCurrentProfileId] = useState(null);

  const getCurrentProfileId = async () => {
    if (userId) {
      setCurrentProfileId(userId);
    } else {
      try {
        const myProfile = await clientApi.ottieniIlMioProfilo();
        setCurrentProfileId(myProfile._id);
      } catch (error) {
        console.error("Errore nel recupero del profilo corrente:", error);
      }
    }
  };
  const findExperiences = () => {
    if (!currentProfileId) return;
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${currentProfileId}/experiences`,
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
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    area: "",
    image: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleSaveAdd = () => {
    const body = {
      role: newExperience.role,
      company: newExperience.company,
      area: newExperience.area,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate || null,
      description: newExperience.description,
      image: newExperience.image || null,
    };

    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${currentProfileId}/experiences`,
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
          image: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        handleCloseAdd();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [idExperience, setIdExperience] = useState("");
  const [editExperience, setEditExperience] = useState({
    role: "",
    company: "",
    area: "",
    image: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    setIdExperience(id);
    setEditExperience({
      role: "",
      company: "",
      area: "",
      image: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${currentProfileId}/experiences/${id}`,
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
      .then((experience) => {
        console.log(experience);
        setEditExperience(experience);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowEdit(true);
  };

  const handleSaveEdit = () => {
    const body = {
      role: editExperience.role,
      company: editExperience.company,
      area: editExperience.area,
      startDate: editExperience.startDate,
      endDate: editExperience.endDate || null,
      description: editExperience.description,
      image: editExperience.image || null,
    };

    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${currentProfileId}/experiences/${idExperience}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Errore nella richiesta PUT");
        if (res.status === 204) return null;
        return res.json();
      })
      .then((savedExperience) => {
        setExperiences((prevExperiences) =>
          prevExperiences.map((exp) => {
            if (exp._id === idExperience) {
              if (savedExperience) return savedExperience;
              return { ...exp, ...editExperience };
            }
            return exp;
          })
        );
        findExperiences();
        setEditExperience({
          role: "",
          company: "",
          area: "",
          image: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        handleCloseEdit();
      })
      .catch((err) => {
        console.error("Errore nel salvataggio:", err);
      });
  };

  const handleDeleteEdit = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${currentProfileId}/experiences/${idExperience}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Errore nella richiesta PUT");
        return res;
      })
      .then(() => {
        setExperiences((prevExperiences) =>
          prevExperiences.filter((exp) => exp._id !== idExperience)
        );
        setEditExperience({
          role: "",
          company: "",
          area: "",
          image: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        handleCloseEdit();
        findExperiences();
      })
      .catch((err) => {
        console.error("Errore nel salvataggio:", err);
      });
  };

  const [views, setViews] = useState(100);
  const [impressions, setImpressions] = useState(50);
  useEffect(() => {
    setViews(views + Math.ceil(Math.random() * 500));
    setImpressions(impressions + Math.ceil(Math.random() * 400));
    getCurrentProfileId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentProfileId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (currentProfileId) {
      findExperiences();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProfileId]);

  return (
    <div>
      {!userId && (
        <div className="mb-3 profileCards border">
          <div className="pt-4 px-4">
            <h4 className="mb-0">Analisi</h4>
            <p className="mt-0">Solo per te</p>
          </div>
        <Container className="mx-0 px-4">
          <Row xs={1} md={3}>
            <Col>
              <div className="d-flex">
                <MdPeople className="fs-3" />
                <div className="ms-2">
                  <h5 className="mb-0">{views} visuliazzazioni del profilo</h5>
                  <p>Aggiorna il tuo profilo per attrarre visitatori.</p>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex">
                <IoStatsChart className="fs-3" />
                <div className="ms-2">
                  <h5 className="mb-0">{impressions} impressioni del post</h5>
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
      )}
      <div className="profileCards mb-3 p-4 border">
        <div className="d-flex justify-content-between">
          <h4>Esperienza</h4>
          {!userId && (
            <div className="d-flex justify-content-between">
              <FiPlus onClick={handleShowAdd} />
            </div>
          )}
        </div>
        {experiences.length === 0 ? (
          <p>
            {userId
              ? "Nessuna esperienza da mostrare"
              : "Aggiungi esperienze al tuo profilo per mostrarle qui!"}
          </p>
        ) : (
          experiences.map((exp) => {
            return (
              <div
                key={exp._id}
                className="d-flex align-items-center mb-3"
                onClick={!userId ? () => handleShowEdit(exp._id) : undefined}
                style={{ cursor: !userId ? 'pointer' : 'default' }}
              >
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
            <GoPencil />
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
            <GoPencil />
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

        
               <Card className="shadow-sm" style={{  borderRadius: "8px" }}>
  <Card.Body>
    <Card.Title className="mb-2">Interessi</Card.Title>
    <p className="text-muted small mb-3">Aziende</p>

    <div className="d-flex justify-content-between align-items-center border-bottom py-2">
      <div className="d-flex align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          alt="Windows logo"
          width="40"
          height="40"
          className="me-3"
        />
        <div>
          <p className="mb-0 fw-semibold">Microsoft</p>
          <small className="text-muted">26.000.000 follower</small>
        </div>
      </div>
      <Button variant="outline-secondary" size="sm" className="rounded-pill">
        ✓ Già segui
      </Button>
    </div>

    <div className="d-flex justify-content-between align-items-center py-2">
      <div className="d-flex align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple logo"
          width="40"
          height="40"
          className="me-3"
        />
        <div>
          <p className="mb-0 fw-semibold">Apple</p>
          <small className="text-muted">976.037 follower</small>
        </div>
      </div>
      <Button variant="outline-secondary" size="sm" className="rounded-pill">
        ✓ Già segui
      </Button>
    </div>
  </Card.Body>
</Card>


      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Inserisci una nuova esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="form.ControlInputEdit1">
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
            <Form.Group className="mb-2" controlId="form.ControlInputEdit2">
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
            <Form.Group className="mb-2" controlId="form.ControlInputEdit3">
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
            <Form.Group className="mb-2" controlId="form.ControlInputEdit4">
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
            <Form.Group className="mb-2" controlId="form.ControlInputEdit5">
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
            <Form.Group className="mb-2" controlId="form.ControlInputEdit6">
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
            <Form.Group className="mb-2" controlId="form.ControlInputEdit7">
              <Form.Label>Inserisci un immagine:</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://immagine.prova"
                value={newExperience.image}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    image: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveAdd}>
            Aggiungi l'esperienza
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="form.ControlInput1">
              <Form.Label>Ruolo:</Form.Label>
              <Form.Control
                type="text"
                required
                value={editExperience.role}
                onChange={(e) =>
                  setEditExperience({ ...editExperience, role: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput2">
              <Form.Label>Azienda:</Form.Label>
              <Form.Control
                type="text"
                required
                value={editExperience.company}
                onChange={(e) =>
                  setEditExperience({
                    ...editExperience,
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
                value={editExperience.area}
                onChange={(e) =>
                  setEditExperience({ ...editExperience, area: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="form.ControlInput4">
              <Form.Label>Inizio lavoro:</Form.Label>
              <Form.Control
                type="date"
                required
                value={formatDateForInput(editExperience.startDate)}
                onChange={(e) =>
                  setEditExperience({
                    ...editExperience,
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
                value={formatDateForInput(editExperience.endDate)}
                onChange={(e) =>
                  setEditExperience({
                    ...editExperience,
                    endDate: e.target.value || null,
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
                value={editExperience.description}
                onChange={(e) =>
                  setEditExperience({
                    ...editExperience,
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
                value={editExperience.image}
                onChange={(e) =>
                  setEditExperience({
                    ...editExperience,
                    image: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteEdit}>
            Elimina l'esperienza
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Modifica l'esperienza
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileMainSection;
