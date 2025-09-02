import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ottieniUtentiAction } from "../redux/users";
const ColonnaDestra = () => {
  const dispatch = useDispatch();
  const naviga = useNavigate();
  const { arrayUtenti } = useSelector(state => state.users);

  const gestisciVisualizzaProfilo = (idUtente) => {
    naviga(`/profile/${idUtente}`);
  };

  const ottieniDati = () => {
    dispatch(ottieniUtentiAction());
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

        {arrayUtenti && arrayUtenti.length > 0 &&
          arrayUtenti.map((utente) => {
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
        {arrayUtenti && arrayUtenti.length >= 12 &&
          [
            {
              nome: arrayUtenti[4]?.name + " " + arrayUtenti[4]?.surname,
              ruolo: arrayUtenti[4]?.title,
              urlImmagine: arrayUtenti[4]?.image,
              id: arrayUtenti[4]?._id,
            },
            {
              nome: arrayUtenti[3]?.name + " " + arrayUtenti[3]?.surname,
              ruolo: arrayUtenti[3]?.title,
              urlImmagine: arrayUtenti[3]?.image,
              id: arrayUtenti[3]?._id,
            },
            {
              nome: arrayUtenti[2]?.name + " " + arrayUtenti[2]?.surname,
              ruolo: arrayUtenti[2]?.title,
              urlImmagine: arrayUtenti[2]?.image,
              id: arrayUtenti[2]?._id,
            },
            {
              nome: arrayUtenti[1]?.name + " " + arrayUtenti[1]?.surname,
              ruolo: arrayUtenti[1]?.title,
              urlImmagine: arrayUtenti[1]?.image,
              id: arrayUtenti[1]?._id,
            },
            {
              nome: arrayUtenti[0]?.name + " " + arrayUtenti[0]?.surname,
              ruolo: arrayUtenti[0]?.title,
              urlImmagine: arrayUtenti[0]?.image,
              id: arrayUtenti[0]?._id,
            },
          ].filter(persona => persona.nome && persona.id).map((persona, indice) => (
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
