import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Carousel, Row, Col } from "antd";
import "./MovieList.css";
import axios from "axios";
const ListFavs = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/favorite/12"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, []);

  const chunkMovies = (movies, size) => {
    const chunkedMovies = [];
    for (let i = 0; i < movies.length; i += size) {
      chunkedMovies.push(movies.slice(i, i + size));
    }
    return chunkedMovies;
  };

  const movieChunks = chunkMovies(movies, 3);

  return (
    <div
      className="carousel-container"
      style={{ width: "100%", margin: "auto" }}
    >
      <Carousel dots={true} arrows={true} autoplay speed={500}>
        {movieChunks.map((chunk, index) => (
          <div key={index} className="movie-slide">
            <Row gutter={[16, 16]} justify="center">
              {chunk.map((movie) => (
                <Col
                  key={movie._id}
                  xs={8}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <MovieCard movie={movie} cardWidth={200} cardHeight={200} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ListFavs;
