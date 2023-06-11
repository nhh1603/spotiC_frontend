import React, { useState } from "react";
import "../styles/search_bar.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="search"
        placeholder="What do you want to listen to ?"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
};

export default SearchBar;
