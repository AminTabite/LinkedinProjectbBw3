import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BiCamera, BiBrush, BiClipboard } from "react-icons/bi";
import { useState, useEffect } from "react";
import clientApi from "../services/api";
import "./Herosection.css";
import { useSelector } from "react-redux";

const Herosection = ({ userId }) => {
  const [datiProfilo, setDatiProfilo] = useState(null);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);
  const profiloDaRedux = useSelector((state) => {
    return state.profile;
  });

  console.log(profiloDaRedux);

  useEffect(() => {
    const recuperaProfilo = async () => {
      try {
        setCaricamento(true);
        let dati;
        if (userId) {
          // Carica profilo specifico utente
          dati = await clientApi.ottieniProfilo(userId);
        } else {
          // Carica il proprio profilo
          dati = await clientApi.ottieniIlMioProfilo();
        }
        setDatiProfilo(dati);
        console.log(dati);
      } catch (err) {
        setErrore(err.message);
      } finally {
        setCaricamento(false);
      }
    };

    recuperaProfilo();
  }, [userId]);

  if (caricamento) return <div>Caricamento...</div>;
  if (errore) return <div>Errore: {errore}</div>;

  return (
    <Container>
      <Row>
        <Card className="mb-3 p-0 border">
          <div className="position-relative">
            <Card.Img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80"
              alt="cover"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <button
              className="btn btn-light rounded-circle position-absolute"
              style={{ top: "10px", right: "10px" }}
            >
              <BiCamera />
            </button>

            <img
              src={(datiProfilo?.image || profiloDaRedux.userImg) || "https://placebear.com/100/100"}
              alt="profile"
              className="rounded-circle border border-3 border-white position-absolute"
              style={{
                bottom: "10px",
                left: "20px",
                width: "100px",
                height: "100px",
              }}
            />
          </div>
          <Card.Body>
            <div></div>
            <Card.Text>
              <h4 className="mb-0">
                {(datiProfilo?.name && datiProfilo?.surname) 
                  ? `${datiProfilo.name} ${datiProfilo.surname}` 
                  : `${profiloDaRedux?.userName || ''} ${profiloDaRedux?.userSurname || ''}`} 
                <BiClipboard /> He/ Him
              </h4>
              <p className="profession">
                {datiProfilo?.title || profiloDaRedux?.userTitle || "Titolo professionale"}
              </p>
              <p className="location">
                {datiProfilo?.area || profiloDaRedux?.userArea || "Area non specificata"} ⸱{" "}
                <span className="blue500">Informazioni di contatto</span>
              </p>
            </Card.Text>
            <Card.Text>
              <div>
                <p className="blue500">69 collegamenti</p>
              </div>
            </Card.Text>
            <div className="d-flex justify-content-start align-items-center">
              {userId ? (
                <>
                  <button className="me-3 buttonBlue">Messaggio</button>
                  <button className="me-3 buttonOutlineBlue">
                    <span className="text-primary me-1 fw-bold" style={{ fontSize: "18px" }}>+</span>Segui
                  </button>
                  <button className="me-3 buttonOutlineBlue">Altro</button>
                </>
              ) : (
                <>
                  <button className="me-3 buttonBlue">Disponibile per</button>
                  <button className="me-3 buttonOutlineBlue">
                    Aggiungi sezione del profilo
                  </button>
                  <button className="me-3 buttonOutlineBlue">
                    Migliora profilo
                  </button>
                  <button className="buttonOutlineGray">Risorse</button>
                </>
              )}
            </div>
            {!userId && (
              <div className="my-4 heroBox p-3">
                <div className="d-flex justify-content-between">
                  <p className="m-0 fw-bold">Disponibilitá a lavorare</p>
                  <span>
                    <BiBrush />
                  </span>
                </div>
                <p className="m-0">Ruoli di studente diplomato</p>
                <h6>Mostra dettagli</h6>
              </div>
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Herosection;
