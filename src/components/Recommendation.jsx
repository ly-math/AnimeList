import React, { useState, useEffect } from "react";
import "../SCSS/recommendation.scss";

function Recommendation() {
  const [sliceRecommData, setSliceRecommData] = useState([]);
  
  // --- Caching Logic Start ---
  const CACHE_KEY = "animeRecommendationData";
  const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

  async function fetchRecommData() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        try {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
                setSliceRecommData(data);
                return; // Exit without calling API
            }
        } catch (e) {
            // Corrupted cache, proceed to fetch new data
            localStorage.removeItem(CACHE_KEY); 
        }
    }

    try {
        const response = await fetch(
            `https://api.jikan.moe/v4/recommendations/anime`
        );
        const dataJson = await response.json();
        
        const freshData = dataJson.data ? dataJson.data.slice(0, 30) : [];
        setSliceRecommData(freshData);
        
        const newCache = {
            data: freshData,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
        
    } catch (error) {
        console.error("Jikan API Fetch Error:", error);
    }
  }

  useEffect(() => {
    fetchRecommData();
  }, []); 
  // --- Caching Logic End ---

  return (
    <>
      <h2 className="h2">Top Recommends</h2>
      <div className="recommendation">
        {sliceRecommData.length > 0 ? (
          sliceRecommData.map((item, i) => (
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
          ))
        ) : (
          <p>Loading recommendations...</p>
        )}
      </div>
    </>
  );
}

export default Recommendation;