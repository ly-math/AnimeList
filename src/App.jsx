import { useState, useEffect } from "react";
import LoadingLayout from "./components/LoadingLayout";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenrePage from "./pages/GenrePage";
import TopSeasonal from "./pages/TopSeasonal";
import TopRating from "./pages/TopRating";
import TopUpcoming from "./pages/TopUpcoming";
import SearchPage from "./pages/SearchPage";

function App() {
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setLoadingPage(false);
      document.body.style.overflow = "visible";
    }, 2500);
  }, []);

  return (
    <>
      <div className="loading-screen">
        {loadingPage ? <LoadingLayout loadingPage={loadingPage} /> : ""}
      </div>

      <Router>
        <Routes>
          <Route path="/AnimeList" element={<Home />} />
          <Route path="/AnimeList/genre/:ID" element={<GenrePage />} />
          <Route path="/AnimeList/top-seasonal/" element={<TopSeasonal />} />
          <Route path="/AnimeList/top-rating/" element={<TopRating />} />
          <Route path="/AnimeList/top-upcoming/" element={<TopUpcoming />} />
          <Route path="/AnimeList/search/:animeName" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
