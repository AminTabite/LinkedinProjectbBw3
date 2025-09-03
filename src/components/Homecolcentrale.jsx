import { Container, Row, Col, Card, Dropdown, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ottieniPostAction, caricaPiuPostAction, ordinaPostPerDataAction, aggiungiPostAction, eliminaPostAction } from "../redux/posts";
import { TOKEN } from "../config/constants";

const Homecolcentrale = () => {
  const dispatch = useDispatch();
  const displayedPosts = useSelector((state) => state.posts.displayedPosts);
  const hasMorePosts = useSelector((state) => state.posts.hasMorePosts);
  const loading = useSelector((state) => state.posts.loading);
  const user = useSelector((state) => state.profile);
  const [testoPost, setTestoPost] = useState("");
  const [immaginSelezionata, setImmagineSelezionata] = useState(null);

  const caricaAltri = () => {
    dispatch(caricaPiuPostAction());
  };

  const mostraPostRecenti = () => {
    dispatch(ordinaPostPerDataAction());
  };

  const selezionaImmagine = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImmagineSelezionata(file);
    }
  };

  const apriSelettoreFile = () => {
    document.getElementById('caricamento-immagine').click();
  };

  const eliminaPost = async (idPost) => {
    if (window.confirm("Sei sicuro di voler eliminare questo post?")) {
      try {
        await dispatch(eliminaPostAction(idPost));
        dispatch(ottieniPostAction());
      } catch (error) {
        alert("Errore nell'eliminazione del post");
      }
    }
  };

  useEffect(() => {
    dispatch(ottieniPostAction());
  }, [dispatch]);

  /* funzione per creare post, tramite card sopra colonna centrale*/
  const creaPost = async () => {
    if (!testoPost.trim() && !immaginSelezionata) {
      alert("Inserisci del testo o seleziona un'immagine");
      return;
    }

    try {
      let idPost = null;
      
      // Prima creiamo il post con il testo
      if (testoPost.trim()) {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
          },
          body: JSON.stringify({
            text: testoPost
          })
        });
        
        if (response.ok) {
          const nuovoPost = await response.json();
          idPost = nuovoPost._id;
          
          // Se c'è anche un'immagine, la carichiamo
          if (immaginSelezionata) {
            const formData = new FormData();
            formData.append('post', immaginSelezionata);
            
            const rispostaImmagine = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${idPost}`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${TOKEN}`
              },
              body: formData
            });
            
            if (!rispostaImmagine.ok) {
              console.error("Errore caricamento immagine");
            }
          }
          
          // Ricarica i post per vedere il nuovo post
          dispatch(ottieniPostAction());
          
        } else {
          throw new Error("Errore nella creazione del post");
        }
      } else if (immaginSelezionata) {
        // Solo immagine, senza testo
        const formData = new FormData();
        formData.append('post', immaginSelezionata);
        
        const risposta = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${TOKEN}`
          },
          body: formData
        });
        
        if (risposta.ok) {
          dispatch(ottieniPostAction());
        } else {
          throw new Error("Errore nel caricamento dell'immagine");
        }
      }

      alert("Post caricato con successo!");
      setTestoPost("");
      setImmagineSelezionata(null);
      
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore nel caricamento del post");
    }
  };

  return (
    <>
      <Container fluid className="h-auto mb-5">
        <Row>
          <Col>
            {/* Card crea post */}
            <Card
              className="mb-3 border"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)",
              }}
            >
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={user?.userImg || "https://placebear.com/48/48"}
                    alt="profilo"
                    className="rounded-circle"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <Form
                    className="flex-grow-1"
                    onSubmit={(e) => {
                      e.preventDefault(), creaPost();
                    }}
                  >
                    <input
                      onChange={(e) => {
                        setTestoPost(e.target.value);
                      }}
                      value={testoPost}
                      className="flex-grow-1 bg-light rounded-pill px-3 py-2 text-dark border border-dark w-100"
                      style={{
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        backgroundColor: "#f9fafb",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                      placeholder="Crea un post"
                    ></input>{" "}
                  </Form>
                </div>
                
                {immaginSelezionata && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(immaginSelezionata)}
                      alt="Anteprima"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      variant="link"
                      className="ms-2 text-danger"
                      onClick={() => setImmagineSelezionata(null)}
                    >
                      Rimuovi
                    </Button>
                  </div>
                )}
                <div
                  className="d-flex justify-content-around pt-2"
                  style={{ borderTop: "1px solid #e9ecef" }}
                >
                  <Button
                    variant="link"
                    className="text-muted d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    <i
                      className="bi bi-camera-video"
                      style={{ color: "#70B5F9", fontSize: "16px" }}
                    ></i>
                    Video
                  </Button>
                  <Button
                    variant="link"
                    className="text-muted d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    onClick={apriSelettoreFile}
                  >
                    <i
                      className="bi bi-image"
                      style={{ color: "#C37D16", fontSize: "16px" }}
                    ></i>
                    Foto
                  </Button>
                  <input
                    type="file"
                    id="caricamento-immagine"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={selezionaImmagine}
                  />
                  <Button
                    variant="link"
                    className="text-muted d-flex align-items-center gap-2 px-3 py-2"
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    <i
                      className="bi bi-file-earmark-text"
                      style={{ color: "#E16745", fontSize: "16px" }}
                    ></i>
                    Scrivi un articolo
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <div className=" d-none d-lg-flex align-items-center">
              <Col>
                <hr className="m-0" />
              </Col>

              {/* Testo centrale con dropdown */}
              <Col
                xs="auto"
                className="text-muted small d-flex align-items-center"
              >
                Seleziona la visualizzazione del feed:&nbsp;
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    className="p-0 fw-semibold text-decoration-none text-dark"
                  >
                    Più rilevanti per primi
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={mostraPostRecenti}>Mostra post recenti</Dropdown.Item>
                    <Dropdown.Item>Mostra post rilevanti</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Linea a destra */}
            </div>

            {loading && (
              <Card className="mb-3 shadow-sm border-0">
                <Card.Body className="p-3 text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                  </div>
                </Card.Body>
              </Card>
            )}

            {displayedPosts.map((post, index) => {
              return (
                <Card
                  key={post._id || index}
                  className="mb-3 shadow-sm border-0"
                >
                  <Card.Body className="p-3">
                    {/* post completo */}
                    <div className="d-flex flex-column align-items-start gap-2">
                      {/* Header del post con foto profilo e info utente */}
                      <div className="d-flex align-items-center gap-2 w-100">
                        <img
                          src={
                            post.user?.image ||
                            "https://dummyimage.com/40x40/000/fff"
                          }
                          alt="foto profilo"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0">
                            {post.user?.name || "Utente Anonimo"}{" "}
                            {post.user?.surname || ""}
                          </h6>
                          <p className="mb-0 small text-muted">
                            {post.user?.title || ""}
                          </p>
                          <p className="mb-0 text-muted small">
                            {new Date(post.createdAt).toLocaleDateString()} -{" "}
                            <i className="bi bi-globe"></i>
                          </p>
                        </div>
                        {post.user?._id === user?.userId && (
                          <Button
                            variant="link"
                            className="text-muted p-1"
                            style={{ fontSize: "16px" }}
                            onClick={() => eliminaPost(post._id)}
                            title="Elimina post"
                          >
                            <i className="bi bi-x-lg"></i>
                          </Button>
                        )}
                      </div>

                      {/* Contenuto del post */}
                      <div className="w-100">
                        <p className="mb-2">{post.text}</p>
                        {post.image && (
                          <img
                            src={post.image}
                            alt="post"
                            className="w-100 rounded"
                            style={{
                              maxHeight: "500px",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </div>

                      {/* Interazioni */}
                      <div className="w-100 p-2 border-bottom">
                        <span className="small text-muted">
                          26 commenti - 9 diffusioni post
                        </span>
                      </div>

                      {/* Pulsanti di azione */}
                      <div className="w-100">
                        <ButtonGroup
                          aria-label="Basic example"
                          className="w-100"
                        >
                          <Button
                            variant="link"
                            className="text-dark border-0 flex-fill py-2"
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000 !important"
                            }}
                          >
                            <i className="bi bi-hand-thumbs-up me-2" style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}></i>
                            Consiglia
                          </Button>
                          <Button
                            variant="link"
                            className="text-dark border-0 flex-fill py-2"
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000 !important"
                            }}
                          >
                            <i className="bi bi-chat me-2" style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}></i>
                            Commenta
                          </Button>
                          <Button
                            variant="link"
                            className="text-dark border-0 flex-fill py-2"
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000 !important"
                            }}
                          >
                            <i className="bi bi-arrow-repeat me-2" style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}></i>
                            Diffondi il post
                          </Button>
                          <Button
                            variant="link"
                            className="text-dark border-0 flex-fill py-2"
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000 !important"
                            }}
                          >
                            <i className="bi bi-send me-2" style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}></i>
                            Invia
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}

            {/* Pulsante Mostra altro */}
            {hasMorePosts && (
              <div className="text-center mt-4">
                <Button
                  variant="outline-primary"
                  onClick={caricaAltri}
                  className="px-4 py-2"
                >
                  Mostra altro
                </Button>
              </div>
            )}

            {/* post completo fine */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homecolcentrale;
