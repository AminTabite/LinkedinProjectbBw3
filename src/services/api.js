import { getToken, getCommentsToken, API_BASE_URL } from '../config/constants.js';

const clientApi = {
  async richiesta(endpoint, opzioni = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();
    const configurazione = {
      headers: {
        Authorization: `Bearer ${token}`,
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

  // Comments API - con token specifico
  async ottieniCommenti(elementId) {
    const url = `${API_BASE_URL}/comments/${elementId}`;
    const token = getCommentsToken();
    
    try {
      const risposta = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!risposta.ok) {
        throw new Error(`Errore HTTP! status: ${risposta.status}`);
      }

      return await risposta.json();
    } catch (error) {
      console.error("Errore caricamento commenti:", error);
      throw error;
    }
  },

  async creaCommento(elementId, datiCommento) {
    const url = `${API_BASE_URL}/comments/`;
    const token = getCommentsToken();
    
    try {
      const risposta = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiCommento),
      });

      if (!risposta.ok) {
        throw new Error(`Errore HTTP! status: ${risposta.status}`);
      }

      return await risposta.json();
    } catch (error) {
      console.error("Errore creazione commento:", error);
      throw error;
    }
  },

  async aggiornaCommento(commentId, datiCommento) {
    const url = `${API_BASE_URL}/comments/${commentId}`;
    const token = getCommentsToken();
    
    try {
      const risposta = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiCommento),
      });

      if (!risposta.ok) {
        throw new Error(`Errore HTTP! status: ${risposta.status}`);
      }

      return await risposta.json();
    } catch (error) {
      console.error("Errore aggiornamento commento:", error);
      throw error;
    }
  },

  async eliminaCommento(commentId) {
    const url = `${API_BASE_URL}/comments/${commentId}`;
    const token = getCommentsToken();
    
    try {
      const risposta = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!risposta.ok) {
        throw new Error(`Errore HTTP! status: ${risposta.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Errore eliminazione commento:", error);
      throw error;
    }
  },

};


export default clientApi;
