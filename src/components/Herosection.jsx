import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BiCamera, BiBrush, BiClipboard } from "react-icons/bi";
import { useState, useEffect } from "react";
import clientApi from "../services/api";
import "./Herosection.css";
import { useSelector } from "react-redux";
import { getToken } from "../config/constants";
import usersData from "../data/users.json";

const Herosection = ({ userId }) => {
  const [datiProfilo, setDatiProfilo] = useState(null);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);
  const profiloDaRedux = useSelector((state) => {
    return state.profile;
  });

  console.log(profiloDaRedux);

  const recuperaProfilo = async () => {
    try {
      setCaricamento(true);
      let dati;
      if (userId) {
        dati = await clientApi.ottieniProfilo(userId);
      } else {
        dati = await clientApi.ottieniIlMioProfilo();
      }
      setDatiProfilo(dati);
    } catch (err) {
      setErrore(err.message);
    } finally {
      setCaricamento(false);
    }
  };

  const [connections, setConnections] = useState(50);
  useEffect(() => {
    setConnections(connections + Math.ceil(Math.random() * 150));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recuperaProfilo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const changeImg = (imgLink) => {
    fetch("https://striveschool-api.herokuapp.com/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
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
    recuperaProfilo();
    handleClose();
  };
  if (caricamento) return <div>Caricamento...</div>;
  if (errore) return <div>Errore: {errore}</div>;

  return (
    <Container fluid>
      <Row>
        <Card className="mb-3 p-0 border">
          <div className="position-relative">
            <Card.Img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80"
              alt="cover"
              style={{ height: "200px", objectFit: "cover" }}
            />

            {!userId && (
              <button
                className="btn btn-light rounded-circle position-absolute"
                style={{ top: "10px", right: "10px" }}
                onClick={handleShow}
              >
                <BiCamera />
              </button>
            )}

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
            <div>
              <div className="d-flex justify-content-between flex-wrap">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <h2 className="mb-0 ">
                    {datiProfilo?.name && datiProfilo?.surname
                      ? `${datiProfilo.name} ${datiProfilo.surname}`
                      : `${profiloDaRedux?.userName || ""} ${
                          profiloDaRedux?.userSurname || ""
                        }`}
                    <BiClipboard />
                  </h2>
                  <p className="pronouns">He / Him</p>
                </div>
                <div>
                  {(() => {
                    let currentUser;

                    if (userId) {
                      currentUser = usersData.users.find(
                        (user) =>
                          user.id === userId ||
                          user.id.toString() === userId.toString()
                      );
                    } else {
                      const localStorageData =
                        localStorage.getItem("userIdSession");
                      let utenteLoggato = null;

                      if (localStorageData) {
                        try {
                          utenteLoggato = JSON.parse(localStorageData);
                        } catch (e) {
                          console.error("Errore parsing localStorage:", e);
                        }
                      }

                      // Cerca l'utente nel JSON
                      if (datiProfilo?._id) {
                        currentUser = usersData.users.find(
                          (user) => user.id === datiProfilo._id
                        );
                      } else if (utenteLoggato?.username) {
                        currentUser = usersData.users.find(
                          (user) => user.username === utenteLoggato.username
                        );
                      } else if (utenteLoggato?._id) {
                        currentUser = usersData.users.find(
                          (user) => user.id === utenteLoggato._id
                        );
                      }

                      // Prova match alternativi
                      if (!currentUser && utenteLoggato) {
                        currentUser = usersData.users.find(
                          (user) =>
                            user.id.toString() ===
                              utenteLoggato._id?.toString() ||
                            user.username.toLowerCase() ===
                              utenteLoggato.username?.toLowerCase()
                        );
                      }

                      // Fallback al primo utente
                      if (!currentUser) {
                        currentUser = usersData.users[0];
                      }
                    }

                    if (
                      currentUser?.formazione &&
                      currentUser.formazione.length > 0
                    ) {
                      const formazioneFiltrata = currentUser.formazione.filter(
                        (edu) =>
                          edu.school === "Politecnico di Milano" ||
                          edu.school === "Istituto Tecnico Industriale"
                      );

                      if (formazioneFiltrata.length > 0) {
                        return (
                          <div className="text-end">
                            {formazioneFiltrata.map((edu, index) => (
                              <div
                                key={index}
                                className="mb-2 d-flex align-items-center"
                                style={{
                                  justifyContent: "flex-start",
                                  marginRight: "20px",
                                }}
                              >
                                <img
                                  src={edu.logo}
                                  alt={edu.school}
                                  className="me-3"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "contain",
                                  }}
                                />
                                <p
                                  className="mb-0"
                                  style={{ fontWeight: "500", color: "#333" }}
                                >
                                  {edu.school}
                                </p>
                              </div>
                            ))}
                          </div>
                        );
                      } else {
                        // Mostra tutta la formazione dell'utente
                        return (
                          <div className="text-end">
                            {currentUser.formazione.map((edu, index) => (
                              <div
                                key={index}
                                className="mb-2 d-flex align-items-center"
                                style={{
                                  justifyContent: "flex-start",
                                  marginRight: "20px",
                                }}
                              >
                                <img
                                  src={edu.logo}
                                  alt={edu.school}
                                  className="me-3"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "contain",
                                  }}
                                />
                                <p
                                  className="mb-0"
                                  style={{ fontWeight: "500", color: "#333" }}
                                >
                                  {edu.school}
                                </p>
                              </div>
                            ))}
                          </div>
                        );
                      }
                    }

                    // Se non trova match, mostra sempre Politecnico di Milano e Istituto Tecnico Industriale
                    return (
                      <div className="text-end">
                        <div
                          className="mb-2 d-flex align-items-center"
                          style={{
                            justifyContent: "flex-end",
                            marginRight: "20px",
                          }}
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/it/b/be/Logo_Politecnico_Milano.png"
                            alt="Politecnico di Milano"
                            className="me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                          />
                          <p
                            className="mb-0"
                            style={{ fontWeight: "500", color: "#333" }}
                          >
                            Politecnico di Milano
                          </p>
                        </div>
                        <div
                          className="mb-2 d-flex align-items-center"
                          style={{
                            justifyContent: "flex-end",
                            marginRight: "20px",
                          }}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRUDj9t544lY_1Jm4pWulnaJDycM1jmibFhg&s"
                            alt="Istituto Tecnico Industriale"
                            className="me-3"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                          />
                          <p
                            className="mb-0"
                            style={{ fontWeight: "500", color: "#333" }}
                          >
                            Istituto Tecnico Industriale
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
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
              <div>
                <p className="blue500">{connections} collegamenti</p>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center flex-wrap">
              {userId ? (
                <>
                  <button className="me-2 mb-1 buttonBlue">Messaggio</button>
                  <button className="me-2 mb-1 buttonOutlineBlue">
                    <span
                      className="text-primary me-1 fw-bold"
                      style={{ fontSize: "18px" }}
                    >
                      +
                    </span>
                    Segui
                  </button>
                  <button className="me-2 mb-1 buttonOutlineBlue">Altro</button>
                </>
              ) : (
                <>
                  <button className="me-2 mb-1 buttonBlue">
                    Disponibile per
                  </button>
                  <button className="me-2 mb-1 buttonOutlineBlue">
                    Aggiungi sezione del profilo
                  </button>
                  <button className="me-2 mb-1 buttonOutlineBlue">
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
                    <BiBrush style={{ cursor: "pointer" }} />
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
