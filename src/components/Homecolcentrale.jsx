import { Container, Row, Col, Card, Dropdown, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ottieniPostAction, caricaPiuPostAction, ordinaPostPerDataAction, aggiungiPostAction, eliminaPostAction } from "../redux/posts";
import { getToken } from "../config/constants";
import clientApi from "../services/api";
import Comments from "./Comments";
import "./Homecolcentrale.css";

const Homecolcentrale = () => {
  const dispatch = useDispatch();
  const displayedPosts = useSelector((state) => state.posts.displayedPosts);
  const hasMorePosts = useSelector((state) => state.posts.hasMorePosts);
  const loading = useSelector((state) => state.posts.loading);
  const { user } = useSelector((state) => state.auth);
  const [testoPost, setTestoPost] = useState("");
  const [immaginSelezionata, setImmagineSelezionata] = useState(null);
  const [reazioni, setReazioni] = useState({});
  const [apiProfile, setApiProfile] = useState(null);
  const [numeroCommenti, setNumeroCommenti] = useState({});
  const [tipoOrdinamento, setTipoOrdinamento] = useState("rilevanti");
  const [commentiVisibili, setCommentiVisibili] = useState({});

  const ottieniNumeriCasuali = (postId) => {
    if (!numeroCommenti[postId]) {
      setNumeroCommenti(prev => ({
        ...prev,
        [postId]: {
          commenti: Math.floor(Math.random() * 150) + 1,
          diffusioni: Math.floor(Math.random() * 20) + 1
        }
      }));
      return {
        commenti: Math.floor(Math.random() * 150) + 1,
        diffusioni: Math.floor(Math.random() * 20) + 1
      };
    }
    return numeroCommenti[postId];
  };

  const caricaAltri = () => {
    dispatch(caricaPiuPostAction());
  };

  const mostraPostRecenti = () => {
    dispatch(ordinaPostPerDataAction());
    setTipoOrdinamento("recenti");
  };

  const mostraPostRilevanti = () => {
    dispatch(ottieniPostAction());
    setTipoOrdinamento("rilevanti");
  };

  const toggleCommenti = (postId) => {
    setCommentiVisibili(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
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

  const aggiungiReazione = (postId, emoji) => {
    setReazioni(prev => {
      const postReactions = prev[postId] || {};
      const currentUserReaction = postReactions.userReaction;
      
      // Se l'utente ha già reagito con la stessa emoji, rimuovila
      if (currentUserReaction === emoji) {
        const newReactions = { ...postReactions };
        newReactions[emoji] = Math.max((newReactions[emoji] || 1) - 1, 0);
        if (newReactions[emoji] === 0) {
          delete newReactions[emoji];
        }
        delete newReactions.userReaction;
        
        return {
          ...prev,
          [postId]: newReactions
        };
      }
      
      // Se l'utente aveva una reazione diversa, rimuovi quella vecchia
      const updatedReactions = { ...postReactions };
      if (currentUserReaction) {
        updatedReactions[currentUserReaction] = Math.max((updatedReactions[currentUserReaction] || 1) - 1, 0);
        if (updatedReactions[currentUserReaction] === 0) {
          delete updatedReactions[currentUserReaction];
        }
      }
      
      // Aggiungi la nuova reazione
      updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
      updatedReactions.userReaction = emoji;
      
      return {
        ...prev,
        [postId]: updatedReactions
      };
    });
  };

  useEffect(() => {
    const arrayPost = displayedPosts;
    if (arrayPost.length === 0) {
      dispatch(ottieniPostAction());
    }
  }, [dispatch, displayedPosts]);

  // Carica l'immagine profilo dall'API quando l'utente è loggato
  useEffect(() => {
    const fetchApiProfile = async () => {
      if (user && user.token) {
        try {
          const profileData = await clientApi.ottieniIlMioProfilo();
          setApiProfile(profileData);
        } catch (error) {
          console.warn("Impossibile caricare immagine profilo dall'API:", error);
        }
      }
    };

    fetchApiProfile();
  }, [user]);

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
            Authorization: `Bearer ${getToken()}`
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
                Authorization: `Bearer ${getToken()}`
              },
              body: formData
            });
            
            if (!rispostaImmagine.ok) {
              console.error("Errore caricamento immagine");
            }
          }
          
          // Ricarica i post per vedere il nuovo post
          dispatch(ottieniPostAction());
          
          // Reset dei campi
          setTestoPost('');
          setImmagineSelezionata(null);
          
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
            Authorization: `Bearer ${getToken()}`
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
                    src={apiProfile?.image || "https://via.placeholder.com/48x48/0a66c2/ffffff?text=U"}
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
                      placeholder={`Cosa stai pensando, ${user?.name || 'utente'}?`}
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
                    {tipoOrdinamento === "recenti" ? "Post più recenti" : "Più rilevanti per primi"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={mostraPostRecenti}>Mostra post recenti</Dropdown.Item>
                    <Dropdown.Item onClick={mostraPostRilevanti}>Mostra post rilevanti</Dropdown.Item>
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
                        {post.user?._id === apiProfile?._id && (
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
                      <div className="w-100 p-2 border-bottom d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-1">
                          {reazioni[post._id] && Object.entries(reazioni[post._id]).filter(([key]) => key !== 'userReaction').map(([emoji, count]) => (
                            <span key={emoji} className="d-flex align-items-center gap-1 small">
                              <span style={{ fontSize: "14px" }}>{emoji}</span>
                              <span className="text-muted">{count}</span>
                            </span>
                          ))}
                        </div>
                        <span className="small text-muted">
                          {ottieniNumeriCasuali(post._id).commenti} commenti - {ottieniNumeriCasuali(post._id).diffusioni} diffusioni post
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
                            className="text-dark border-0 flex-fill py-2 position-relative btn-consiglia"
                            style={{
                              textDecoration: "none",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#000 !important"
                            }}
                            onMouseEnter={(e) => {
                              const tooltip = e.target.querySelector('.tooltip-consiglia');
                              if (tooltip) {
                                tooltip.classList.remove('tooltip-hidden');
                              }
                            }}
                            onMouseLeave={(e) => {
                              const tooltip = e.target.querySelector('.tooltip-consiglia');
                              if (tooltip) {
                                tooltip.classList.remove('tooltip-hidden');
                              }
                            }}
                          >
                            <i className="bi bi-hand-thumbs-up me-2" style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}></i>
                            Consiglia
                            <span 
                              className="position-absolute tooltip-consiglia"
                              style={{
                                bottom: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "white",
                                borderRadius: "25px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)",
                                padding: "8px 12px",
                                fontSize: "18px",
                                whiteSpace: "nowrap",
                                zIndex: 1000,
                                marginBottom: "8px",
                                display: "flex",
                                gap: "4px",
                                alignItems: "center"
                              }}
                            >
                              {[
                                { emoji: '👍', color: '#0073b1', bgColor: '#e7f3ff' },
                                { emoji: '❤️', color: '#ed4d47', bgColor: '#ffebea' },
                                { emoji: '👏', color: '#f5c75d', bgColor: '#fff8e7' },
                                { emoji: '🎉', color: '#8066c7', bgColor: '#f2efff' },
                                { emoji: '😊', color: '#61a24d', bgColor: '#f0f8ec' },
                                { emoji: '😢', color: '#6ba3d6', bgColor: '#eef5fc' }
                              ].map((item, idx) => (
                                <span 
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    aggiungiReazione(post._id, item.emoji);
                                    const tooltip = e.target.closest('.tooltip-consiglia');
                                    if (tooltip) {
                                      tooltip.classList.add('tooltip-hidden');
                                    }
                                  }}
                                  style={{ 
                                    cursor: 'pointer',
                                    padding: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: item.bgColor,
                                    border: `1px solid ${item.color}20`,
                                    transition: 'all 0.2s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '36px',
                                    height: '36px',
                                    fontSize: '16px'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.1)';
                                    e.target.style.boxShadow = `0 2px 8px ${item.color}40`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                >
                                  {item.emoji}
                                </span>
                              ))}
                            </span>
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
                            onClick={() => toggleCommenti(post._id)}
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
                      
                      {/* Sezione Commenti */}
                      <Comments
                        postId={post._id}
                        isVisible={commentiVisibili[post._id]}
                        onToggle={() => toggleCommenti(post._id)}
                        userProfile={apiProfile}
                      />
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
