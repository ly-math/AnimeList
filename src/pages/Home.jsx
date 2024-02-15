import React, { useEffect, useState } from "react";
import "../SCSS/home.scss";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import SidePage from "../components/SidePage";
import CurrentSeason from "../components/CurrentSeason";
import Recommendation from "../components/Recommendation";
import Genres from "../components/Genres";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

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
        ? `https://api.jikan.moe/v4/anime?q=${search}&limit=25`
        : "https://api.jikan.moe/v4/top/anime?q=&limit=25"
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
        <div id="to-top">
          <AnimeList animeData={animeData} h2Search={h2Search} />
        </div>

        <div className="side-page-wrap" id="to-top-2">
          <SidePage />
        </div>
      </div>
      <div className="recommendation-wrap" id="recommend">
        <Recommendation />
      </div>
      <div className="genres-wrap">
        <Genres />
      </div>

      <div className="footer-wrap">
        <Footer />
      </div>
    </>
  );
};

export default Home;
