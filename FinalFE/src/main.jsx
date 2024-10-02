import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth.jsx";
import App from "./App.jsx";
import PrivateRoute from "./components/Private/Private.jsx";
import Home from "./components/Home/Home.jsx";
import Favourite from "./components/Favourite/Favourite.jsx";
import Search from "./components/SearchBar/Search.jsx";
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx";
import TheaterManagement from "./components/TheaterManagement/TheaterManagement.jsx";
import BookSeat from "./components/BookSeat/BookSeat.jsx";
import BookingSuccess from "./components/BookSeat/BookingSuccess.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MovieManager from "./components/MovieManager/MovieManager.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Auth signal="1"></Auth>}></Route>
      <Route path="/register" element={<Auth signal="2"></Auth>}></Route>
      <Route path="/favourite" element={<Favourite></Favourite>}></Route>
      <Route path="/search" element={<Search />} />
      <Route path="/theater" element={<TheaterManagement />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/booking/:id" element={<BookSeat theaterId="id" />} />
      <Route path="/profiles/:id" element={<Profile />} />
      <Route path="/moviesManager" element={<MovieManager />} />
      <Route
        path="/movies/:movieId"
        element={<MovieDetail></MovieDetail>}
      ></Route>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
