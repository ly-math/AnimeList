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

const Home = () => {
  const [onSubmitSearch, setOnSubmitSearch] = useState();
  const [animeData, setAnmieData] = useState();

  useEffect(() => {
    fetchData();
  }, [onSubmitSearch]);

  async function fetchData() {
    const response = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await response.json();
    setAnmieData(data.data);
    // console.log(data.data);
  }

  return (
    <>
      <Header />
      <SearchBar setOnSubmitSearch={setOnSubmitSearch} />
      <div className="current-season-wrap">
        <CurrentSeason />
      </div>
      <div className="homepage-container">
        <div id="to-top">
          <AnimeList animeData={animeData} />
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
