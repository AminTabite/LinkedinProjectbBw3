import users from "../data/users.json";
import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState({
    type: "pending",
    message: "Attesa login",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const fetchProfile = async () => {
  //   try {
  //     const data = await clientApi.ottieniIlMioProfilo();
  //     dispatch({
  //       type: "GET_USER",
  //       payload: data,
  //     });
  //   } catch (err) {
  //     console.error("Errore nel recupero del profilo:", err);
  //   }
  // };

  useEffect(() => {
    const checkSavedSession = () => {
      try {
        const savedData = localStorage.getItem("userIdSession");
        if (savedData) {
          navigate("/");
        }
      } catch (error) {
        console.error("Errore nel ripristinare la sessione:", error);
      }
    };
    checkSavedSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(users);
    setIsLoading(true);
    setLoginStatus(null);

    const user = users.users.find((u) => u.username === username);
    if (!user) {
      setLoginStatus({
        type: "error",
        message: "Username non trovato",
      });
      setIsLoading(false);
      return;
    }
    if (user.password !== password) {
      setLoginStatus({
        type: "error",
        message: "Password non corretta",
      });
      setIsLoading(false);
      return;
    }
    try {
      const sessionData = user;
      localStorage.setItem("userIdSession", JSON.stringify(sessionData));
      navigate("/");
    } catch (error) {
      console.error("Errore nella nel salvare il login" + error);
    }
    setIsLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center loginBox">
      <div className="d-flex flex-column justify-content-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/aa/LinkedIn_2021.svg"
          alt="linkedinLogo"
          className="loginLogo mb-4"
        />
        {loginStatus.type === "error" ? (
          <Alert variant="danger">{loginStatus.message}</Alert>
        ) : (
          <div className="d-none">prova</div>
        )}
        <div className="mb-3">
          <label className="form-label fw-medium">
            <i className="bi bi-person me-2"></i>
            Username
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci username"
            onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-medium">
            <i className="bi bi-lock me-2"></i>
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading || !username || !password}
          className="btn btn-primary btn-lg"
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Verifica in corso...
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Accedi
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
