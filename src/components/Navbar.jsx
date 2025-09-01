import { Navbar, Nav, Container, Form, FormControl, Dropdown, Badge } from 'react-bootstrap';
import { FaLinkedin, FaSearch, FaHome, FaUsers, FaBriefcase, FaCommentDots, FaBell, FaCaretDown } from 'react-icons/fa';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const BarraNavigazioneLinkedIn = () => {
  const posizioneCorrente = useLocation();
  const [valoreRicerca, setValoreRicerca] = useState('');
  
  const eAttivo = (percorso) => posizioneCorrente.pathname === percorso;

  return (
    <Navbar bg="white" className="shadow-sm border-bottom barra-navigazione-linkedin">
      <Container className="justify-content-center">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center logo-personalizzato">
          <FaLinkedin size={34} className="logo-linkedin" />
        </Navbar.Brand>
        
        <Form className="d-flex me-auto modulo-ricerca">
          <div className="position-relative">
            <FaSearch size={28} className="icona-ricerca d-lg-none icona-ricerca-mobile" />
            <FaSearch className="icona-ricerca d-none d-lg-block" />
            <FormControl
              type="search"
              placeholder="Cerca"
              className="input-ricerca d-none d-lg-block"
              aria-label="Ricerca"
              value={valoreRicerca}
              onChange={(e) => setValoreRicerca(e.target.value)}
            />
          </div>
        </Form>

        <Nav className="ms-auto icone-navigazione">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`elemento-navigazione text-center ${eAttivo('/') ? 'attivo' : ''}`}
            >
              <FaHome size={20} />
              <div className="testo-navigazione">Home</div>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/network" 
              className={`elemento-navigazione text-center ${eAttivo('/network') ? 'attivo' : ''}`}
            >
              <FaUsers size={20} />
              <div className="testo-navigazione">La mia rete</div>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/jobs" 
              className={`elemento-navigazione text-center ${eAttivo('/jobs') ? 'attivo' : ''}`}
            >
              <FaBriefcase size={20} />
              <div className="testo-navigazione">Lavoro</div>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/messaging" 
              className={`elemento-navigazione text-center ${eAttivo('/messaging') ? 'attivo' : ''}`}
            >
              <FaCommentDots size={20} />
              <div className="testo-navigazione">Messaggi</div>
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/notifications" 
              className={`elemento-navigazione text-center ${eAttivo('/notifications') ? 'attivo' : ''}`}
            >
              <FaBell size={20} />
              <div className="testo-navigazione">Notifiche</div>
            </Nav.Link>
            
            <Dropdown className="dropdown-profilo">
              <Dropdown.Toggle 
                variant="link" 
                id="dropdown-profilo" 
                className={`elemento-navigazione text-center toggle-profilo ${eAttivo('/profile') ? 'attivo' : ''}`}
              >
                <div className="foto-profilo">
                  <img 
                    src="https://via.placeholder.com/24x24/0a66c2/ffffff?text=U" 
                    alt="Profilo" 
                    className="rounded-circle"
                  />
                </div>
                <div className="testo-navigazione d-flex align-items-center">
                  Tu <FaCaretDown size={12} className="ms-1" />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="menu-profilo">
                <div className="intestazione-profilo">
                  <img 
                    src="https://via.placeholder.com/64x64/0a66c2/ffffff?text=MR" 
                    alt="Profilo" 
                    className="rounded-circle"
                  />
                  <div className="info-profilo">
                    <div className="nome-profilo">Mario Rossi</div>
                    <div className="titolo-profilo">Senior Developer at LinkedIn</div>
                  </div>
                </div>
                <div className="visualizza-profilo-btn">
                  <Dropdown.Item as={Link} to="/profile">Visualizza profilo</Dropdown.Item>
                </div>
                <Dropdown.Divider />
                <div className="sezione-account">
                  <div className="titolo-sezione">Account</div>
                  <Dropdown.Item className="premium-offer">Prova 1 mese di Premium a 0 EUR</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Impostazioni e privacy</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/help">Guida</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/language">Lingua</Dropdown.Item>
                </div>
                <Dropdown.Divider />
                <div className="sezione-gestisci">
                  <div className="titolo-sezione">Gestisci</div>
                  <Dropdown.Item as={Link} to="/posts">Post e attività</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/job-alerts">Account per la pubblicazione di annunci di lavoro</Dropdown.Item>
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