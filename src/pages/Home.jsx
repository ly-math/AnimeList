import React, { useEffect, useState } from "react";
import "../SCSS/home.scss";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import SidePage from "../components/SidePage";
import CurrentSeason from "../components/CurrentSeason";

const Home = () => {
  const [search, setSearch] = useState("");
  const [h2Search, setH2Search] = useState("Top Rating");

  const [onSubmitSearch, setOnSubmitSearch] = useState();
  const [animeData, setAnmieData] = useState();

  useEffect(() => {
    fetchData();
  }, [onSubmitSearch]);

  async function fetchData() {
    const response = await fetch(
      search
        ? `https://api.jikan.moe/v4/anime?q=${search}&limit=21`
        : "https://api.jikan.moe/v4/top/anime?q=&limit=21"
    );
    const data = await response.json();
    setAnmieData(data.data);
    // console.log(data.data);
  }

  return (
    <>
      <Header />
      <SearchBar
        setOnSubmitSearch={setOnSubmitSearch}
        setSearch={setSearch}
        search={search}
        setH2Search={setH2Search}
      />
      <div className="current-season-wrap">
        <CurrentSeason />
      </div>
      <div className="homepage-container">
        <main>
          <div className="anime-list-wrap" id="to-top">
            <AnimeList animeData={animeData} h2Search={h2Search} />
          </div>
        </main>

        <div className="side-page-wrap" id="to-top-2">
          <SidePage />
        </div>
      </div>
    </>
  );
};

export default Home;
