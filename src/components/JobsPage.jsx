import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaClock, 
  FaBookmark, 
  FaSearch, 
  FaBuilding,
  FaUsers,
  FaSlidersH,
  FaEllipsisH,
  FaTimes,
  FaPlus,
  FaEye,
  FaCog,
  FaClipboardList,
  FaUserTie,
  FaRegBookmark,
  FaRegHeart
} from "react-icons/fa";
import { BsGear, BsBookmark, BsPerson } from "react-icons/bs";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import clientApi from "../services/api";

const PaginaLavoro = () => {
  const [searchParams] = useSearchParams();
  const [lavori, setLavori] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [datiProfilo, setDatiProfilo] = useState(null);
  const [listaUtenti, setListaUtenti] = useState(null);
  const [mostraTuttiLavori, setMostraTuttiLavori] = useState(false);

  useEffect(() => {
    const recuperaDati = async () => {
      try {
        setCaricamento(true);
        const searchQuery = searchParams.get('search') || "";
        
        const [profilo, utenti, datiLavori] = await Promise.all([
          clientApi.ottieniIlMioProfilo(),
          clientApi.ottieniTuttiIProfili(),
          clientApi.cercaLavori(searchQuery, 15)
        ]);
        setDatiProfilo(profilo);
        setListaUtenti(utenti);
        setLavori(datiLavori.data || []);
        setMostraTuttiLavori(false); // Reset quando cambia la ricerca
      } catch (err) {
        console.error('Errore nel recupero dei dati:', err);
      } finally {
        setCaricamento(false);
      }
    };

    recuperaDati();
  }, [searchParams]);


  // Funzione per determinare quanti lavori mostrare
  const ottieniLavoriDaMostrare = () => {
    if (mostraTuttiLavori) {
      return lavori;
    }
    return lavori.slice(0, 3);
  };

  const formattaData = (stringaData) => {
    const data = new Date(stringaData);
    const ora = new Date();
    const differenzaTempo = Math.abs(ora - data);
    const differenzaGiorni = Math.ceil(differenzaTempo / (1000 * 60 * 60 * 24));
    
    if (differenzaGiorni === 1) return "1 giorno fa";
    if (differenzaGiorni < 7) return `${differenzaGiorni} giorni fa`;
    if (differenzaGiorni < 30) return `${Math.ceil(differenzaGiorni / 7)} settimane fa`;
    return `${Math.ceil(differenzaGiorni / 30)} mesi fa`;
  };

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100vh" }}>
      <Container fluid style={{ paddingTop: "72px", maxWidth: "1200px" }}>
        <Row>
          {/* Sidebar sinistra - Mini Hero Section */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="sticky-top" style={{ top: "80px" }}>
              {/* Mini Hero Section con Profilo */}
              <Card className="mb-2 border-0" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <div className="position-relative">
                  {/* Background cover image */}
                  <div 
                    style={{
                      height: "54px",
                      backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "8px 8px 0 0"
                    }}
                  ></div>
                  
                  {/* Profile image */}
                  <div className="position-absolute" style={{ top: "20px", left: "12px" }}>
                    <img 
                      src={datiProfilo?.image || "https://via.placeholder.com/68x68/0a66c2/ffffff?text=U"} 
                      alt="Profilo" 
                      className="rounded-circle border border-3 border-white"
                      style={{ 
                        width: "68px", 
                        height: "68px", 
                        objectFit: "cover",
                        backgroundColor: "white"
                      }}
                    />
                  </div>
                </div>
                
                <Card.Body className="pt-4 px-3 pb-3" style={{ marginTop: "14px" }}>
                  {/* Solo nome e titolo */}
                  <h6 className="mb-1 fw-semibold" style={{ fontSize: "16px" }}>
                    {datiProfilo ? `${datiProfilo.name || ''} ${datiProfilo.surname || ''}`.trim() : 'Utente'}
                  </h6>
                  <p className="text-muted small mb-0" style={{ fontSize: "12px", lineHeight: "1.3" }}>
                    {datiProfilo?.title || "Titolo professionale"}
                  </p>
                </Card.Body>
              </Card>

              {/* Menu opzioni */}
              <Card className="mb-2 border-0" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center mb-5" style={{ cursor: "pointer" }}>
                    <BsGear size={18} className="text-muted me-3" />
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>Preferenze</span>
                  </div>
                  <div className="d-flex align-items-center mb-5" style={{ cursor: "pointer" }}>
                    <BsBookmark size={18} className="text-muted me-3" />
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>Le mie offerte di lavoro</span>
                  </div>
                  <div className="d-flex align-items-center mb-3" style={{ cursor: "pointer" }}>
                    <BsPerson size={18} className="text-muted me-3" />
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>Le mie informazioni sulla carriera</span>
                  </div>
                  <hr className="my-0" />
                  <div className="d-flex align-items-center mt-3" style={{ cursor: "pointer" }}>
                    <FaPlus size={18} className="me-3" style={{ color: "#0a66c2" }} />
                    <span className="fw-semibold" style={{ fontSize: "14px", color: "#0a66c2" }}>
                      Pubblica offerta gratuita
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Contenuto centrale */}
          <Col lg={9} xs={12}>

            {/* Loading state */}
            {caricamento && (
              <Card className="border-0 mb-2" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-4 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                  </div>
                  <p className="mt-2 mb-0 small">Caricamento offerte di lavoro...</p>
                </Card.Body>
              </Card>
            )}

            {/* Lista lavori */}
            {!caricamento && lavori.length === 0 && (
              <Card className="border-0 mb-2" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-4 text-center">
                  <FaBriefcase size={40} className="text-muted mb-3" />
                  <h6>Nessuna offerta trovata</h6>
                  <p className="text-muted small">Prova a modificare i filtri di ricerca</p>
                </Card.Body>
              </Card>
            )}

            {/* Card contenitore unica per tutti i lavori */}
            {!caricamento && lavori.length > 0 && (
              <Card className="border-0 mb-2" style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-0">
                  {/* Titolo della card */}
                  <div className="px-3 py-3">
                    <h6 className="mb-1 fw-semibold" style={{ fontSize: "18px" }}>
                      Le principali offerte di lavoro per te
                    </h6>
                    <p className="mb-0 small text-muted" style={{ opacity: "0.7", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      In base al tuo profilo, alle tue preferenze e ad attività come candidature, ricerche e salvataggi
                    </p>
                  </div>
                  {/* Lista lavori */}
                  {ottieniLavoriDaMostrare().map((lavoro, indice) => (
                    <div key={lavoro._id} className={`p-3 ${indice !== ottieniLavoriDaMostrare().length - 1 ? 'border-bottom' : ''}`}>
                      <div className="d-flex align-items-center">
                        {/* Logo azienda */}
                        <div 
                          className="rounded me-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ 
                            width: "48px", 
                            height: "48px", 
                            backgroundColor: "#0a66c2",
                            fontSize: "16px",
                            fontWeight: "600"
                          }}
                        >
                          {lavoro.company_name ? lavoro.company_name.charAt(0).toUpperCase() : "?"}
                        </div>
                        
                        {/* Nome lavoro */}
                        <div className="flex-grow-1 min-width-0">
                          <h6 className="mb-0 fw-semibold" style={{ fontSize: "16px", lineHeight: "1.25", color: "#0a66c2" }}>
                            {lavoro.title}
                          </h6>
                          <div className="text-muted small mb-1">
                            {lavoro.company_name || "Azienda"}
                          </div>
                          
                          {/* Luogo e data */}
                          <div className="d-flex align-items-center text-muted small">
                            <FaMapMarkerAlt size={12} className="me-1" />
                            <span className="me-3">{lavoro.candidate_required_location || "Non specificato"}</span>
                            <FaClock size={12} className="me-1" />
                            <span>{formattaData(lavoro.publication_date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Bottone Mostra tutto / Mostra meno */}
                  {lavori.length > 3 && (
                    <div className="p-3 text-center border-top">
                      {!mostraTuttiLavori ? (
                        <Button 
                          variant="link" 
                          className="fw-semibold text-muted"
                          onClick={() => setMostraTuttiLavori(true)}
                          style={{ textDecoration: "none", fontSize: "14px" }}
                        >
                          Mostra tutto <FaArrowRight size={12} className="ms-1" />
                        </Button>
                      ) : (
                        <Button 
                          variant="link" 
                          className="fw-semibold text-muted"
                          onClick={() => setMostraTuttiLavori(false)}
                          style={{ textDecoration: "none", fontSize: "14px" }}
                        >
                          Mostra meno
                        </Button>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}

          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default PaginaLavoro;