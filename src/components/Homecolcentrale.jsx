import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ottieniPostAction, caricaPiuPostAction } from "../redux/posts";

const Homecolcentrale = () => {
  const dispatch = useDispatch();
  const displayedPosts = useSelector((state) => state.posts.displayedPosts);
  const hasMorePosts = useSelector((state) => state.posts.hasMorePosts);
  const loading = useSelector((state) => state.posts.loading);
  const user = useSelector((state) => state.profile);

  const handleLoadMore = () => {
    dispatch(caricaPiuPostAction());
  };

  useEffect(() => {
    dispatch(ottieniPostAction());
  }, [dispatch]);

  return (
    <>
      <Container fluid className="h-auto mb-5">
        <Row>
          <Col>
            {/* Card crea post */}
            <Card className="mb-3 border" style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)" }}>
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={user?.userImg || "https://placebear.com/48/48"}
                    alt="profilo"
                    className="rounded-circle"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                  />
                  <div
                    className="flex-grow-1 rounded-pill px-4 py-3 text-muted"
                    style={{ 
                      cursor: "pointer", 
                      border: "1px solid #ccc",
                      backgroundColor: "#f9fafb",
                      fontSize: "14px",
                      fontWeight: "400"
                    }}
                  >
                    Crea un post...
                  </div>
                </div>
                <div className="d-flex justify-content-around pt-2" style={{ borderTop: "1px solid #e9ecef" }}>
                  <Button
                    variant="link"
                    className="text-muted d-flex align-items-center gap-2 px-3 py-2"
                    style={{ 
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "4px"
                    }}
                  >
                    <i className="bi bi-camera-video" style={{ color: "#70B5F9", fontSize: "16px" }}></i>
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
                      borderRadius: "4px"
                    }}
                  >
                    <i className="bi bi-image" style={{ color: "#C37D16", fontSize: "16px" }}></i>
                    Foto
                  </Button>
                  <Button
                    variant="link"
                    className="text-muted d-flex align-items-center gap-2 px-3 py-2"
                    style={{ 
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "4px"
                    }}
                  >
                    <i className="bi bi-file-earmark-text" style={{ color: "#E16745", fontSize: "16px" }}></i>
                    Scrivi un articolo
                  </Button>
                </div>
              </Card.Body>
            </Card>



                   <div className="d-flex align-items-center">
      <Col>
        <hr className="m-0" />
      </Col>
      


      {/* Testo centrale con dropdown */}
      <Col xs="auto" className="text-muted small d-flex align-items-center">
        Seleziona la visualizzazione del feed:&nbsp;
        <Dropdown>
          <Dropdown.Toggle
            variant="link"
            className="p-0 fw-semibold text-decoration-none text-dark"
          >
            Più rilevanti per primi
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Mostra post recenti</Dropdown.Item>
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
                    <span className="visually-hidden">Loading...</span>
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
                              maxHeight: "400px",
                              objectFit: "cover",
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
                            variant="outline-secondary"
                            className="bg-transparent border-0 flex-fill"
                          >
                            <i className="bi bi-hand-thumbs-up me-1"></i>
                            Consiglia
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="bg-transparent border-0 flex-fill"
                          >
                            <i className="bi bi-chat me-1"></i>
                            Commenta
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="bg-transparent border-0 flex-fill"
                          >
                            <i className="bi bi-arrow-repeat me-1"></i>
                            Condividi
                          </Button>
                          <Button
                            variant="outline-secondary"
                            className="bg-transparent border-0 flex-fill"
                          >
                            <i className="bi bi-send me-1"></i>
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
                  onClick={handleLoadMore}
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
