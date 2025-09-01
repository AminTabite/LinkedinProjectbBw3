import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
const ColonnaDestra = () => {
  const [userList, setUserList] = useState(null);

  const getData = () => {
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
        console.log(data);
        setUserList(data);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex flex-column gap-3">
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
          Immagina il futuro con Edison Next <br />
          Siamo il tuo partner per la transizione energetica
        </p>
        <button className="btn btn-outline-primary btn-sm">Segui</button>
      </div>

      {/* Altri profili consultati */}
      <div className="border rounded p-3 bg-white">
        <h6 className="mb-3">Altri profili consultati</h6>

        {userList !== null &&
          userList.slice(0, 5).map((user) => {
            return (
              <div className="d-flex align-items-center mb-2">
                <img
                  src={user.image}
                  className="rounded-circle  me-2"
                  style={{ width: 40, height: 40 }}
                ></img>
                <div>
                  <p className="mb-0 small fw-bold">
                    {user.name + " " + user.surname}
                  </p>
                  <button className="btn btn-outline-secondary btn-sm">
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
        {userList !== null &&
          [
            {
              name: userList[6].name + " " + userList[6].surname,
              role: userList[6].title,
              imgUrl: userList[6].image,
            },
            {
              name: userList[7].name + " " + userList[7].surname,
              role: userList[7].title,
              imgUrl: userList[7].image,
            },
            {
              name: userList[8].name + " " + userList[8].surname,
              role: userList[8].title,
              imgUrl: userList[8].image,
            },
            {
              name: userList[9].name + " " + userList[9].surname,
              role: userList[9].title,
              imgUrl: userList[9].image,
            },
            {
              name: userList[10].name + " " + userList[10].surname,
              role: userList[10].title,
              imgUrl: userList[10].image,
            },
          ].map((p, idx) => (
            <div key={idx} className="d-flex align-items-center mb-2">
              <img
                src={p.imgUrl}
                className="rounded-circle bg-secondary me-2"
                style={{ width: 40, height: 40 }}
              ></img>
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
