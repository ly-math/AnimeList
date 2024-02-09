import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GenrePage() {
  const [allGenreData, setAllGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const { ID } = useParams();

  useEffect(() => {
    // setSelectedGenre(ID);
    // fetchGenreData();
    // fetchDataTest2();
  }, []);

  async function fetchGenreData() {
    // const response = await fetch(
    //   `https://api.jikan.moe/v4/recommendations/anime`
    // );
    // const dataJson = await response.json();
    // setAllGenreData(dataJson);
    // console.log(dataJson);
    // const filterGenreAnime = allGenreData.filter((anime) =>
    //   anime.genres.some((item) => item.mal_id == selectedGenre)
    // );
    // console.log(filterGenreAnime);
  }

  // async function fetchDataTest2() {
  //   const response = await fetch(
  //     `https://api.jikan.moe/v4/anime?genre?id=10&name=Fantasy&page=10`
  //   );
  //   const dataJson = await response.json();
  //   console.log(dataJson);
  // }

  return <div style={{ color: "white" }}>This page is on working.</div>;
}

export default GenrePage;
