import React, { useEffect, useState } from "react";
import "../SCSS/genres.scss";
import { Link, useNavigate } from "react-router-dom";

function Genres() {
  const [genresData, SetGenresData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  // --- Caching Logic Start ---
  const CACHE_KEY = "animeGenresData";
  // Genres are static, so we can set a very long cache expiration (e.g., 30 days)
  const CACHE_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; 

  async function fetchGenresData() {
    // 1. Check Cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        try {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
                // Cache is fresh
                SetGenresData(data);
                return; // Exit without calling API
            }
        } catch (e) {
            // Corrupted cache, proceed to fetch new data
            localStorage.removeItem(CACHE_KEY); 
        }
    }

    // 2. Fetch from API (if cache expired or missing)
    try {
        const res = await fetch(`https://api.jikan.moe/v4/genres/anime`);
        const json = await res.json();
        const freshData = json.data || [];
        SetGenresData(freshData);
        
        // 3. Update Cache
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
    // Call the function immediately on mount, the caching logic handles everything else
    fetchGenresData();
  }, []); 
  // --- Caching Logic End ---

  return (
    <>
      <h2 className="h2 genre-section">Genres</h2>
      <div
        className={isClicked ? "genres expand" : "genres"}
        id="genre-section"
      >
        {genresData.length > 0
          ? genresData.map((item) => (
              <div
                className="genre-list"
                // 🔥 Use the unique ID from Jikan as the key, not the index
                key={item.mal_id} 
                onClick={() => {
                  navigate(`/AnimeList/genre/${item.mal_id}`, {
                    state: { genreName: item.name },
                  });
                }}
              >
                <p>{item.name}</p>
              </div>
            ))
          : <p>Loading genres...</p>} 
        
        <button onClick={() => setIsClicked(!isClicked)}>
          {isClicked ? "Show less?" : "Show More?"}
        </button>
      </div>
    </>
  );
}

export default Genres;