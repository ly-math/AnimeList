import React, { useEffect, useState } from "react";
import AnimeInfo from "./AnimeInfo";
import "../SCSS/side-page.scss";

function SidePage() {
  const [upComingAnime, setUpComingAnime] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [clickData, setClickData] = useState();
  const [viewMoreBtn, setViewMoreBtn] = useState(false);

  useEffect(() => {
    fetchUpComing();
  }, []);

  async function fetchUpComing() {
    setTimeout(async () => {
      const res = await fetch(
        `https://api.jikan.moe/v4/seasons/upcoming?q=&limit=21`
      );
      const result = await res.json();
      setUpComingAnime(result.data);
    }, 2000);
  }

  function handleViewMoreBtn() {
    setViewMoreBtn(!viewMoreBtn);
  }

  return (
    <div className="side-page anime-list-wrap">
      <h2 className="h2">Upcoming Anime</h2>
      <div
        className={
          viewMoreBtn ? "full-width anime-list-main" : "anime-list-main"
        }
      >
        {upComingAnime
          ? upComingAnime.map((item, i) => {
              return (
                <div
                  className="card"
                  key={(item.mal_id, i)}
                  onClick={() => {
                    setClickData(item);
                    setIsClicked(true);
                  }}
                >
                  <div className="image">
                    <img src={item.images.jpg.large_image_url} alt="image" />
                    <span>Ep : {item.episodes}</span>
                  </div>

                  <div className="title">
                    {item.title_english ? (
                      <h3>{item.title_english}.</h3>
                    ) : (
                      <h3>{item.title_japanese}</h3>
                    )}
                  </div>
                </div>
              );
            })
          : ""}

        {isClicked ? (
          <div>
            <AnimeInfo clickData={clickData} setIsClicked={setIsClicked} />
          </div>
        ) : (
          ""
        )}
      </div>
      <button className="view-more-btn" onClick={handleViewMoreBtn}>
        {viewMoreBtn ? "Show less 🠩" : "Show more ⬇"}
      </button>
    </div>
  );
}

export default SidePage;