import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BiCamera, BiBrush, BiClipboard } from "react-icons/bi";
import { useState, useEffect } from "react";
import clientApi from "../services/api";
import "./Herosection.css";
import { useSelector } from "react-redux";

const Herosection = () => {
  //const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prof = useSelector((state) => {
    return state.profile;
  });

  console.log(prof);

  /*useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await clientApi.ottieniIlMioProfilo();
        //setProfileData(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;*/

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
              style={{ top: "10px", right: "10px" }}>
              <BiCamera />
            </button>

            <img
              src={prof.userImg || "https://placebear.com/100/100"}
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
                {prof?.userName} {prof?.userSurname} <BiClipboard /> He/ Him
              </h4>
              <p className="profession">
                {prof?.userTitle || "Titolo professionale"}
              </p>
              <p className="location">
                {prof?.userArea || "Area non specificata"} ⸱{" "}
                <span className="blue500">Informazioni di contatto</span>
              </p>
            </Card.Text>
            <Card.Text>
              <div>
                <p className="blue500">69 collegamenti</p>
              </div>
            </Card.Text>
            <div className="d-flex justify-content-start align-items-center">
              <button className="me-3 buttonBlue">Disponibile per</button>
              <button className="me-3 buttonOutlineBlue">
                Aggiungi sezione del profilo
              </button>
              <button className="me-3 buttonOutlineBlue">
                Migliora profilo
              </button>
              <button className="buttonOutlineGray">Risorse</button>
            </div>
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
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Herosection;

const endpoint = "https://api.example.com/data";
const token = "IL_TUO_TOKEN_QUI"; // il tuo token

const fetchWithToken = async (method = "GET", bodyData = null) => {
  try {
    const res = await fetch(endpoint, {
      method, // GET, POST, PUT, DELETE
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: bodyData ? JSON.stringify(bodyData) : null, // solo per POST/PUT
    });

    if (!res.ok) throw new Error(`Errore HTTP ${res.status}`);
    const data = await res.json();
    console.log(`${method}:`, data);
  } catch (err) {
    console.log(`Errore ${method}:`, err);
  }
};

// ✅ Esempi di utilizzo
fetchWithToken("GET"); // leggere dati
fetchWithToken("POST", { name: "Mario", age: 25 }); // creare dati
fetchWithToken("PUT", { name: "Luigi", age: 30 }); // aggiornare dati
fetchWithToken("DELETE"); // eliminare dati
