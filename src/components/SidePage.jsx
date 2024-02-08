import React, { useEffect, useState } from "react";
import AnimeInfo from "./AnimeInfo";
import "../SCSS/side-page.scss";

function SidePage() {
  const [upComingAnime, setUpComingAnime] = useState([]);

  const [isClicked, setIsClicked] = useState(false);
  const [clickData, setClickData] = useState();
  const [viewMoreBtn, setViewMoreBtn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetchUpComing();
    }, 4000);
  }, []);

  async function fetchUpComing() {
    const res = await fetch(
      `https://api.jikan.moe/v4/seasons/upcoming?q=&limit=25`
    );
    const result = await res.json();
    setUpComingAnime(result.data);
  }

  function handleViewMoreBtn() {
    setViewMoreBtn(!viewMoreBtn);
  }

  return (
    <div className={viewMoreBtn ? "side-page full-width" : "side-page"}>
      <h2 className="h2">Top Upcoming</h2>
      <div className="anime-list-main-2">
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
                    <span>Ep : {item.episodes || "?"}</span>
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
        <a href="#to-top-2">{viewMoreBtn ? "Show less 🠩" : "Show more ⬇"}</a>
      </button>
    </div>
  );
}

export default SidePage;
