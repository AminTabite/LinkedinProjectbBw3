import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BiCamera, BiBrush, BiClipboard } from "react-icons/bi";
import { useState, useEffect } from "react";
import clientApi from "../services/api";
import "./Herosection.css";

const Herosection = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await clientApi.ottieniIlMioProfilo();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Row>
        <Card>
          <div className="position-relative">
            <Card.Img
              src="https://placehold.co/600x200"
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
              src={profileData?.image || "https://placebear.com/100/100"}
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
            <Card.Title>
              {profileData?.name} {profileData?.surname}{" "}
              <span>
                <BiClipboard /> <span>He/ Him</span>
              </span>
            </Card.Title>
            <Card.Text>
              {profileData?.title || "Titolo professionale"}
            </Card.Text>
            <Card.Text>
              <div>
                <h6>{profileData?.bio || "Bio"}</h6>
                <p>{profileData?.area || "Area non specificata"}</p>
                <p>69 collegamenti</p>
              </div>
            </Card.Text>
            <div className="d-flex justify-content-lg-start justify-content-start align-items-center">
              <Button className="rounded-5" variant="primary">
                Disponibile per
              </Button>
              <Button className="rounded-5 g-1" variant="outline-primary">
                Aggiungi sezione
              </Button>
              <Button className="rounded-5 g-1" variant="outline-primary">
                Migliora profilo
              </Button>
              <Button className="rounded-5 g-1" variant="outline-dark">
                <span className="d-lg-none">...</span>
                <span className="d-none d-lg-inline">Risorse</span>
              </Button>
            </div>
            <div className="d-flex flex-column justify-content-start bg-body-tertiary  my-4">
              <div className="d-flex justify-content-between">
                <h5>Disponibilitá a lavorare</h5>
                <span>
                  <BiBrush />
                </span>
              </div>

              <p>Ruoli di studente diplomato</p>

              <h6>Mostra dettagli</h6>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Herosection;
