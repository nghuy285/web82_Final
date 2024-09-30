import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesById } from "../../../api/movieApi";
import "./MovieDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import NavbarHead from "../Navbar/NavbarHead";
const MovieDetail = () => {
  const { movieId } = useParams(); // Lấy movieId từ URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        console.log(movieId);
        const response = await getMoviesById(movieId);
        setMovie(response);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <NavbarHead></NavbarHead>
      <div className="movieDetail">
        <div className="sec1">
          <div className="movie-poster">
            <img src={movie.image} alt={movie.title} />
          </div>

          <div className="infoLeft">
            <div className="yearInfo">
              <FontAwesomeIcon icon={faCalendar} style={{ color: "#ff4000" }} />
              <strong>Year</strong>
              <p> {movie.year}</p>
            </div>
            <div className="yearInfo">
              <FontAwesomeIcon icon={faClock} style={{ color: "#ff0000" }} />
              <strong>Time</strong>
              <p> {movie.time} min</p>
            </div>
            <div className="yearInfo">
              <FontAwesomeIcon icon={faStar} style={{ color: "#ff0000" }} />
              <strong>Rating</strong>
              <p> 0.0</p>
            </div>
          </div>
        </div>

        <div className="movie-info">
          <h1>{movie.name}</h1>
          <p>{movie.introduce}</p>
        </div>
        <button className="book-button">Select Seat</button>
      </div>
    </div>
  );
};

export default MovieDetail;
