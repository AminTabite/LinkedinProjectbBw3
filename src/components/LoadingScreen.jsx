import { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import './LoadingScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import clientApi from '../services/api';
import { ottieniPostAction } from '../redux/posts';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sonoDatiUtenteCaricati, setSonoDatiUtenteCaricati] = useState(false);
  const [sonoPostCaricati, setSonoPostCaricati] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const caricaDatiUtente = async () => {
      if (user && user.token) {
        try {
          await clientApi.ottieniIlMioProfilo();
          setSonoDatiUtenteCaricati(true);
        } catch (error) {
          console.warn("Impossibile caricare profilo dall'API:", error);
          setSonoDatiUtenteCaricati(true);
        }
      } else {
        setSonoDatiUtenteCaricati(true);
      }
    };

    caricaDatiUtente();
  }, [user]);

  useEffect(() => {
    if (user) {
      dispatch(ottieniPostAction());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!loading) {
      setSonoPostCaricati(true);
    }
  }, [loading]);

  useEffect(() => {
    const intervalloProgresso = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalloProgresso);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    const controllaCompletamento = () => {
      if (progress >= 100 && sonoDatiUtenteCaricati && sonoPostCaricati) {
        setIsVisible(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }
    };

    const timerCompletamento = setTimeout(controllaCompletamento, 100);

    return () => {
      clearInterval(intervalloProgresso);
      clearTimeout(timerCompletamento);
    };
  }, [progress, sonoDatiUtenteCaricati, sonoPostCaricati, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="linkedin-logo-container">
          <span className="linkedin-text">Linked</span>
          <FaLinkedin size={80} className="linkedin-logo" />
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar">
            <div 
              className="loading-bar-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;