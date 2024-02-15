import React, { useEffect, useState } from "react";
import PrevNextButtons from "../components/PrevNextButtons";
import LoadingLayout from "../components/LoadingLayout";
import Header from "../components/Header";
import AnimeInfo from "../components/AnimeInfo";
import Footer from "../components/Footer";

function TopSeasonal() {
  const [seasonalData, setSeasonalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [loadingPage, setLoadingPage] = useState(false);
  const [clickData, setClickData] = useState();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchAnimeSeason();
    setLoadingPage(true);
    document.body.style.overflow = "hidden";
  }, [currentPage]);

  async function fetchAnimeSeason() {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/seasons/now?&page=${currentPage}`
      );
      const dataJson = await response.json();
      setSeasonalData(dataJson.data);
      setTotalPage(Math.round(dataJson.pagination.items.total / 25));
      setLoadingPage(false);
      document.body.style.overflow = "visible";

      // console.log(dataJson);
    } catch (error) {
      console.error(error);
    }
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

      <h2 className="h2 for-genre">TopSeasonal</h2>

      <div className="side-page for-genre">
        <PrevNextButtons
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentPage={currentPage}
          totalPage={totalPage}
        />

        <div className="anime-list-main-2 for-genre">
          {seasonalData.map((item, i) => {
            return (
              <div
                key={i}
                className="card"
                onClick={() => {
                  setClickData(item);
                  setIsClicked(true);
                }}
              >
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

      <div className="footer-wrap">
        <Footer />
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

export default TopSeasonal;
