import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GenrePage() {
  const [allGenreData, setAllGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const { mal_id } = useParams();

  useEffect(() => {
    setSelectedGenre(mal_id);
    // fetchDataTest();
    fetchDataTest2();
  }, []);

  async function fetchDataTest() {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?q=&limit=25`
    );
    const dataJson = await response.json();
    setAllGenreData(dataJson.data);

    const filterGenreAnime = dataJson.data.filter((anime) =>
      anime.genres.some((item) => item.name === selectedGenre)
    );
    // console.log(filterGenreAnime);
  }

  async function fetchDataTest2(page = 1) {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?genre=30&page=${page}`
    );
    const dataJson = await response.json();
    if (dataJson.data.length > 0) {
      fetchDataTest(page + 1);
    }
    console.log(dataJson);
  }

  return <div style={{ color: "white" }}>hello {mal_id}</div>;
}

export default GenrePage;
