import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Dropdown,
  Badge,
} from "react-bootstrap";
import {
  FaLinkedin,
  FaSearch,
  FaHome,
  FaUsers,
  FaBriefcase,
  FaCommentDots,
  FaBell,
  FaCaretDown,
  FaCode,
  FaChartLine,
  FaPalette,
  FaDollarSign,
  FaCog,
  FaChartBar,
} from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clientApi from "../services/api";
import { useDispatch, useSelector } from "react-redux";

const BarraNavigazioneLinkedIn = () => {
  const posizioneCorrente = useLocation();
  const navigate = useNavigate();
  const [valoreRicerca, setValoreRicerca] = useState("");
  const [datiProfilo, setDatiProfilo] = useState(null);
  const [caricamento, setCaricamento] = useState(true);
  const [mostraDropdown, setMostraDropdown] = useState(false);
  const [suggerimentiCategorie, setSuggerimentiCategorie] = useState([]);
  const [loading, setLoading] = useState(true);

  const eAttivo = (percorso) => posizioneCorrente.pathname === percorso;

  const dispatch = useDispatch();

  const getJobsData = () => {
    fetch("https://strive-benchmark.herokuapp.com/api/jobs")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore");
        }
      })
      .then((data) => {
        dispatch({
          type: "GET_JOBS",
          payload: data.data.slice(0, 15),
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const getUsers = () => {
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
          throw new Error("errore");
        }
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "GET_USERS",
          payload: data.slice(0, 15),
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    const recuperaProfilo = async () => {
      try {
        setCaricamento(true);
        const dati = await clientApi.ottieniIlMioProfilo();
        setDatiProfilo(dati);
      } catch (err) {
        console.error("Errore nel recupero del profilo:", err);
      } finally {
        setCaricamento(false);
      }
    };

    recuperaProfilo();
    const fetchProfile = async () => {
      try {
        const data = await clientApi.ottieniIlMioProfilo();

        console.log(data);
        dispatch({
          type: "GET_USER",
          payload: data,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    getJobsData();
    getUsers();
  }, []);

  const categoriePopulari = [
    { nome: "Sviluppo Software", icona: FaCode },
    { nome: "Marketing", icona: FaChartBar },
    { nome: "Vendite", icona: FaBriefcase },
    { nome: "Design", icona: FaPalette },
    { nome: "Risorse Umane", icona: FaUsers },
    { nome: "Finanza", icona: FaDollarSign },
    { nome: "Ingegneria", icona: FaCog },
    { nome: "Data Science", icona: FaChartLine },
  ];

  const caricaSuggerimenti = () => {
    if (eAttivo("/jobs")) {
      setSuggerimentiCategorie(categoriePopulari);
    }
  };

  const gestisciClickRicerca = () => {
    setMostraDropdown(true);
    if (suggerimentiCategorie.length === 0) {
      caricaSuggerimenti();
    }
  };

  const gestisciBlur = () => {
    setTimeout(() => setMostraDropdown(false), 200);
  };

  const gestisciRicerca = (evento) => {
    evento.preventDefault();
    if (valoreRicerca.trim() && eAttivo("/jobs")) {
      // Naviga alla pagina lavori con il parametro di ricerca
      navigate(`/jobs?search=${encodeURIComponent(valoreRicerca.trim())}`);
    }
  };

  const selezionaCategoria = (categoria) => {
    setValoreRicerca(categoria.nome);
    setMostraDropdown(false);
    // Naviga alla pagina lavori con il parametro di ricerca
    navigate(`/jobs?search=${encodeURIComponent(categoria.nome)}`);
  };

  return (
    <Navbar
      bg="white"
      className="shadow-sm border-bottom barra-navigazione-linkedin fixed-top"
    >
      <Container className="justify-content-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center logo-personalizzato"
        >
          <FaLinkedin size={38} className="logo-linkedin" />
        </Navbar.Brand>

        <Form
          className="d-flex me-auto modulo-ricerca"
          onSubmit={gestisciRicerca}
        >
          <div className="position-relative">
            <FaSearch
              size={28}
              className="icona-ricerca d-lg-none icona-ricerca-mobile"
            />
            <FaSearch className="icona-ricerca d-none d-lg-block" />
            <FormControl
              type="search"
              placeholder={eAttivo("/jobs") ? "Cerca lavoro" : "Cerca"}
              className="input-ricerca d-none d-lg-block"
              aria-label="Ricerca"
              value={valoreRicerca}
              onChange={(e) => setValoreRicerca(e.target.value)}
              onFocus={gestisciClickRicerca}
              onBlur={gestisciBlur}
            />

            {/* Dropdown suggerimenti */}
            {mostraDropdown && eAttivo("/jobs") && (
              <div
                className="position-absolute bg-white border rounded shadow-lg"
                style={{
                  top: "100%",
                  left: "0",
                  right: "0",
                  zIndex: 1000,
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {suggerimentiCategorie.length > 0 ? (
                  <>
                    <div className="px-3 py-2 border-bottom">
                      <small className="text-muted fw-semibold">
                        Cerca per reparto
                      </small>
                    </div>
                    {suggerimentiCategorie.map((categoria, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 border-bottom hover-bg-light d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => selezionaCategoria(categoria)}
                      >
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: "#f3f2ef",
                          }}
                        >
                          <categoria.icona size={16} className="text-muted" />
                        </div>
                        <div className="flex-grow-1 min-width-0">
                          <div
                            className="fw-semibold"
                            style={{ fontSize: "14px" }}
                          >
                            {categoria.nome}
                          </div>
                          <div className="text-muted small">
                            Cerca lavori in {categoria.nome.toLowerCase()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="px-3 py-4 text-center text-muted">
                    <div>Nessun suggerimento disponibile</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Form>

        <Nav className="ms-auto icone-navigazione">
          <Nav.Link
            as={Link}
            to="/"
            className={`elemento-navigazione text-center ${
              eAttivo("/") ? "attivo" : ""
            }`}
          >
            <FaHome size={20} />
            <div className="testo-navigazione">Home</div>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/network"
            className={`elemento-navigazione text-center ${
              eAttivo("/network") ? "attivo" : ""
            }`}
          >
            <FaUsers size={20} />
            <div className="testo-navigazione">La mia rete</div>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/jobs"
            className={`elemento-navigazione text-center ${
              eAttivo("/jobs") ? "attivo" : ""
            }`}
          >
            <FaBriefcase size={20} />
            <div className="testo-navigazione">Lavoro</div>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/messaging"
            className={`elemento-navigazione text-center ${
              eAttivo("/messaging") ? "attivo" : ""
            }`}
          >
            <FaCommentDots size={20} />
            <div className="testo-navigazione">Messaggi</div>
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/notifications"
            className={`elemento-navigazione text-center ${
              eAttivo("/notifications") ? "attivo" : ""
            }`}
          >
            <FaBell size={20} />
            <div className="testo-navigazione">Notifiche</div>
          </Nav.Link>

          <Dropdown className="dropdown-profilo">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-profilo"
              className={`elemento-navigazione text-center toggle-profilo ${
                eAttivo("/profile") ? "attivo" : ""
              }`}
            >
              <div className="foto-profilo">
                <img
                  src={
                    datiProfilo?.image ||
                    "https://via.placeholder.com/24x24/0a66c2/ffffff?text=U"
                  }
                  alt="Profilo"
                  className="rounded-circle"
                  style={{ width: "24px", height: "24px", objectFit: "cover" }}
                />
              </div>
              <div className="testo-navigazione d-flex align-items-center">
                Tu <FaCaretDown size={12} className="ms-1" />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="menu-profilo">
              <div className="intestazione-profilo">
                <img
                  src={
                    datiProfilo?.image ||
                    "https://via.placeholder.com/64x64/0a66c2/ffffff?text=U"
                  }
                  alt="Profilo"
                  className="rounded-circle"
                  style={{ width: "64px", height: "64px", objectFit: "cover" }}
                />
                <div className="info-profilo">
                  <div className="nome-profilo">
                    {datiProfilo
                      ? `${datiProfilo.name || ""} ${
                          datiProfilo.surname || ""
                        }`.trim()
                      : "Mario Rossi"}
                  </div>
                  <div className="titolo-profilo">
                    {datiProfilo?.title || "Senior Developer at LinkedIn"}
                  </div>
                </div>
              </div>

              <div className="visualizza-profilo-btn">
                <Dropdown.Item as={Link} to="/profile">
                  Visualizza profilo
                </Dropdown.Item>
              </div>
              <Dropdown.Divider />
              <div className="sezione-account">
                <div className="titolo-sezione">Account</div>
                <Dropdown.Item className="premium-offer">
                  Prova 1 mese di Premium a 0 EUR
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  Impostazioni e privacy
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/help">
                  Guida
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/language">
                  Lingua
                </Dropdown.Item>
              </div>
              <Dropdown.Divider />
              <div className="sezione-gestisci">
                <div className="titolo-sezione">Gestisci</div>
                <Dropdown.Item as={Link} to="/posts">
                  Post e attività
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/job-alerts">
                  Account per la pubblicazione di annunci di lavoro
                </Dropdown.Item>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item className="esci-item">Esci</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="divisore-navbar"></div>

          <Nav.Link className="elemento-navigazione text-center menu-aziende">
            <BsGrid3X3Gap size={20} />
            <div className="testo-navigazione">Per le aziende</div>
          </Nav.Link>

          <div className="promo-premium">
            <span>Prova Premium per 0 EUR</span>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BarraNavigazioneLinkedIn;
