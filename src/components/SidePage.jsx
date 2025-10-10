import React, { useEffect, useState } from "react";
import AnimeInfo from "./AnimeInfo";
import "../SCSS/side-page.scss";

function SidePage() {
  const [upComingAnime, setUpComingAnime] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [clickData, setClickData] = useState();
  const [viewMoreBtn, setViewMoreBtn] = useState(false);

  // --- Caching Logic Start ---
  const CACHE_KEY = "animeUpcomingData";
  const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; 

  async function fetchUpComing() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        try {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
                setUpComingAnime(data);
                return; 
            }
        } catch (e) {
            localStorage.removeItem(CACHE_KEY); 
        }
    }

    try {
        const res = await fetch(
            `https://api.jikan.moe/v4/seasons/upcoming?q=&limit=25` 
        );
        const result = await res.json();
        const freshData = result.data || [];
        setUpComingAnime(freshData);
        
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
    fetchUpComing(); 
  }, []);
  // --- Caching Logic End ---

  function handleViewMoreBtn() {
    setViewMoreBtn(!viewMoreBtn);
  }

  return (
    <div id="to-top-2" className={viewMoreBtn ? "side-page full-width-2" : "side-page"}>
      <h2 className="h2">Top Upcoming</h2>
      <div className="anime-list-main-2">
        {upComingAnime.length > 0
          ? upComingAnime.map((item, i) => {
              return (
                <div
                  className="card"
                  key={item.mal_id || i} 
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
          : <p>Loading upcoming anime...</p>} 

        {isClicked ? (
          <div>
            <AnimeInfo clickData={clickData} setIsClicked={setIsClicked} />
          </div>
        ) : (
          ""
        )}
      </div>
      
      {/* Only show the button if data has loaded */}
      {upComingAnime.length > 0 && (
          <button className="view-more-btn" onClick={handleViewMoreBtn}>
              {/* Added a smooth scroll to the top of the list when clicked */}
              <a href="#to-top-2">{viewMoreBtn ? "Show less" : "Show more"}</a>
          </button>
      )}
    </div>
  );
}

export default SidePage;