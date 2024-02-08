import React, { useEffect, useState } from "react";
import "../SCSS/genres.scss";

function Genres() {
  const [genresData, SetGenresData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchGenresData();
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
              <div className="genre-list" key={i}>
                <p>{item.name}</p>
              </div>
            ))
          : ""}
        <button onClick={() => setIsClicked(!isClicked)}>Show More?</button>
      </div>
    </>
  );
}

export default Genres;
