import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const getUser = async (id) => {
  const user = await axios.get(`http://localhost:8080/users/${id}`);
  return user;
};
