import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaEllipsisH,
  FaTimes,
  FaPlus,
  FaEye,
  FaUsers,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";
import { BsGear, BsBookmark, BsPerson } from "react-icons/bs";
import clientApi from "../services/api";

const PaginaLavoro = () => {
  const [searchParams] = useSearchParams();
  const [lavori, setLavori] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [datiProfilo, setDatiProfilo] = useState(null);
  const [listaUtenti, setListaUtenti] = useState([]);
  const [mostraTuttiLavori, setMostraTuttiLavori] = useState(false);
  const [menuAperto, setMenuAperto] = useState(null);

  useEffect(() => {
    const recuperaDati = async () => {
      try {
        setCaricamento(true);
        const searchQuery = searchParams.get("search") || "";

        const [profilo, utenti, datiLavori] = await Promise.all([
          clientApi.ottieniIlMioProfilo(),
          clientApi.ottieniTuttiIProfili(),
          clientApi.cercaLavori(searchQuery, 15),
        ]);
        setDatiProfilo(profilo);
        setListaUtenti(utenti);
        setLavori(datiLavori.data || []);
        setMostraTuttiLavori(false); // Reset quando cambia la ricerca
      } catch (err) {
        console.error("Errore nel recupero dei dati:", err);
        setLavori([]);
        setListaUtenti([]);
      } finally {
        setCaricamento(false);
      }
    };

    recuperaDati();
  }, [searchParams]);

  const ottieniLavoriDaMostrare = () => {
    return mostraTuttiLavori ? lavori : lavori.slice(0, 3);
  };

  const formattaData = (stringaData) => {
    const data = new Date(stringaData);
    const ora = new Date();
    const differenzaTempo = Math.abs(ora - data);
    const differenzaGiorni = Math.ceil(differenzaTempo / (1000 * 60 * 60 * 24));

    if (differenzaGiorni === 1) return "1 giorno fa";
    if (differenzaGiorni < 7) return `${differenzaGiorni} giorni fa`;
    if (differenzaGiorni < 30)
      return `${Math.ceil(differenzaGiorni / 7)} settimane fa`;
    return `${Math.ceil(differenzaGiorni / 30)} mesi fa`;
  };

  const gestisciRimuoviLavoro = (lavoroId) => {
    setLavori(lavori.filter((lavoro) => lavoro._id !== lavoroId));
    setMenuAperto(null);
  };

  const gestisciToggleMenu = (lavoroId) => {
    setMenuAperto(menuAperto === lavoroId ? null : lavoroId);
  };

  const gestisciChiudiMenu = () => setMenuAperto(null);

  return (
    <div style={{ background: "#F4F2EE", minHeight: "100vh" }}>
      <Container fluid style={{ paddingTop: "72px", maxWidth: "1200px" }}>
        <Row>
          {/* Sidebar sinistra - Mini Hero Section */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="sticky-top" style={{ top: "80px" }}>
              {/* Mini Hero Section con Profilo */}
              <Card
                className="mb-2 border-0"
                style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <div className="position-relative">
                  {/* Background cover image */}
                  <div
                    style={{
                      height: "54px",
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "8px 8px 0 0",
                    }}></div>

                  {/* Profile image */}
                  <div
                    className="position-absolute"
                    style={{ top: "20px", left: "12px" }}>
                    <img
                      src={
                        datiProfilo?.image ||
                        "https://via.placeholder.com/68x68/0a66c2/ffffff?text=U"
                      }
                      alt="Profilo"
                      className="rounded-circle border border-3 border-white"
                      style={{
                        width: "68px",
                        height: "68px",
                        objectFit: "cover",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                </div>

                <Card.Body
                  className="pt-4 px-3 pb-3"
                  style={{ marginTop: "14px" }}>
                  <h6
                    className="mb-1 fw-semibold d-flex align-items-center"
                    style={{ fontSize: "16px" }}>
                    <span className="me-2">
                      {datiProfilo
                        ? `${datiProfilo.name || ""} ${
                            datiProfilo.surname || ""
                          }`.trim()
                        : "Utente"}
                    </span>
                    <div
                      className="position-relative"
                      style={{ fontSize: "12px" }}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 2Z"
                          fill="white"
                          stroke="#666"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span
                        className="position-absolute top-50 start-50 translate-middle fw-bold"
                        style={{ fontSize: "8px", color: "#666" }}>
                        ✓
                      </span>
                    </div>
                  </h6>
                  <p
                    className="text-muted small mb-0"
                    style={{ fontSize: "12px", lineHeight: "1.3" }}>
                    {datiProfilo?.title || "Titolo professionale"}
                  </p>
                </Card.Body>
              </Card>

              {/* Menu opzioni */}
              <Card
                className="mb-2 border-0"
                style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-3">
                  <div
                    className="d-flex align-items-center mb-5"
                    style={{ cursor: "pointer" }}>
                    <BsGear size={18} className="text-muted me-3" />
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>
                      Preferenze
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center mb-5"
                    style={{ cursor: "pointer" }}>
                    <BsBookmark size={18} className="text-muted me-3" />
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>
                      Le mie offerte di lavoro
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center mb-3"
                    style={{ cursor: "pointer" }}>
                    <BsPerson size={18} className="text-muted me-3" />
                    <span className="fw-semibold" style={{ fontSize: "14px" }}>
                      Le mie informazioni sulla carriera
                    </span>
                  </div>
                  <hr className="my-0" />
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ cursor: "pointer" }}>
                    <FaPlus
                      size={18}
                      className="me-3"
                      style={{ color: "#0a66c2" }}
                    />
                    <span
                      className="fw-semibold"
                      style={{
                        fontSize: "14px",
                        color: "#0a66c2",
                        textDecoration: "underline",
                      }}>
                      Pubblica offerta gratuita
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Contenuto centrale */}
          <Col lg={9} xs={12}>
            {caricamento && (
              <Card
                className="border-0 mb-2"
                style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-4 text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Caricamento...</span>
                  </div>
                  <p className="mt-2 mb-0 small">
                    Caricamento offerte di lavoro...
                  </p>
                </Card.Body>
              </Card>
            )}

            {!caricamento && lavori.length === 0 && (
              <Card
                className="border-0 mb-2"
                style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-4 text-center">
                  <FaBriefcase size={40} className="text-muted mb-3" />
                  <h6>Nessuna offerta trovata</h6>
                  <p className="text-muted small">
                    Prova a modificare i filtri di ricerca
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Card contenitore unica per tutti i lavori */}
            {!caricamento && lavori.length > 0 && (
              <Card
                className="border-0 mb-2"
                style={{ backgroundColor: "white", borderRadius: "8px" }}>
                <Card.Body className="p-0">
                  {/* Titolo della card */}
                  <div className="px-3 py-3">
                    <h6
                      className="mb-1 fw-semibold"
                      style={{ fontSize: "18px" }}>
                      Le principali offerte di lavoro per te
                    </h6>
                    <p
                      className="mb-0 small text-muted"
                      style={{
                        opacity: "0.7",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      In base al tuo profilo, alle tue preferenze e ad attività
                      come candidature, ricerche e salvataggi
                    </p>
                  </div>
                  {/* Lista lavori */}
                  {ottieniLavoriDaMostrare().map((lavoro, indice) => (
                    <div
                      key={lavoro._id}
                      className={`p-3 ${
                        indice !== ottieniLavoriDaMostrare().length - 1
                          ? "border-bottom"
                          : ""
                      }`}>
                      <div className="d-flex align-items-start">
                        {/* Logo azienda */}
                        <div
                          className="rounded me-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: "#0a66c2",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}>
                          {lavoro.company_name
                            ? lavoro.company_name.charAt(0).toUpperCase()
                            : "?"}
                        </div>

                        {/* Nome lavoro */}
                        <div className="flex-grow-1 min-width-0">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6
                              className="mb-0 fw-semibold"
                              style={{
                                fontSize: "16px",
                                lineHeight: "1.25",
                                color: "#0a66c2",
                              }}>
                              {lavoro.title}
                            </h6>
                            <div className="d-flex align-items-center ms-2 position-relative">
                              <div
                                onClick={() => gestisciToggleMenu(lavoro._id)}
                                style={{ cursor: "pointer", padding: "4px" }}>
                                <FaEllipsisH
                                  size={16}
                                  className="text-muted me-2"
                                />
                              </div>
                              <div
                                onClick={() =>
                                  gestisciRimuoviLavoro(lavoro._id)
                                }
                                style={{ cursor: "pointer", padding: "4px" }}>
                                <FaTimes size={16} className="text-muted" />
                              </div>

                              {menuAperto === lavoro._id && (
                                <>
                                  <div
                                    className="position-fixed top-0 start-0 w-100 h-100"
                                    style={{ zIndex: 999 }}
                                    onClick={gestisciChiudiMenu}></div>
                                  <div
                                    className="position-absolute bg-white border rounded shadow-lg"
                                    style={{
                                      top: "100%",
                                      right: "0",
                                      zIndex: 1000,
                                      minWidth: "280px",
                                      marginTop: "4px",
                                    }}>
                                    <div className="p-3">
                                      <div
                                        className="fw-semibold mb-2"
                                        style={{ fontSize: "14px" }}>
                                        Perché vedo questa offerta di lavoro?
                                      </div>
                                      <div className="text-muted small">
                                        Questa offerta è stata selezionata in
                                        base al tuo profilo, alle tue preferenze
                                        e ad attività come candidature, ricerche
                                        e salvataggi precedenti.
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-muted small mb-1">
                            {lavoro.company_name || "Azienda"}
                          </div>

                          <div className="d-flex align-items-center text-muted small">
                            <FaMapMarkerAlt size={12} className="me-1" />
                            <span className="me-3">
                              {lavoro.candidate_required_location ||
                                "Non specificato"}
                            </span>
                            <FaClock size={12} className="me-1" />
                            <span>{formattaData(lavoro.publication_date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {lavori.length > 3 && (
                    <div className="p-3 text-center border-top">
                      {!mostraTuttiLavori ? (
                        <Button
                          variant="link"
                          className="fw-semibold text-muted"
                          onClick={() => setMostraTuttiLavori(true)}
                          style={{ textDecoration: "none", fontSize: "14px" }}>
                          Mostra tutto{" "}
                          <FaArrowRight size={12} className="ms-1" />
                        </Button>
                      ) : (
                        <Button
                          variant="link"
                          className="fw-semibold text-muted"
                          onClick={() => setMostraTuttiLavori(false)}
                          style={{ textDecoration: "none", fontSize: "14px" }}>
                          Mostra meno
                        </Button>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}

            <Card
              className="border-0 mb-2"
              style={{ backgroundColor: "white", borderRadius: "8px" }}>
              <Card.Body className="p-3">
                <h6 className="mb-3 fw-semibold" style={{ fontSize: "18px" }}>
                  Altri suggerimenti per te
                </h6>

                <div
                  className="d-flex align-items-center mb-3 p-2"
                  style={{ cursor: "pointer", borderRadius: "4px" }}>
                  <div
                    className="rounded me-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#0a66c2",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}>
                    <FaUsers size={16} />
                  </div>
                  <div className="flex-grow-1">
                    <div
                      className="fw-semibold mb-1"
                      style={{ fontSize: "14px" }}>
                      Esplora la tua rete professionale
                    </div>
                    <div className="text-muted small">
                      Scopri nuove opportunità attraverso i tuoi collegamenti
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center mb-3 p-2"
                  style={{ cursor: "pointer", borderRadius: "4px" }}>
                  <div
                    className="rounded me-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#0a66c2",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}>
                    <FaEye size={16} />
                  </div>
                  <div className="flex-grow-1">
                    <div
                      className="fw-semibold mb-1"
                      style={{ fontSize: "14px" }}>
                      Imposta avvisi di lavoro personalizzati
                    </div>
                    <div className="text-muted small">
                      Ricevi notifiche per le offerte che ti interessano
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center p-2"
                  style={{ cursor: "pointer", borderRadius: "4px" }}>
                  <div
                    className="rounded me-3 d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#0a66c2",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}>
                    <FaClipboardList size={16} />
                  </div>
                  <div className="flex-grow-1">
                    <div
                      className="fw-semibold mb-1"
                      style={{ fontSize: "14px" }}>
                      Aggiorna il tuo profilo professionale
                    </div>
                    <div className="text-muted small">
                      Migliora le tue possibilità di essere trovato dai
                      recruiter
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card
              className="border-0 mb-2"
              style={{ backgroundColor: "white", borderRadius: "8px" }}>
              <Card.Body className="p-3">
                <div className="d-flex align-items-start">
                  <div className="me-3 flex-shrink-0">
                    <img
                      src={
                        datiProfilo?.image ||
                        "https://via.placeholder.com/48x48/0a66c2/ffffff?text=U"
                      }
                      alt="Profilo"
                      className="rounded-circle"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6
                      className="mb-2 fw-semibold"
                      style={{ fontSize: "16px" }}>
                      Cerca lavoro in modo più smart con Premium
                    </h6>
                    <div className="d-flex align-items-center mb-3">
                      <div
                        className="me-2"
                        style={{
                          position: "relative",
                          width: "60px",
                          height: "24px",
                        }}>
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face"
                          alt="Sarah Johnson"
                          className="rounded-circle border border-white"
                          style={{
                            width: "24px",
                            height: "24px",
                            position: "absolute",
                            left: "0px",
                            zIndex: 3,
                            objectFit: "cover",
                          }}
                        />
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face"
                          alt="Michael Chen"
                          className="rounded-circle border border-white"
                          style={{
                            width: "24px",
                            height: "24px",
                            position: "absolute",
                            left: "16px",
                            zIndex: 2,
                            objectFit: "cover",
                          }}
                        />
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=24&h=24&fit=crop&crop=face"
                          alt="Elena Rodriguez"
                          className="rounded-circle border border-white"
                          style={{
                            width: "24px",
                            height: "24px",
                            position: "absolute",
                            left: "32px",
                            zIndex: 1,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <span
                        className="text-muted small"
                        style={{ fontSize: "12px" }}>
                        Milioni di utenti usano Premium
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-sm fw-semibold"
                        style={{
                          borderRadius: "20px",
                          fontSize: "14px",
                          padding: "6px 16px",
                          backgroundColor: "rgba(245, 158, 11, 0.8)",
                          color: "black",
                          border: "1px solid #f59e0b",
                        }}>
                        Prova Premium per 0 EUR
                      </button>
                    </div>
                    <p
                      className="text-muted small mb-0"
                      style={{ fontSize: "11px", lineHeight: "1.3" }}>
                      Prova gratuita di 1 mese. Annulli in qualsiasi momento. Ti
                      invieremo un promemoria 7 giorni prima della fine del
                      periodo di prova.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default PaginaLavoro;
