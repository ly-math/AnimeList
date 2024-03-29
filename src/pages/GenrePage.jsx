import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../SCSS/genre-page.scss";
import LoadingLayout from "../components/LoadingLayout";
import PrevNextButtons from "../components/PrevNextButtons";
import Header from "../components/Header";

function GenrePage() {
  const [allGenreData, setAllGenreData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loadingPage, setLoadingPage] = useState(false);

  const location = useLocation();
  const genreName = location.state.genreName;
  const { ID } = useParams();

  useEffect(() => {
    fetchGenreData();
    setLoadingPage(true);
    document.body.style.overflow = "hidden";
  }, [currentPage]);

  async function fetchGenreData() {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?genres=${ID}&page=${currentPage}`
    );
    const dataJson = await response.json();
    setAllGenreData(dataJson.data);
    setTotalPage(Math.round(dataJson.pagination.items.total / 25));

    setLoadingPage(false);
    document.body.style.overflow = "visible";
    // console.log(dataJson);
    // console.log(totalPage);
  }

  function handlePrev() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    setLoadingPage(true);
  }
  function handleNext() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPage));
    setLoadingPage(true);
  }

  return (
    <>
      <Header />

      <div className="loading-screen for-genre">
        {loadingPage ? <LoadingLayout loadingPage={loadingPage} /> : ""}
      </div>

      <h2 className="h2 for-genre">Genre : {genreName}</h2>

      <div className="side-page for-genre">
        <PrevNextButtons
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentPage={currentPage}
          totalPage={totalPage}
        />

        <div className="anime-list-main-2 for-genre">
          {allGenreData.map((item, i) => {
            return (
              <div key={i} className="card">
                <div className="image">
                  <img src={item.images.jpg.large_image_url} alt="image" />
                  <span>Ep : {item.episodes}</span>
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
          })}
        </div>

        <PrevNextButtons
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>

      <div className="loading-screen for-genre">
        {loadingPage ? <LoadingLayout loadingPage={loadingPage} /> : ""}
      </div>
    </>
  );
}

export default GenrePage;
