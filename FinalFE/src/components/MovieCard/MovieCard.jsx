
import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.image} alt={movie.name} className="movie-image" />
            <div className="movie-info">
                <h3>{movie.name}</h3>
                <p>{movie.time} min {movie.year}</p>
            </div>
        </div>
    );
};

export default MovieCard;
