# LinkedIn Project Clone

Un clone di LinkedIn sviluppato con React + Vite, Redux e Bootstrap. Il progetto simula le funzionalità principali di LinkedIn, inclusi profili utente, post, reazioni e sistema di autenticazione.

## Tecnologie Utilizzate

- **React** - Libreria per l'interfaccia utente
- **Vite** - Build tool e dev server
- **Redux** - Gestione dello stato globale
- **Bootstrap** - Framework CSS per il design responsive
- **React Bootstrap** - Componenti Bootstrap per React
- **API RESTful** - Integrazione con API esterne

## Funzionalità

- Sistema di autenticazione con token JWT
- Profili utente completi con competenze e formazione
- Feed dei post con caricamento dinamico
- Sistema di reazioni ai post (👍❤️👏🎉😊😢)
- Upload di immagini per i post
- Ricerca lavori integrata
- Design responsive e moderno
- Gestione esperienze lavorative
- Numeri casuali per commenti e diffusioni post

## Screenshots

<div align="center">

### Homepage e Feed
<img src="Screenshot 2025-09-03 171648.png" alt="Homepage" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 10px;" />

### Profilo Utente
<img src="Screenshot 2025-09-03 171705.png" alt="Profilo Utente" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 10px;" />

### Sezione Jobs
<img src="Screenshot 2025-09-03 171721.png" alt="Sezione Jobs" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin: 10px;" />

</div>

## Installazione e Avvio

```bash
# Clona il repository
git clone https://github.com/username/LinkedinProjectbBw3.git

# Entra nella directory
cd LinkedinProjectbBw3

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## Struttura del Progetto

```
LinkedinProjectbBw3/
├── src/
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── Navbar.jsx
│   │   ├── Homecolcentrale.jsx
│   │   ├── ProfileMainSection.jsx
│   │   └── JobsPage.jsx
│   ├── redux/               # Store Redux e reducers
│   │   ├── posts/
│   │   ├── users/
│   │   └── store/
│   ├── services/            # Servizi API
│   │   └── api.js
│   ├── data/                # Dati mockup
│   │   └── users.json
│   └── config/              # Configurazioni
│       └── constants.js
├── public/                  # File statici
└── README.md
```

## Configurazione

### Token API
Il progetto utilizza l'API di Strive School. Per utilizzare le funzionalità complete:

1. Ottieni un token dall'API di Strive School
2. Aggiorna il token nel file `src/data/users.json`
3. Il sistema ha un fallback con dati mockup se l'API non è disponibile

### Variabili d'Ambiente
```javascript
// src/config/constants.js
export const API_BASE_URL = "https://striveschool-api.herokuapp.com/api";
```

## Utenti Demo

Il progetto include diversi utenti demo con profili completi:

- **Alessandro di Martino** - Sviluppatore Full Stack
- **Amin Tabite** - Specialista Cybersecurity
- **Viktor Vasileski** - UI/UX Designer
- **Leonardo Ferrante** - Esperto Cybersecurity
- **Giuseppe Tuccilli** - Sviluppatore Web

## Caratteristiche UI/UX

- Design fedele all'interfaccia LinkedIn originale
- Animazioni fluide per le reazioni ai post
- Tooltip interattivi con emoji
- Sistema di reazioni con 6 tipologie diverse
- Layout responsive per tutti i dispositivi
- Caricamento dinamico dei contenuti

## Sistema di Reazioni

Il progetto implementa un sistema completo di reazioni ai post:

- 👍 **Mi piace** - Reazione classica
- ❤️ **Amo** - Per contenuti che amiamo
- 👏 **Applaudo** - Per celebrare successi
- 🎉 **Festeggio** - Per momenti speciali
- 😊 **Mi diverte** - Per contenuti divertenti
- 😢 **Mi intenerisce** - Per contenuti emozionanti

## Funzionalità Avanzate

- **Feed Intelligente**: Ordinamento per rilevanza o data
- **Caricamento Infinito**: Paginazione dei post
- **Upload Immagini**: Supporto per immagini nei post
- **Numeri Dinamici**: Commenti e condivisioni casuali per ogni post
- **Gestione Profilo**: CRUD completo per esperienze lavorative

## Sviluppi Futuri

- Sistema di messaggistica privata
- Notifiche push
- Sistema di connessioni tra utenti
- Chat in tempo reale
- Condivisione di contenuti esterni
- Sistema di endorsement per competenze

## Contributi

I contributi sono benvenuti! Per contribuire:

1. Fai il fork del progetto
2. Crea un branch per la funzionalità (`git checkout -b feature/AmazingFeature`)
3. Committa le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.



---

<div align="center">
  <strong>LinkedIn Project Clone - Replica fedele dell'esperienza LinkedIn</strong>
</div>
