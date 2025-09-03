import { getToken } from "../../config/constants";

const statoIniziale = {
  arrayUtenti: [],
};

export const ottieniUtentiAction = () => {
  return async (dispatch) => {
    try {
      const risposta = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (risposta.ok) {
        const utenti = await risposta.json();
        dispatch({
          type: "OTTIENI_UTENTI",
          payload: utenti.slice(0, 15),
        });
      }
    } catch (errore) {
      console.error("Errore nel caricamento utenti:", errore);
    }
  };
};

const riduttoreUtenti = (stato = statoIniziale, azione) => {
  switch (azione.type) {
    case "OTTIENI_UTENTI":
      return {
        arrayUtenti: azione.payload,
      };
    default:
      return stato;
  }
};

export default riduttoreUtenti;
