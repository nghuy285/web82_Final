import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import { message, Pagination } from "antd";
import "./Fav.css";
import Navbar from "../Navbar/Navbar";
import NavbarHead from "../Navbar/NavbarHead";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/favorite/12`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
      message.error("Failed to fetch favorites. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (favorites.length === 0)
    return (
      <div>
        <NavbarHead></NavbarHead>
        <h2 style={{ textAlign: "center" }}>No favorite movies found.</h2>
        <Navbar></Navbar>
      </div>
    );

  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  return (
    <div>
      <NavbarHead />
      <div className="favorites-page">
        <h1>Your Favorite Movies</h1>
        <div className="favorites-list">
          {currentMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              cardWidth={150}
              cardHeight={150}
            />
          ))}
        </div>

        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={favorites.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
      <Navbar />
    </div>
  );
};

export default Favourite;
