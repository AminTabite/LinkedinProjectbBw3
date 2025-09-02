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
    <div style={{ width: "16rem", marginLeft: "2rem" }}>
      {/* Card profilo */}
      <Card className="mb-3 shadow-sm border-0">
        <div className="position-relative">
          <Card.Img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80"
            alt="cover"
            style={{ height: "80px", objectFit: "cover" }}
          />
          <img
            src={user?.userImg || "https://placebear.com/300/300"}
            className="rounded-circle border border-3 border-white position-absolute"
            style={{
              width: "64px",
              height: "64px",
              bottom: "-32px",
              left: "20px",
              objectFit: "cover",
            }}
          />
        </div>
        <Card.Body className="p-3" style={{ paddingTop: "40px !important" }}>
          <div className="d-flex align-items-start">
            <div className="flex-grow-1" style={{ marginLeft: "80px" }}>
              <Card.Title className="fs-6 mb-1">
                {user?.userName + " " + user?.userSurname}
              </Card.Title>
              <Card.Text className="text-muted small mb-1">
                {user?.userTitle}
              </Card.Text>
              <Card.Text className="text-muted small">{user?.userArea}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Collegamenti */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="small fw-semibold" style={{ color: "black" }}>Collegamenti</span>
            <BsPersonPlus className="text-secondary" />
          </div>
          <p className="small mb-0 mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>Espandi la tua rete</p>
        </Card.Body>
      </Card>

      {/* Premium */}
      <Card className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3">
          <Card.Text className="small text-muted mb-2">
            Trova lavoro più velocemente con Premium
          </Card.Text>
          <div className="d-flex align-items-center">
            <div 
              className="me-2" 
              style={{ 
                width: "16px", 
                height: "16px", 
                background: "linear-gradient(135deg, #DBA800 0%, #B8860B 100%)",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                fontWeight: "bold",
                color: "white",
                boxShadow: "0 1px 2px rgba(0,0,0,0.15)"
              }}
            >
              ✦
            </div>
            <span className="small fw-semibold text-dark">Prova per 0 EUR</span>
          </div>
        </Card.Body>
      </Card>

      {/* Elementi salvati */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <div 
            className="px-3 py-2 d-flex align-items-center"
            style={{ 
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#666",
              borderBottom: "none"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f2ef"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            <i className="bi bi-bookmark-fill me-2" style={{ color: "#666", fontSize: "14px" }}></i>
            Elementi salvati
          </div>
          <div 
            className="px-3 py-2 d-flex align-items-center"
            style={{ 
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#666",
              borderBottom: "none"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f2ef"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            <i className="bi bi-people-fill me-2" style={{ color: "#666", fontSize: "14px" }}></i>
            Gruppi
          </div>
          <div 
            className="px-3 py-2 d-flex align-items-center"
            style={{ 
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#666",
              borderBottom: "none"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f2ef"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            <i className="bi bi-newspaper me-2" style={{ color: "#666", fontSize: "14px" }}></i>
            Newsletter
          </div>
          <div 
            className="px-3 py-2 d-flex align-items-center"
            style={{ 
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#666"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f3f2ef"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            <i className="bi bi-calendar-event-fill me-2" style={{ color: "#666", fontSize: "14px" }}></i>
            Eventi
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ColonnaSxHome;
