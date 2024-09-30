import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faHeart,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      path: "/home",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      path: "/favourite",
      label: "Favourite",
      icon: <FontAwesomeIcon icon={faHeart} />,
    },
    {
      path: "/search",
      label: "Search",
      icon: <FontAwesomeIcon icon={faSearch} />,
    },
    {
      path: "/profiles",
      label: "Profiles",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  return (
    <div className="Nav">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`NavItem ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <span>{item.icon}</span>
          {location.pathname === item.path && <span> {item.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
