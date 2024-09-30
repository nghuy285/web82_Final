import axios from "axios";

const API_URL = "http://localhost:8080/movies";

export const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getMoviesById = async (movieId) => {
  const res = await axios.get(`${API_URL}/detail/${movieId}`);
  return res.data;
};
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { name: query },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to search movies", error);
    throw error;
  }
};
