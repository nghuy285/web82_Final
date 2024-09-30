import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const register = async (userName, email, password) => {
  return await axios.post(`${API_URL}/register`, { userName, email, password });
};
