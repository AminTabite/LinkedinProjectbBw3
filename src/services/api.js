const URL_BASE_API = 'https://striveschool-api.herokuapp.com/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk';

const clientApi = {
  async richiesta(endpoint, opzioni = {}) {
    const url = `${URL_BASE_API}${endpoint}`;
    const configurazione = {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
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
      console.error('Richiesta API fallita:', errore);
      throw errore;
    }
  },

  // GET tutti i profili
  async ottieniTuttiIProfili() {
    return this.richiesta('/profile/');
  },

  // GET il mio profilo
  async ottieniIlMioProfilo() {
    return this.richiesta('/profile/me');
  },

  // GET profilo specifico per userId
  async ottieniProfilo(userId) {
    return this.richiesta(`/profile/${userId}`);
  },

  // PUT aggiorna profilo
  async aggiornaProfilo(datiProfilo) {
    return this.richiesta('/profile/', {
      method: 'PUT',
      body: JSON.stringify(datiProfilo),
    });
  },
};

export default clientApi;