import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie, cardWidth, cardHeight }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie._id}`);
    console.log(movie);
  };
  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{
        width: cardWidth || "100%",
        height: cardHeight || "auto",
        background: `url(${movie.image}) no-repeat center center/cover`,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="movie-info"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <h4 style={{ margin: 0 }}>{movie.name}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
