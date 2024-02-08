import React, { useEffect, useState } from "react";
import "../SCSS/genres.scss";
import { Link } from "react-router-dom";

function Genres() {
  const [genresData, SetGenresData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetchGenresData();
    }, 7000);
  }, []);

  async function fetchGenresData() {
    const res = await fetch(`https://api.jikan.moe/v4/genres/anime`);
    const json = await res.json();
    SetGenresData(json.data);
    // console.log(json.data);
  }

  return (
    <>
      <h2 className="h2">Genres</h2>
      <div className={isClicked ? "genres expand" : "genres"}>
        {genresData
          ? genresData.map((item, i) => (
              <Link key={i} to={`/genre/${item.name}`} className="Link">
                <div className="genre-list">
                  <p>{item.name}</p>
                </div>
              </Link>
            ))
          : ""}
        <button onClick={() => setIsClicked(!isClicked)}>
          {isClicked ? "Show less?" : "Show More?"}
        </button>
      </div>
    </>
  );
}

export default Genres;
