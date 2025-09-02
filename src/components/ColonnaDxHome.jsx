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

export default function ColonnaDxHome() {
  return (
    <div style={{ width: "20rem" }}>
      {/* Notizie */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <Card.Title className="fs-6 fw-bold mb-2">LinkedIn Notizie</Card.Title>
          <ListGroup variant="flush" className="mb-2">
            <ListGroup.Item action className="py-2 small">Lorem ipsum</ListGroup.Item>
            <ListGroup.Item action className="py-2 small">Lorem ipsum</ListGroup.Item>
            <ListGroup.Item action className="py-2 small">Lorem ipsum</ListGroup.Item>
            <ListGroup.Item action className="py-2 small">Lorem ipsum</ListGroup.Item>
            <ListGroup.Item action className="py-2 small">Lorem ipsum</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Giochi */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <Card.Title className="fs-6 fw-bold mb-3">I giochi di oggi</Card.Title>
          
          <div className="d-flex mb-3">
            <div
              className="rounded text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: "40px", height: "40px", backgroundColor: "#0A66C2", fontWeight: "bold" }}
            >
              1
            </div>
            <small className="text-muted">
              Mini Sudoku <br /> Creato da chi ha reso famoso "Sudoku"
            </small>
          </div>

          <div className="d-flex">
            <div
              className="rounded text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: "40px", height: "40px", backgroundColor: "#6f42c1", fontWeight: "bold" }}
            >
              Z
            </div>
            <small className="text-muted">
              Zip – un rompicapo veloce <br /> Risolvilo in 60 secondi o meno!
            </small>
          </div>
        </Card.Body>
      </Card>

      {/* Banner promozionale */}
      <Card className="mb-3 shadow-sm border-0 text-center">
        <Card.Body className="p-3">
          <div
            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{ width: "48px", height: "48px", fontWeight: "bold" }}
          >
            L
          </div>
          <Card.Text className="small text-muted mb-2">
            Scopri le opportunità offerte da <strong>Bludigit</strong>
          </Card.Text>
          <Button
            variant="primary"
            size="sm"
            className="fw-semibold px-4"
            style={{ borderRadius: "9999px" }}
          >
            Segui
          </Button>
        </Card.Body>
      </Card>

      {/* Suggerimento */}
      <Card className="border-0 shadow-sm" style={{ backgroundColor: "#FFF9E3" }}>
        <Card.Body className="fw-bold small p-3">
          💡 SUGGERIMENTO: Prova LinkedIn sull’app per Windows
        </Card.Body>
      </Card>
    </div>
  );
}
