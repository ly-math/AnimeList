import React, { useEffect, useState } from "react";
import "../SCSS/home.scss";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import SidePage from "../components/SidePage";

const Home = () => {
  const [search, setSearch] = useState("");
  const [h2Search, setH2Search] = useState("Most Popular");

  const [onSubmitSearch, setOnSubmitSearch] = useState();
  const [animeData, setAnmieData] = useState();

  useEffect(() => {
    fetchData();
  }, [onSubmitSearch]);

  async function fetchData() {
    const response = await fetch(
      search
        ? `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
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
      <div className="homepage-container">
        <main>
          <div className="anime-list-wrap">
            <AnimeList animeData={animeData} h2Search={h2Search} />
          </div>
        </main>
        <SidePage />
      </div>
    </>
  );
};

export default Home;
