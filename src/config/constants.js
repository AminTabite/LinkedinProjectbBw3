// Shared configuration constants
export const getAuthData = () => {
  try {
    const data = localStorage.getItem("userIdSession");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing auth data:", error);
    return null;
  }
};

export const getToken = () => {
  const authData = getAuthData();
  return authData?.token || null;
};

export const getCommentsToken = () => {
  // Token specifico per l'API dei commenti
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJhZGMwOTkxMjgyMTAwMTU0NGRiODMiLCJpYXQiOjE3NTcwNzY0ODksImV4cCI6MTc1ODI4NjA4OX0.RRG4ohBBFTOr_b6wCC5ThuxCAziON75B3MXfraZqjLE";
};

export const getCurrentUser = () => {
  return getAuthData();
};

export const ottieniUtenteCorrente = () => {
  return getAuthData();
};

export const isAuthenticated = () => {
  return !!getAuthData();
};

export const API_BASE_URL = "https://striveschool-api.herokuapp.com/api";
