import React, { useEffect, useState, useRef } from "react";
import "../SCSS/current-season.scss";
import AnimeInfo from "./AnimeInfo";

function CurrentSeason() {
  const [isClicked, setIsClicked] = useState(false);
  const [clickData, setClickData] = useState();
  const [seasonNowData, setSeasonNowData] = useState([]);

  // --- Draggable Carousel Logic Start ---
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Prevent default browser drag behavior on the element itself
    if (e.target.closest('.card')) {
      e.preventDefault(); 
    }
    // Record the initial mouse position and current scroll position
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplier for slightly faster scroll
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Custom onClick handler to prevent firing after a drag
  const handleCardClick = (item) => (e) => {
      // Calculate how far the mouse has moved from the start of the click/drag
      const movedDistance = Math.abs(e.pageX - startX);
      
      // If the mouse has moved less than 5 pixels (i.e., it was a click, not a drag)
      if (movedDistance < 5) { 
          setClickData(item);
          setIsClicked(true);
      }
      // If it was a drag, the click event is effectively ignored
  };
  // --- Draggable Carousel Logic End ---

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

  // --- Caching Logic Start ---
  const CACHE_KEY = `animeSeasonData-${yearNow}-${seasonNow}`;
  // 24 hours in milliseconds
  const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; 

  async function fetchAnimeSeason() {
    // 1. Check Cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        try {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
                // Cache is fresh (less than 24 hours old)
                setSeasonNowData(data);
                return; // Exit without calling API
            }
        } catch (e) {
            // If cache data is corrupted, we will fetch new data
            localStorage.removeItem(CACHE_KEY); 
        }
    }

    // 2. Fetch from API (if cache expired or missing)
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/${yearNow}/${seasonNow}?limit=25` // Limit to 25 items
      );
      const dataJson = await response.json();
      const freshData = dataJson.data ? dataJson.data : [];
      setSeasonNowData(freshData);

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
    // Fetch data immediately on mount
    fetchAnimeSeason(); 
  }, []); 
  // --- Caching Logic End ---


  return (
    <>
      <h2 className="h2">{`Top ${upperCaseSeasonNow} ${yearNow}`}</h2>
      {/* Ensure you wrap the current-season in current-season-wrap */}
      <div className="current-season-wrap"> 
        <div 
          className="current-season"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {seasonNowData.length > 0
            ? seasonNowData.map((item, i) => (
                <div
                  className="card"
                  key={i}
                  // Use the custom click handler
                  onClick={handleCardClick(item)} 
                  // Remove the "draggable" attribute as it interferes with custom dragging
                >
                  <div className="img">
                    <img
                      src={item.images.jpg.large_image_url}
                      alt="anime-image"
                    />
                    <strong># {i + 1}</strong>
                  </div>
                </div>
              ))
            : <p>Loading anime data...</p>} 
        </div>
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