import React, { useEffect, useState } from "react";
import "./Home.css";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Pagination } from "antd";
import MovieList from "../MovieList/MovieList.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import MovieCard from "../MovieCard/MovieCard.jsx";
import { getMovies } from "../../../api/movieApi.jsx";
const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
const User = JSON.parse(localStorage.getItem("User"));
const role = User.role;
const items = [
  {
    label: "Admin",
    key: "1",
    danger: true,
    disabled: role == "admin" ? true : false,
  },
  {
    label: "1st menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "3",
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const Home = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const fetchData = async () => {
    const response = await getMovies();

    setMovies(response);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    if (userData) {
      setUser(userData);
    }
    fetchData();
  }, []);
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  return (
    <div>
      <div className="head">
        <div>
          {user ? <h1>Welcome, {user.userName}!</h1> : <h1>Welcome</h1>}
          <p>Book your favourite movie</p>
        </div>
      </div>
      <SearchBar></SearchBar>
      <div className="bodyHome">
        <div className="lastest">
          <h3>Lastest Movie</h3>
          <MovieList></MovieList>
        </div>
      </div>
      <h2>ALL MOVIES</h2>
      <div className="movies-container">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            cardWidth={140}
            cardHeight={140}
          />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={movies.length}
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
      <Navbar></Navbar>
    </div>
  );
};

export default Home;
