
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard.jsx';
import { getMovies } from '../../api/movieApi.jsx';
import "./MovieList.css" ;
import Modal from 'react-modal'; 
const MovieList = () => {
    const [movies, setMovies] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieData = await getMovies();
                setMovies(movieData);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch movies");
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);  
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    const handleShowMore = () => {
        if (currentIndex<movies.length - 4){
           setCurrentIndex((prev) => prev + 1);      
        }
    
    };
    const handleUnShow = () => {
        if (currentIndex > 0){
            setCurrentIndex((prev) => prev - 1); 
        }
       
    };
    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie); 
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);  // Đóng modal
    };
    const visibleMovies = movies.slice(currentIndex, currentIndex + 4);
    return (
        <div className="movie-list">
            {movies.length > 4 && <button onClick={handleUnShow} className="show-button">
            ←
            </button>}
            {visibleMovies.map((movie) => (
                <div key={movie._id} onClick={() => handleSelectMovie(movie)}>
                    <MovieCard movie={movie} />
                </div>
            ))}
            
            {movies.length>4 && <>
            <button onClick={handleShowMore} className="show-more-button">
            →
            </button>
            </>}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Movie Details"
                className="movie-modal"
                overlayClassName="modal-overlay"
            >
                {selectedMovie && (
                    <div className="movie-details-modal">
                        <button className="close-button" onClick={handleCloseModal}>×</button>
                        <img src={selectedMovie.image} alt={selectedMovie.title} />
                        <div> 
                        <h2>{selectedMovie.name}</h2>
                        <p style={{color:"grey"}}>{selectedMovie.time} min | {selectedMovie.year}</p> 
                        <p className='introduce' style={{color:"grey", marginTop:"5%"}}>{selectedMovie.introduce}</p>
                         <button className='play'><img src="./play.svg" style={{width:"20px",height:"20px",position:"absolute",left:"10%",top:"30%"}}></img>PLAY MOVIE</button></div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MovieList;
