const URL_BASE_API = "https://striveschool-api.herokuapp.com/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTczNTE2MjdjNjAwMTVmOGM1NjgiLCJpYXQiOjE3NTY3MzExODksImV4cCI6MTc1Nzk0MDc4OX0.EE1GDQeokGCuIu43ACNAuxw4--0MPsa1SFutXaarjxk";

const clientApi = {
  async richiesta(endpoint, opzioni = {}) {
    const url = `${URL_BASE_API}${endpoint}`;
    const configurazione = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
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

  // Jobs API
  async cercaLavori(query = "", limit = 20) {
    const url = `https://strive-benchmark.herokuapp.com/api/jobs?search=${encodeURIComponent(query)}&limit=${limit}`;
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

  async ottieniLavoriPerAzienda(company, limit = 20) {
    const url = `https://strive-benchmark.herokuapp.com/api/jobs?company=${encodeURIComponent(company)}&limit=${limit}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Errore HTTP! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel recupero lavori per azienda:", error);
      throw error;
    }
  },

  async ottieniLavoriPerCategoria(category, limit = 20) {
    const url = `https://strive-benchmark.herokuapp.com/api/jobs?category=${encodeURIComponent(category)}&limit=${limit}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Errore HTTP! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Errore nel recupero lavori per categoria:", error);
      throw error;
    }
  },
};

//funzione per cambiare immagine
/*const changeImg = () => {
  fetch("https://striveschool-api.herokuapp.com/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      area: "Napoli ",
      bio: "Ciao a tutti",
      name: "Alessandro",
      surname: "di Martino",
      title: "Full-Stack developer",
      email: "alessandrodimartino06@gmail.com",
      username: "Ale-ko",
      image:
        "https://www.schededidatticheperlascuola.it/wp-content/uploads/2022/03/albero-947x1024.png",
    }),
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
    })
    .catch((er) => {
      console.log(er);
    });
};*/

export default clientApi;
