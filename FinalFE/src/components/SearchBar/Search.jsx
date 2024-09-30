import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../../../api/movieApi";
import MovieCardRow from "../MovieCard/MovieCardRow";

import "./Search.css";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar/Navbar";
const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true);
        try {
          const response = await searchMovies(query);
          console.log(response);
          setSearchResults(response);
        } catch (error) {
          console.error("Failed to fetch search results", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-page-container">
      <div style={{ marginTop: "1rem" }}>
        <SearchBar></SearchBar>
      </div>

      <div>
        <h4>Your Movies</h4>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {searchResults.map((movie) => (
            <div className="movie-card-wrapper" key={movie._id}>
              <MovieCardRow movie={movie} cardWidth={430} cardHeight={100} />
            </div>
          ))}
        </div>
      )}
      <Navbar></Navbar>
    </div>
  );
};

export default Search;
