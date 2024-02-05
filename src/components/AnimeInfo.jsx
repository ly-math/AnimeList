import React from "react";
import "../SCSS/anime-info.scss";

function AnimeInfo({ clickData, setIsClicked }) {
  return (
    <div className="anime-info">
      <div className="container">
        <button onClick={() => setIsClicked(false)}>Back</button>
        <div className="top">
          <img src={clickData.images.jpg.large_image_url} alt="image" />
          <div className="text">
            <h4>{clickData.status}</h4>
            <h4>{clickData.type}</h4>
            <h4>Ep: {clickData.episodes}</h4>
            <h4>{clickData.year}</h4>
            <h4>
              Score: {clickData.score}{" "}
              <span>(by {clickData.scored_by} users)</span>
            </h4>
            <h4>Season: {clickData.season}</h4>
            <h4>Rank: #{clickData.rank}</h4>
            <h4>
              Studios:
              {clickData.studios[0].name ? clickData.studios[0].name : ""}, ...
            </h4>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${clickData.trailer.youtube_id}`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="middle">
          {clickData.title_english ? (
            <h3>{clickData.title_english}.</h3>
          ) : (
            <h3>{clickData.title_japanese}</h3>
          )}
          <div className="synopsis">
            <h4>Synopsis: </h4>
            <p>{clickData.synopsis}</p>
          </div>
          <div className="genre">
            <h4>Genre: </h4>
            {clickData.genres.map((item) => (
              <p key={item.mal_id}> {item.name}</p>
            ))}
          </div>
        </div>
        <div className="bottom">
          <div className="trailer">
            <iframe
              src={`https://www.youtube.com/embed/${clickData.trailer.youtube_id}`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeInfo;
