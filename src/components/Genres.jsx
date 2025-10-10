import React, { useEffect, useState } from "react";
import "../SCSS/genres.scss";
import { Link, useNavigate } from "react-router-dom";

function Genres() {
  const [genresData, SetGenresData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchGenresData();
    }, 6000);
  }, []);

  async function fetchGenresData() {
    const res = await fetch(`https://api.jikan.moe/v4/genres/anime`);
    const json = await res.json();
    SetGenresData(json.data);
    // console.log(json.data);
  }

  return (
    <>
      <h2 className="h2 genre-section">Genres</h2>
      <div
        className={isClicked ? "genres expand" : "genres"}
        id="genre-section"
      >
        {genresData
          ? genresData.map((item, i) => (
              <div
                className="genre-list"
                key={i}
                onClick={() => {
                  navigate(`/AnimeList/genre/${item.mal_id}`, {
                    state: { genreName: item.name },
                  });
                }}
              >
                <p>{item.name}</p>
              </div>
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
