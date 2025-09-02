const statoIniziale = {
  arrayUtenti: [],
};

export const ottieniUtentiAction = () => {
  return async (dispatch) => {
    try {
      const risposta = await fetch("https://striveschool-api.herokuapp.com/api/profile/", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk"
        }
      });
      if (risposta.ok) {
        const utenti = await risposta.json();
        dispatch({
          type: "OTTIENI_UTENTI",
          payload: utenti.slice(0, 5)
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
