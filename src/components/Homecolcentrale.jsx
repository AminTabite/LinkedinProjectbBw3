import { Container, Row, Col, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector } from "react-redux";

const Homecolcentrale = () => {
  const posts = useSelector((state) => {
    return state.posts.postsArray;
  });

  return (
    <>
      <Container fluid className="h-auto mb-5">
        <Row>
          <Col>
            {posts.map((post) => {
              return (
                <div
                  className="d-flex flex-column my-2 align-items-start py-2 px-2"
                  style={{ background: "white" }}
                >
                  {/* post completo */}
                  <div className="d-flex flex-column align-items-start gap-2">
                    {/* foto e testo */}
                    {/* immagine profilo */}
                    <img
                      src="https://dummyimage.com/40x40/000/fff"
                      alt="foto profilo"
                      className="rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                      }}
                    />
                    {/* info utente */}
                    <div>
                      <h6 className="mb-0">{post.user.username}</h6>
                      {/*<p className="mb-0 small">lavora presso azienda x</p>
                      <p className="mb-0 text-muted small">
                        x giorni fa - <i className="bi bi-globe"></i>
                      </p>*/}
                    </div>
                    <p>{post.text}</p>
                    <div>
                      {/*contenuto testo*/}

                      <img
                        src="https://dummyimage.com/300x300/000/fff"
                        alt="post"
                        className=" w-auto h-auto"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className=" p-2 border-bottom">
                      {/* <p> pinco pallino e altre x persone hanno messo like</p>*/}
                      <span className="ms-5 ">
                        26 commenti - 9 diffusioni post
                      </span>
                    </div>
                    <div>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          variant="outline-secondary"
                          className="bg-transparent border-0"
                        >
                          <i className="bi bi-hand-thumbs-up"></i>
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className="bg-transparent border-0"
                        >
                          <i className="bi bi-chat"></i>
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className="bg-transparent border-0"
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </Button>
                        <Button
                          variant="outline-secondary"
                          className="bg-transparent border-0"
                        >
                          <i className="bi bi-send"></i>
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </div>
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
