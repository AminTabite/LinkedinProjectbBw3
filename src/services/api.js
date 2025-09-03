import { getToken, API_BASE_URL } from '../config/constants.js';

const clientApi = {
  async richiesta(endpoint, opzioni = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const configurazione = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        ...opzioni.headers,
      },
      ...opzioni,
    };

    try {
      const risposta = await fetch(url, configurazione);

      if (!risposta.ok) {
        throw new Error(`Errore HTTP! status: ${risposta.status}`);
      }

      return await risposta.json();
    } catch (errore) {
      console.error("Richiesta API fallita:", errore);
      throw errore;
    }
  },

  // GET tutti i profili
  async ottieniTuttiIProfili() {
    return this.richiesta("/profile/");
  },

  // GET il mio profilo
  async ottieniIlMioProfilo() {
    return this.richiesta("/profile/me");
  },

  // GET profilo specifico per userId
  async ottieniProfilo(userId) {
    return this.richiesta(`/profile/${userId}`);
  },

  // PUT aggiorna profilo
  async aggiornaProfilo(datiProfilo) {
    return this.richiesta("/profile/", {
      method: "PUT",
      body: JSON.stringify(datiProfilo),
    });
  },

  // Experiences API
  async ottieniEsperienze(userId) {
    return this.richiesta(`/profile/${userId}/experiences`);
  },

  async aggiungiEsperienza(userId, datiEsperienza) {
    return this.richiesta(`/profile/${userId}/experiences`, {
      method: "POST",
      body: JSON.stringify(datiEsperienza),
    });
  },

  async aggiornaEsperienza(userId, experienceId, datiEsperienza) {
    return this.richiesta(`/profile/${userId}/experiences/${experienceId}`, {
      method: "PUT", 
      body: JSON.stringify(datiEsperienza),
    });
  },

  async eliminaEsperienza(userId, experienceId) {
    return this.richiesta(`/profile/${userId}/experiences/${experienceId}`, {
      method: "DELETE",
    });
  },

  // Jobs API
  async cercaLavori(query = "", limit = 20) {
    const url = `https://strive-benchmark.herokuapp.com/api/jobs?search=${encodeURIComponent(
      query
    )}&limit=${limit}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Errore HTTP! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nella ricerca lavori:", error);
      throw error;
    }
  },

};


export default clientApi;
