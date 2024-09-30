import React from "react";
import "./MovieCardRow.css";
import { useNavigate } from "react-router-dom";

const MovieCardRow = ({ movie, cardWidth, cardHeight }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie._id}`);
    console.log(movie);
  };
  return (
    <div
      className="movie-card-wrapper"
      style={{ width: cardWidth, height: cardHeight, cursor: " pointer" }}
      onClick={handleClick}
    >
      <img src={movie.image} alt={movie.title} />
      <div className="movieInfo">
        <h3>{movie.name}</h3>
        <p>
          {movie.time}m | {movie.year}
        </p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieCardRow;
