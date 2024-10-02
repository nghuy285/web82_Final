import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesById } from "../../../api/movieApi";
import "./MovieDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import NavbarHead from "../Navbar/NavbarHead";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons"; // Trái tim từ Ant Design

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const getTheatersByMovieId = async (movieId) => {
    const response = await axios.get(
      `http://localhost:8080/theaters/movie/${movieId}`
    );
    return response.data;
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await getMoviesById(movieId);
        setMovie(response);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTheaters = async () => {
      try {
        const response = await getTheatersByMovieId(movieId);
        setTheaters(response);
      } catch (error) {
        console.error("Failed to fetch theaters", error);
      }
    };

    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/favorite/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const favoriteMovies = response.data.favorites;

        const isFav = favoriteMovies.some(
          (favoriteMovie) => favoriteMovie._id === movieId
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Failed to check favorite status", error);
      }
    };

    fetchTheaters();
    fetchMovieDetail();
    checkFavoriteStatus();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  const handleSelectSeat = () => {
    if (selectedTheater) {
      navigate(`/booking/${selectedTheater}`);
    } else {
      message.error("Please select a theater before proceeding.");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:8080/users/favorite/${movieId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        message.success("Movie removed from favorites!");
        setIsFavorite(false);
      } else {
        await axios.post(
          `http://localhost:8080/users/favorite/${movieId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        message.success("Movie added to favorites!");
        setIsFavorite(true);
      }
    } catch (error) {
      message.error("Failed to update favorites.");
    }
  };

  return (
    <div>
      <NavbarHead />
      <div className="movieDetail">
        <div className="sec1">
          <div className="movie-poster">
            <img src={movie.image} alt={movie.title} />
          </div>

          <div className="infoLeft">
            <div className="yearInfo">
              <FontAwesomeIcon icon={faCalendar} style={{ color: "#ff4000" }} />
              <strong>Year</strong>
              <p>{movie.year}</p>
            </div>
            <div className="yearInfo">
              <FontAwesomeIcon icon={faClock} style={{ color: "#ff0000" }} />
              <strong>Time</strong>
              <p>{movie.time} min</p>
            </div>
            <div className="yearInfo">
              <FontAwesomeIcon icon={faStar} style={{ color: "#ff0000" }} />
              <strong>Rating</strong>
              <p>0.0</p>
            </div>
            <div
              className="yearInfo"
              onClick={handleAddToFavorites}
              style={{ cursor: "pointer" }}
            >
              {isFavorite ? (
                <HeartFilled
                  style={{
                    color: "#ff0000",
                    fontSize: "24px",
                    marginLeft: "1.8rem",
                  }}
                />
              ) : (
                <HeartOutlined
                  style={{
                    color: "#ff0000",
                    fontSize: "24px",
                    marginLeft: "1.8rem",
                  }}
                />
              )}
              <strong style={{ marginLeft: "8px" }}>Favorite</strong>
            </div>
          </div>
        </div>

        <div className="movie-info">
          <h1>{movie.name}</h1>
          <p>{movie.introduce}</p>
        </div>

        <h3>Select a Theater to Book Seats</h3>
        <Select
          placeholder="Select a theater"
          style={{ width: "300px", marginBottom: "10px" }}
          onChange={(value) => setSelectedTheater(value)}
        >
          {theaters.map((theater) => (
            <Select.Option key={theater._id} value={theater._id}>
              {theater.name} - {theater.location}
            </Select.Option>
          ))}
        </Select>

        <Button block danger type="primary" onClick={handleSelectSeat}>
          Select Seats
        </Button>
      </div>
    </div>
  );
};

export default MovieDetail;
