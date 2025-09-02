import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BiCamera, BiBrush, BiClipboard } from "react-icons/bi";
import { useState, useEffect } from "react";
import clientApi from "../services/api";
import "./Herosection.css";
import { useSelector } from "react-redux";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk";

const Herosection = ({ userId }) => {
  const [datiProfilo, setDatiProfilo] = useState(null);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);
  const profiloDaRedux = useSelector((state) => {
    return state.profile;
  });

  console.log(profiloDaRedux);

  useEffect(() => {
    const recuperaProfilo = async () => {
      try {
        setCaricamento(true);
        let dati;
        if (userId) {
          // Carica profilo specifico utente
          dati = await clientApi.ottieniProfilo(userId);
        } else {
          // Carica il proprio profilo
          dati = await clientApi.ottieniIlMioProfilo();
        }
        setDatiProfilo(dati);
        console.log(dati);
      } catch (err) {
        setErrore(err.message);
      } finally {
        setCaricamento(false);
      }
    };
    recuperaProfilo();
  }, [userId]);

  const changeImg = (imgLink) => {
    fetch("https://striveschool-api.herokuapp.com/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        image: `${imgLink}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const [show, setShow] = useState(false);
  const [imgLink, setImageLink] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    changeImg(imgLink);

    handleClose();
  };
  if (caricamento) return <div>Caricamento...</div>;
  if (errore) return <div>Errore: {errore}</div>;

  return (
    <Container>
      <Row>
        <Card className="mb-3 p-0 border">
          <div className="position-relative">
            <Card.Img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80"
              alt="cover"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <button
              className="btn btn-light rounded-circle position-absolute"
              style={{ top: "10px", right: "10px" }}
              onClick={handleShow}
            >
              <BiCamera />
            </button>

            <img
              src={
                datiProfilo?.image ||
                profiloDaRedux.userImg ||
                "https://placebear.com/100/100"
              }
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
            <Card.Text>
              <h4 className="mb-0">
                {datiProfilo?.name && datiProfilo?.surname
                  ? `${datiProfilo.name} ${datiProfilo.surname}`
                  : `${profiloDaRedux?.userName || ""} ${
                      profiloDaRedux?.userSurname || ""
                    }`}
                <BiClipboard /> He/ Him
              </h4>
              <p className="profession">
                {datiProfilo?.title ||
                  profiloDaRedux?.userTitle ||
                  "Titolo professionale"}
              </p>
              <p className="location">
                {datiProfilo?.area ||
                  profiloDaRedux?.userArea ||
                  "Area non specificata"}{" "}
                ⸱ <span className="blue500">Informazioni di contatto</span>
              </p>
            </Card.Text>
            <Card.Text>
              <div>
                <p className="blue500">69 collegamenti</p>
              </div>
            </Card.Text>
            <div className="d-flex justify-content-start align-items-center">
              {userId ? (
                <>
                  <button className="me-3 buttonBlue">Messaggio</button>
                  <button className="me-3 buttonOutlineBlue">
                    <span
                      className="text-primary me-1 fw-bold"
                      style={{ fontSize: "18px" }}
                    >
                      +
                    </span>
                    Segui
                  </button>
                  <button className="me-3 buttonOutlineBlue">Altro</button>
                </>
              ) : (
                <>
                  <button className="me-3 buttonBlue">Disponibile per</button>
                  <button className="me-3 buttonOutlineBlue">
                    Aggiungi sezione del profilo
                  </button>
                  <button className="me-3 buttonOutlineBlue">
                    Migliora profilo
                  </button>
                  <button className="buttonOutlineGray">Risorse</button>
                </>
              )}
            </div>
            {!userId && (
              <div className="my-4 heroBox p-3">
                <div className="d-flex justify-content-between">
                  <p className="m-0 fw-bold">Disponibilitá a lavorare</p>
                  <span>
                    <BiBrush />
                  </span>
                </div>
                <p className="m-0">Ruoli di studente diplomato</p>
                <h6>Mostra dettagli</h6>
              </div>
            )}
          </Card.Body>
        </Card>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambia immagine di profilo:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image link:</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://image.jpg"
                autoFocus
                value={imgLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salva l'immagine
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Herosection;

const endpoint = "https://api.example.com/data";
const token = "IL_TUO_TOKEN_QUI"; // il tuo token

const fetchWithToken = async (method = "GET", bodyData = null) => {
  try {
    const res = await fetch(endpoint, {
      method, // GET, POST, PUT, DELETE
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: bodyData ? JSON.stringify(bodyData) : null, // solo per POST/PUT
    });

    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`);
    const data = await res.json();
    console.log(`${method}:`, data);
  } catch (err) {
    console.log(`Errore ${method}:`, err);
  }
};

// ✅ Esempi di utilizzo
fetchWithToken("GET"); // leggere dati
fetchWithToken("POST", { name: "Mario", age: 25 }); // creare dati
fetchWithToken("PUT", { name: "Luigi", age: 30 }); // aggiornare dati
fetchWithToken("DELETE"); // eliminare dati
