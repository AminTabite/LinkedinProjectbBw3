// Shared configuration constants
export const TOKEN = () => {
  const token = JSON.parse(localStorage.getItem("userIdSession")).token;
  if (token === null) {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1OTc0YTE2MjdjNjAwMTVmOGM1NjkiLCJpYXQiOjE3NTY3MzEyMTAsImV4cCI6MTc1Nzk0MDgxMH0.2K96iJrH_T9CFLxQjMe3ZEvL5W45fdGe3MGTvDxniIQ";
  } else {
    return token;
  }
};
export const API_BASE_URL = "https://striveschool-api.herokuapp.com/api";
