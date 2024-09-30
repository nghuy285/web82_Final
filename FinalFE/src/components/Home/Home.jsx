import React, { useEffect, useState } from "react";
import "./Home.css";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import MovieList from "../MovieList/MovieList.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

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
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div>
      <div className="head">
        <div>
          {user ? <h1>Welcome, {user.userName}!</h1> : <h1>Welcome</h1>}
          <p>Book your favourite movie</p>
        </div>

        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
          className="menuAvatar"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Log out
        </Dropdown.Button>
      </div>
      <SearchBar></SearchBar>
      <div className="bodyHome">
        <div className="lastest">
          <h3>Lastest Movie</h3>
          <MovieList></MovieList>
        </div>
      </div>

      <Navbar></Navbar>
    </div>
  );
};

export default Home;
