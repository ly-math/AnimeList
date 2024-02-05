import React, { useState } from "react";
import "../SCSS/search-bar.scss";
import LoadingLayout from "../components/loadingLayout";

function SearchBar({ setOnSubmitSearch, setSearch, search, setH2Search }) {
  const [loadingPage, setLoadingPage] = useState(false);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setLoadingPage(true);
    setOnSubmitSearch(search);
    setH2Search(search ? search : "Popular Anime");
  }

  if (loadingPage) {
    setTimeout(() => {
      setLoadingPage(false);
    }, 2000);
  }

  return (
    <>
      <div className="loading-screen">
        {loadingPage ? <LoadingLayout loadingPage={loadingPage} /> : ""}
      </div>
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
