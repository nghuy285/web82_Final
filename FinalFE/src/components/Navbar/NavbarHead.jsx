import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const NavbarHead = (props) => {
  const location = useLocation();
  let title = "";
  if (location.pathname.startsWith("/movies/")) {
    title = "Movie Details";
  } else {
    switch (location.pathname) {
      case "/login":
        title = "Login";
        break;
      case "/register":
        title = "Register";
        break;
      case "/favourite":
        title = "Favourite";
        break;
      case "/search":
        title = "Search";
        break;
      case "/home":
        title = "Home";
        break;
      default:
        title = "App";
    }
  }
  return (
    <nav
      style={{
        position: "relative",
        top: 0,
        width: "100%",
        backgroundColor: "#fff",
        padding: "0",
        gap: "25%",
        display: "flex",
      }}
    >
      <button
        onClick={() => window.history.back()}
        style={{
          border: 0,
          width: "3rem",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </button>
      <h1>{title}</h1>
    </nav>
  );
};

export default NavbarHead;
