import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ColonnaDestra = () => {
  return (
    <div className="d-flex flex-column gap-3" style={{ width: "320px" }}>
      
      {/* Lingua e URL */}
      <div className="border rounded p-3 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Lingua del profilo</h6>
          <i className="bi bi-pencil"></i>
        </div>
        <p className="mb-3 small text-muted">Italiano</p>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Profilo pubblico e URL</h6>
          <i className="bi bi-pencil"></i>
        </div>
        <a
          href="https://www.linkedin.com/in/leonardo-ferrante-22673b353"
          className="small"
        >
          Nome Cognome
        </a>
      </div>

      {/* Annuncio sponsorizzato */}
      <div className="border rounded p-3 bg-white">
                  <div
            className="rounded-circle bg-secondary me-2"
            style={{ width: 40, height: 40 }}
          ></div>

        <span className="badge bg-light text-secondary mb-2">Promosso</span>
        <h6>Edison Next</h6>
        <p className="small mb-2">
          Leonardo, immagina il futuro con Edison Next <br />
          Siamo il tuo partner per la transizione energetica
        </p>
        <button className="btn btn-outline-primary btn-sm">Segui</button>
      </div>

      {/* Altri profili consultati */}
      <div className="border rounded p-3 bg-white">
        <h6 className="mb-3">Altri profili consultati</h6>
        <div className="d-flex align-items-center mb-2">
          <div
            className="rounded-circle bg-secondary me-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div>
            <p className="mb-0 small fw-bold">
                        Nome Cognome
 

            </p>
            <button className="btn btn-outline-secondary btn-sm">
              Visualizza
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-success me-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div>
            <p className="mb-0 small fw-bold">
                       Nome Cognome

            </p>
            <button className="btn btn-outline-secondary btn-sm">
              Visualizza
            </button>
          </div>
        </div>
      </div>

      {/* Persone che potresti conoscere */}
      <div className="border rounded p-3 bg-white">
        <h6 className="mb-3">Persone che potresti conoscere</h6>
        {[
          { name: "Nome Cognome", role: "lorem ipsum" },
          { name: "Nome Cognome", role: "lorem ipsum" },
          { name: "Nome Cognome", role: "lorem ipsum" },
          { name: "Nome Cognome", role: "lorem ipsum" },
          { name: "Nome Cognome", role: "lorem ipsum" },
        ].map((p, idx) => (
          <div key={idx} className="d-flex align-items-center mb-2">
            <div
              className="rounded-circle bg-secondary me-2"
              style={{ width: 40, height: 40 }}
            ></div>
            <div className="flex-grow-1">
              <p className="mb-0 small fw-bold">{p.name}</p>
              <p className="mb-1 small text-muted">{p.role}</p>
              <button className="btn btn-outline-primary btn-sm">
                Collegati
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-link w-100">Mostra tutto</button>
      </div>

      {/* Pagine che potrebbero interessarti */}
      <div className="border rounded p-3 bg-white">
        <h6 className="mb-3">Potrebbe interessarti</h6>

        <div className="mb-3 d-flex">
          <div
            className="rounded-circle bg-secondary me-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div>
            <p className="mb-0 fw-bold small">Poste Italiane</p>
            <p className="mb-1 small text-muted">
              Trasporti, logistica, supply chain...
            </p>
            <button className="btn btn-outline-primary btn-sm">Segui</button>
          </div>
        </div>

        <div className="mb-3 d-flex">
          <div
            className="rounded-circle bg-secondary me-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div>
            <p className="mb-0 fw-bold small">
              Gruppo Ferrovie dello Stato Italiane
            </p>
            <p className="mb-1 small text-muted">Servizi infrastrutturali</p>
            <button className="btn btn-outline-primary btn-sm">Segui</button>
          </div>
        </div>
      </div>

      {/* Annunci extra */}
      <div className="border rounded p-3 bg-white">
        <span className="badge bg-light text-secondary mb-2">Promosso</span>
        <p className="mb-1 small fw-bold">Wave goodbye to busywork</p>
        <p className="small text-muted">
          Every day Zapier saves people 600,000 hours of busywork.
        </p>
      </div>

      <div className="border rounded p-3 bg-white">
        <span className="badge bg-light text-secondary mb-2">Promosso</span>
        <p className="mb-1 small fw-bold">Industrial Adhesives</p>
        <p className="small text-muted">
          Advanced epoxy adhesives, sealants and coatings for hi-tech
          manufacturing.
        </p>
      </div>
    </div>
  );
};

export default ColonnaDestra;
