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
