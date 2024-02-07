import React, { useEffect, useState } from "react";
import "../SCSS/current-season.scss";

function CurrentSeason() {
  const [isClicked, setIsClicked] = useState(false);

  const [seasonNowData, setSeasonNowData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchAnimeSeason();
    }, 4000);
  }, []);

  function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth() + 1;

    if (month >= 3 && month <= 5) {
      return "spring";
    } else if (month >= 6 && month <= 8) {
      return "summer";
    } else if (month >= 9 && month <= 11) {
      return "fall";
    } else {
      return "winter";
    }
  }
  const seasonNow = getCurrentSeason();
  const upperCaseSeasonNow =
    getCurrentSeason().charAt(0).toUpperCase() + seasonNow.slice(1);
  const yearNow = new Date().getFullYear();

  async function fetchAnimeSeason() {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/${yearNow}/${seasonNow}`
      );
      const dataJson = await response.json();
      setSeasonNowData(dataJson.data);
      // console.log(dataJson.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2 className="h2">{`Top ${upperCaseSeasonNow} ${yearNow}`}</h2>
      <div className="current-season">
        {seasonNowData.map((item, i) => (
          <div
            className="card"
            key={i}
            onClick={() => {
              setClickData(item);
              setIsClicked(true);
            }}
          >
            <div className="img">
              <img src={item.images.jpg.large_image_url} alt="anime-image" />
              <strong># {i + 1}</strong>
            </div>
          </div>
        ))}
      </div>
      {isClicked ? (
        <div>
          <AnimeInfo clickData={clickData} setIsClicked={setIsClicked} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CurrentSeason;
