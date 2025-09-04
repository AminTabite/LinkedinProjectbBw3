import { Container } from "react-bootstrap";

export default function MiniFooter() {
  return (
    <div className="mt-3 text-center">
      <Container className="px-2">
        <div className="d-flex flex-wrap justify-content-center small text-muted mb-2">
          <span className="mx-2 mb-1">Informazioni</span>
          <span className="mx-2 mb-1">Accessibilità</span>
          <span className="mx-2 mb-1">Centro assistenza</span>
          <span className="mx-2 mb-1">Privacy e condizioni ▾</span>
          <span className="mx-2 mb-1">
            Opzioni per gli annunci pubblicitari
          </span>
          <span className="mx-2 mb-1">Pubblicità</span>
          <span className="mx-2 mb-1">Servizi alle aziende ▾</span>
          <span className="mx-2 mb-1">Scarica l’app LinkedIn</span>
          <span className="mx-2 mb-1">Altro</span>
        </div>

        <div className="d-flex align-items-center justify-content-center small text-muted">
          <span
            className="fw-bold me-1"
            style={{ color: "#0A66C2", fontSize: "14px" }}
          >
            Linked
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#0A66C2",
                color: "white",
                borderRadius: "3px",
                padding: "0 2px",
                fontSize: "12px",
                marginLeft: "2px",
              }}
            >
              in
            </span>
          </span>
          <span className="ms-1">LinkedIn Corporation © 2025</span>
        </div>
      </Container>
    </div>
  );
}
