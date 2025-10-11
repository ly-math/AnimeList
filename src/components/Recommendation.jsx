import React, { useState, useEffect } from "react";
import "../SCSS/recommendation.scss";

function Recommendation() {
  const [sliceRecommData, setSliceRecommData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetchRecommData();
    }, 5000);
  }, []);

  async function fetchRecommData() {
    const response = await fetch(
      `https://api.jikan.moe/v4/recommendations/anime`
    );
    const dataJson = await response.json();
    const sliceData = await dataJson.data.slice(0, 30);
    setSliceRecommData(sliceData);
  }
  // console.log(sliceRecommData);

  return (
    <>
      <h2 className="h2">Top Recommends</h2>
      <div className="recommendation">
        {sliceRecommData.map((item, i) => (
          <div className="card-wrap" key={i}>
            {item.entry.map((entry) => (
              <div className="card" key={entry.mal_id}>
                <div className="img">
                  <img
                    src={entry.images.webp.large_image_url}
                    alt="anime-image"
                  />
                  <strong>{entry.title}</strong>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Recommendation;
