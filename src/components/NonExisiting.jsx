import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NonExisting = () => {
  const navigate = useNavigate();
  return (
    <div
      className="text-center"
      style={{ paddingTop: "8em", background: "#F4F2EE", height: "100vh" }}
    >
      <img src="/NonExisting.png"></img>
      <h2>Questa pagina è in manutenzione</h2>
      <p style={{ color: "gray" }}>Torna alla home page di LinkedIn</p>
      <Button
        className="buttonOutlineBlue"
        onClick={() => {
          navigate("/");
        }}
      >
        Vai al tuo feed
      </Button>
    </div>
  );
};

export default NonExisting;
