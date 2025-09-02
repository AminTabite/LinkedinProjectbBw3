import { Container, Row, Col, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ottieniPostAction } from "../redux/posts";

const Homecolcentrale = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.postsArray);
  const loading = useSelector((state) => state.posts.loading);
  const user = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(ottieniPostAction());
  }, [dispatch]);

  return (
    <>
      <Container fluid className="h-auto mb-5">
        <Row>
          <Col>
            {/* Card crea post */}
            <Card className="mb-3 shadow-sm border-0">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={user?.userImg || "https://placebear.com/40/40"}
                    alt="profilo"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div
                    className="flex-grow-1 bg-light rounded-pill px-3 py-2 text-dark border border-dark"
                    style={{ cursor: "pointer", borderWidth: "2px" }}
                  >
                    Crea un post
                  </div>
                </div>
                <div className="d-flex justify-content-around mt-3 pt-2 border-top">
                  <Button variant="link" className="text-muted d-flex align-items-center gap-2">
                    <i className="bi bi-camera-video text-success"></i>
                    Video
                  </Button>
                  <Button variant="link" className="text-muted d-flex align-items-center gap-2">
                    <i className="bi bi-image text-primary"></i>
                    Foto
                  </Button>
                  <Button variant="link" className="text-muted d-flex align-items-center gap-2">
                    <i className="bi bi-pencil-square text-danger"></i>
                    Scrivi articolo
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {loading && (
              <Card className="mb-3 shadow-sm border-0">
                <Card.Body className="p-3 text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </Card.Body>
              </Card>
            )}

            {posts.map((post, index) => {
              return (
                <Card key={post._id || index} className="mb-3 shadow-sm border-0">
                  <Card.Body className="p-3">
                    {/* post completo */}
                    <div className="d-flex flex-column align-items-start gap-2">
                      {/* Header del post con foto profilo e info utente */}
                      <div className="d-flex align-items-center gap-2 w-100">
                        <img
                          src={post.user?.image || "https://dummyimage.com/40x40/000/fff"}
                          alt="foto profilo"
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{post.user?.name || "Utente Anonimo"} {post.user?.surname || ""}</h6>
                          <p className="mb-0 small text-muted">{post.user?.title || ""}</p>
                          <p className="mb-0 text-muted small">
                            {new Date(post.createdAt).toLocaleDateString()} - <i className="bi bi-globe"></i>
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
                        <ButtonGroup aria-label="Basic example" className="w-100">
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
            {/* post completo fine */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Homecolcentrale;
