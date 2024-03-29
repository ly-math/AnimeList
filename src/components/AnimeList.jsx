import React, { useEffect, useState } from "react";
import "../SCSS/anime-list.scss";
import AnimeInfo from "./AnimeInfo";

function AnimeList({ animeData }) {
  const [isClicked, setIsClicked] = useState(false);
  const [clickData, setClickData] = useState();
  const [viewMoreBtn, setViewMoreBtn] = useState(false);

  function handleViewMoreBtn() {
    setViewMoreBtn(!viewMoreBtn);
  }

  return (
    <>
      <h2 className="h2 most-popular">Top Rating</h2>
      <div
        className={
          viewMoreBtn ? "anime-list-wrap full-width" : "anime-list-wrap"
        }
      >
        <div className="anime-list-main">
          {animeData
            ? animeData.map((item, i) => {
                return (
                  <div
                    key={(item.mal_id, i)}
                    className="card"
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
          <a href="#to-top">{viewMoreBtn ? "Show less" : "Show more"}</a>
        </button>
      </div>
    </>
  );
}

export default AnimeList;
