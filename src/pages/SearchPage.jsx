import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function SearchPage() {
  const [searchData, setSearchData] = useState([]);
  const { animeName } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${animeName}`
    );
    const json = await response.json();
    setSearchData(json.data);

    console.log(json);
  }

  return (
    <>
    <Header />
      <h2 className="h2">Search Result</h2>
      <div className="side-page for-genre">
        <div className="anime-list-main-2 for-genre">
          {searchData ? (
            searchData.map((item, i) => {
              return (
                <div className="card" key={(item.mal_id, i)}>
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
          ) : (
            <h2 className="h2">Anime not found!</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
