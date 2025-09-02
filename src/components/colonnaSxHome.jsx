// import { Card, Button, ListGroup } from "react-bootstrap";
// import { BsPersonPlus } from "react-icons/bs";

// const ColonnaSxHome = () => {
//   return (
//     <div style={{ width: "18rem" }}>
//       {/* Card profilo */}
//       <Card className="mb-3">
//         <Card.Body className="text-center">
//           <div
//             className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto mb-2"
//             style={{ width: "60px", height: "60px", fontSize: "24px", fontWeight: "bold" }}
//           >
//             L
//           </div>
//           <Card.Title>Nome Cognome</Card.Title>
//           <Card.Text className="text-muted">Lorem ipsum</Card.Text>
//           <Card.Text className="text-muted">Lorem ipsum</Card.Text>
//           <Card.Link href="#">Lavoro</Card.Link>
//         </Card.Body>
//       </Card>

//       {/* Collegamenti */}
//       <Card className="mb-3">
//         <Card.Body className="d-flex justify-content-between align-items-center">
//           <span>Collegamenti</span>
//           <BsPersonPlus />
//         </Card.Body>
//       </Card>

//       {/* Premium */}
//       <Card className="mb-3">
//         <Card.Body>
//           <Card.Text>
//             Accedi a strumenti e informazioni in esclusiva
//           </Card.Text>
//           <Button variant="warning" size="sm">
//             Prova Premium per 0 EUR
//           </Button>
//         </Card.Body>
//       </Card>

//       {/* Elementi salvati */}
// <Card>
//   <ListGroup variant="flush">
//     <ListGroup.Item action>
//       Elementi Salvati
//     </ListGroup.Item>
//     <ListGroup.Item action>
//       Gruppi
//     </ListGroup.Item>
//     <ListGroup.Item action>
//       Newsletter
//     </ListGroup.Item>
//     <ListGroup.Item action>
//       Eventi
//     </ListGroup.Item>
//   </ListGroup>
// </Card>
//     </div>
//   );
// };

// export default ColonnaSxHome;

import { Card, Button, ListGroup } from "react-bootstrap";
import { BsPersonPlus } from "react-icons/bs";
import { useSelector } from "react-redux";

const ColonnaSxHome = () => {
  const user = useSelector((state) => {
    return state.profile;
  });

  return (
    <div style={{ width: "18rem" }}>
      {/* Card profilo */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="text-center p-3">
          <img
            src={user?.userImg || "https://placebear.com/300/300"}
            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
            style={{
              width: "64px",
              height: "64px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          ></img>
          <Card.Title className="fs-6 mb-1">
            {user?.userName + " " + user?.userSurname}{" "}
          </Card.Title>
          <Card.Text className="text-muted small mb-1">
            {user?.userTitle}
          </Card.Text>
          <Card.Text className="text-muted small">{user?.userArea}</Card.Text>
          {/*<Card.Link
            href="#"
            className="small fw-semibold"
            style={{ color: "#0A66C2" }}
          >
            Lavoro
          </Card.Link>*/}
        </Card.Body>
      </Card>

      {/* Collegamenti */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="d-flex justify-content-between align-items-center p-3">
          <span className="small text-muted">Collegamenti</span>
          <BsPersonPlus className="text-secondary" />
        </Card.Body>
      </Card>

      {/* Premium */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <Card.Text className="small text-muted mb-2">
            Accedi a strumenti e informazioni in esclusiva
          </Card.Text>
          <Button
            variant="warning"
            size="sm"
            className="w-100 fw-semibold"
            style={{ borderRadius: "9999px" }}
          >
            Prova Premium per 0 EUR
          </Button>
        </Card.Body>
      </Card>

      {/* Elementi salvati */}
      <Card className="shadow-sm border-0">
        <ListGroup variant="flush">
          <ListGroup.Item action className="py-2 small">
            Elementi Salvati
          </ListGroup.Item>
          <ListGroup.Item action className="py-2 small">
            Gruppi
          </ListGroup.Item>
          <ListGroup.Item action className="py-2 small">
            Newsletter
          </ListGroup.Item>
          <ListGroup.Item action className="py-2 small">
            Eventi
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default ColonnaSxHome;
