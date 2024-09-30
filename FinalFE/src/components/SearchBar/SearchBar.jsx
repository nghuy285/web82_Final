import React, { useState } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./Search.css";
const { Search } = Input;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (value) {
      navigate(`/search?query=${value}`);
    }
  };

  return (
    <Search
      placeholder="Search for movies..."
      value={searchQuery}
      size="large"
      className="SearchCss"
      onChange={(e) => setSearchQuery(e.target.value)}
      onSearch={handleSearch}
      enterButton
    />
  );
};

export default SearchBar;
