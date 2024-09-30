import React, { useState, useEffect } from "react";
import axios from "axios";

const SeatSelection = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
    axios
      .get(
        `http://localhost:3000/api/check-seat/${selectedMovie._id}/${seatNumber}`
      )
      .then((response) => {
        setIsBooked(response.data.isBooked);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBookSeat = () => {
    axios
      .post("http://localhost:3000/api/book-seat", {
        movieId: selectedMovie._id,
        seatNumber: selectedSeat,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Chọn phim</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} onClick={() => handleMovieSelect(movie)}>
            {movie.name}
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div>
          <h1>Chọn ghế</h1>
          <ul>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatNumber) => (
              <li key={seatNumber} onClick={() => handleSeatSelect(seatNumber)}>
                {seatNumber}
              </li>
            ))}
          </ul>
          {isBooked ? (
            <p>Ghế đã được đặt</p>
          ) : (
            <button onClick={handleBookSeat}>Đặt vé</button>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
