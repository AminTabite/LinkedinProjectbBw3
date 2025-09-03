// import { Card, Button, ListGroup } from "react-bootstrap";

// export default function ColonnaDxHome() {
//   return (
//     <div style={{ width: "20rem" }}>
//       {/* Notizie */}
//       <Card className="mb-3">
//         <Card.Body>
//           <Card.Title>LinkedIn Notizie</Card.Title>
//           <ListGroup variant="flush" className="mb-2">
//             <ListGroup.Item action>Lorem ipsum</ListGroup.Item>
//             <ListGroup.Item action>Lorem ipsum</ListGroup.Item>
//             <ListGroup.Item action>Lorem ipsum</ListGroup.Item>
//             <ListGroup.Item action>Lorem ipsum</ListGroup.Item>
//             <ListGroup.Item action>Lorem ipsum</ListGroup.Item>
//           </ListGroup>
//         </Card.Body>
//       </Card>

//       {/* Giochi */}
//       <Card className="mb-3">
//         <Card.Body>
//           <Card.Title>I giochi di oggi</Card.Title>
//           <div className="d-flex mb-3">
//             <div className="bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
//               1
//             </div>
//             <small>
//               Mini Sudoku <br /> Creato da chi ha reso famoso "Sudoku"
//             </small>
//           </div>
//           <div className="d-flex">
//             <div className="bg-info text-white d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
//               Z
//             </div>
//             <small>
//               Zip – un rompicapo veloce <br /> Risolvilo in 60 secondi o meno!
//             </small>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Banner promozionale */}
//       <Card className="mb-3 text-center">
//         <Card.Body>
//           <div
//             className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto mb-2"
//             style={{ width: "40px", height: "40px", fontWeight: "bold" }}
//           >
//             L
//           </div>
//           <Card.Text>
//             Scopri le opportunità offerte da <strong>Bludigit</strong>
//           </Card.Text>
//           <Button variant="primary" size="sm">Segui</Button>
//         </Card.Body>
//       </Card>

//       {/* Suggerimento */}
//       <Card bg="warning" text="dark">
//         <Card.Body className="fw-bold small">
//           SUGGERIMENTO: Prova LinkedIn sull’app per Windows
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

import { Card, Button, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ottieniUtentiAction } from "../redux/users";

export default function ColonnaDxHome() {
  const invio = useDispatch();
  const utenti = useSelector((stato) => {
    return stato.users.arrayUtenti;
  });

  useEffect(() => {
    invio(ottieniUtentiAction());
  }, [invio]);
  return (
    <div>
      {/* Notizie */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <Card.Title className="fs-6 fw-bold mb-2">
            Persone che potresti conoscere
          </Card.Title>
          {/*<ListGroup variant="flush" className="mb-2">
            <ListGroup.Item action className="py-2 small">
              Lorem ipsum
            </ListGroup.Item>
            <ListGroup.Item action className="py-2 small">
              Lorem ipsum
            </ListGroup.Item>
            <ListGroup.Item action className="py-2 small">
              Lorem ipsum
            </ListGroup.Item>
            <ListGroup.Item action className="py-2 small">
              Lorem ipsum
            </ListGroup.Item>
            <ListGroup.Item action className="py-2 small">
              Lorem ipsum
            </ListGroup.Item>
          </ListGroup>*/}
          {utenti.slice(0, 5).map((utente, indice) => {
            return (
              <div className="d-flex align-items-center mb-2" key={indice}>
                <img
                  src={indice === 1 ? "https://i.pravatar.cc/40?img=2" : utente.image}
                  className="rounded-circle  me-2"
                  style={{ width: 40, height: 40 }}
                ></img>
                <div>
                  <p className="mb-0 small fw-bold">
                    {indice === 1 ? "Marco Rossi" : utente.name + " " + utente.surname}
                  </p>
                  <button className="btn btn-outline-secondary btn-sm">
                    Visualizza
                  </button>
                </div>
              </div>
            );
          })}
        </Card.Body>
      </Card>

      {/* Giochi */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <Card.Title className="fs-6 fw-bold mb-3">
            I giochi di oggi
          </Card.Title>

          <div className="d-flex mb-3">
            <img
              src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=150&h=150&fit=crop&crop=center"
              alt="Mini Sudoku"
              className="rounded me-3"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
              }}
            />
            <small className="text-muted">
              Mini Sudoku <br /> Creato da chi ha reso famoso "Sudoku"
            </small>
          </div>

          <div className="d-flex">
            <img
              src="https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=150&h=150&fit=crop&crop=center"
              alt="Zip Puzzle"
              className="rounded me-3"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
              }}
            />
            <small className="text-muted">
              Zip – un rompicapo veloce <br /> Risolvilo in 60 secondi o meno!
            </small>
          </div>
        </Card.Body>
      </Card>


      {/* Suggerimento */}
    </div>
  );
}
