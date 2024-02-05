import React, { useEffect, useState } from "react";
import "../SCSS/nav-bar.scss";

function NavBar() {
  const [genreData, setGenreData] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetchGenreData();
    }, 4000);
  }, []);

  async function fetchGenreData() {
    const response = await fetch("https://api.jikan.moe/v4/genres/anime?");
    const result = await response.json();
    setGenreData(result.data);
  }
  return (
    <div className="nav-bar-container">
      {genreData
        ? genreData.map((item) => {
            <h3>{item.name}</h3>;
          })
        : ""}
    </div>
  );
}

export default NavBar;
