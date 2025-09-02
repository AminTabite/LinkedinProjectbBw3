import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ColonnaDestra = () => {
  const [listaUtenti, setListaUtenti] = useState(null);
  const naviga = useNavigate();

  const gestisciVisualizzaProfilo = (idUtente) => {
    naviga(`/profile/${idUtente}`);
  };

  const ottieniDati = () => {
    fetch("https://striveschool-api.herokuapp.com/api/profile", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTc0YTE2MjdjNjAwMTVmOGM1NjkiLCJpYXQiOjE3NTY3MzEyMTAsImV4cCI6MTc1Nzk0MDgxMH0.2K96iJrH_T9CFLxQjMe3ZEvL5W45fdGe3MGTvDxniIQ",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore caricamento dati");
        }
      })
      .then((data) => {
        setListaUtenti(data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    ottieniDati();
  }, []);

  return (
    <div className="d-flex flex-column gap-3" style={{ width: "18rem" }}>
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
        <img
          src="https://companieslogo.com/img/orig/EDNR.MI-03376c33.png?t=1720244491"
          className="rounded-circle me-2"
          style={{ width: 40, height: 40 }}
        />

        <span className="badge bg-light text-secondary mb-2">Promosso</span>
        <h6>Edison Next</h6>
        <p className="small mb-2">
          Immagina il futuro con Edison Next <br />
          Siamo il tuo partner per la transizione energetica
        </p>
        <button className="btn btn-outline-primary btn-sm">Segui</button>
      </div>

      {/* Altri profili consultati */}
      <div className="border rounded p-3 bg-white">
        <h6 className="mb-3">Altri profili consultati</h6>

        {listaUtenti !== null &&
          listaUtenti.slice(3, 8).map((utente) => {
            return (
              <div key={utente._id} className="d-flex align-items-center mb-2">
                <img
                  src={utente.image}
                  className="rounded-circle  me-2"
                  style={{ width: 40, height: 40 }}
                  alt={`${utente.name} ${utente.surname}`}
                />
                <div>
                  <p className="mb-0 small fw-bold">
                    {utente.name + " " + utente.surname}
                  </p>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => gestisciVisualizzaProfilo(utente._id)}
                  >
                    Visualizza
                  </button>
                </div>
              </div>
            );
          })}

        {/*<div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-success me-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div>
            <p className="mb-0 small fw-bold">Nome Cognome</p>
            <button className="btn btn-outline-secondary btn-sm">
              Visualizza
            </button>
          </div>
        </div>*/}
      </div>

      {/* Persone che potresti conoscere */}
      <div className="border rounded p-3 bg-white">
        <h6 className="mb-3">Persone che potresti conoscere</h6>
        {listaUtenti !== null &&
          [
            {
              nome: listaUtenti[11].name + " " + listaUtenti[11].surname,
              ruolo: listaUtenti[11].title,
              urlImmagine: listaUtenti[11].image,
              id: listaUtenti[11]._id,
            },
            {
              nome: listaUtenti[7].name + " " + listaUtenti[7].surname,
              ruolo: listaUtenti[7].title,
              urlImmagine: listaUtenti[7].image,
              id: listaUtenti[7]._id,
            },
            {
              nome: listaUtenti[8].name + " " + listaUtenti[8].surname,
              ruolo: listaUtenti[8].title,
              urlImmagine: listaUtenti[8].image,
              id: listaUtenti[8]._id,
            },
            {
              nome: listaUtenti[9].name + " " + listaUtenti[9].surname,
              ruolo: listaUtenti[9].title,
              urlImmagine: listaUtenti[9].image,
              id: listaUtenti[9]._id,
            },
            {
              nome: listaUtenti[10].name + " " + listaUtenti[10].surname,
              ruolo: listaUtenti[10].title,
              urlImmagine: listaUtenti[10].image,
              id: listaUtenti[10]._id,
            },
          ].map((persona, indice) => (
            <div key={indice} className="d-flex align-items-center mb-2">
              <img
                src={persona.urlImmagine}
                className="rounded-circle bg-secondary me-2"
                style={{ width: 40, height: 40 }}
                alt={persona.nome}
              />
              <div className="flex-grow-1">
                <p className="mb-0 small fw-bold">{persona.nome}</p>
                <p className="mb-1 small text-muted">{persona.ruolo}</p>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => gestisciVisualizzaProfilo(persona.id)}
                >
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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Logo_Poste_Italiane.svg"
            alt="Poste Italiane"
            className="me-2"
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "4px",
            }}
          />
          <div>
            <p className="mb-0 fw-bold small">Poste Italiane</p>
            <p className="mb-1 small text-muted">
              Trasporti, logistica, supply chain...
            </p>
            <button className="btn btn-outline-primary btn-sm">Segui</button>
          </div>
        </div>

        <div className="mb-3 d-flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Logo_Ferrovie_dello_Stato_Italiane.svg"
            alt="Gruppo Ferrovie dello Stato Italiane"
            className="me-2"
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "4px",
            }}
          />
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
