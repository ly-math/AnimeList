import React, { useState } from "react";
import "../SCSS/search-bar.scss";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/AnimeList/search/${search}`);
  }

  return (
    <>
      <div className="search-section">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter anime name..."
          />
          <button className="btn">Search</button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
