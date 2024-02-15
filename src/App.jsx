import { useState, useEffect } from "react";
import LoadingLayout from "./components/LoadingLayout";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenrePage from "./pages/GenrePage";
import TopSeasonal from "./pages/TopSeasonal";
import TopRating from "./pages/TopRating";
import TopUpcoming from "./pages/TopUpcoming";
import TopRecommend from "./pages/TopRecommend";

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
          <Route path="/genre/:ID" element={<GenrePage />} />
          <Route path="/top-seasonal/" element={<TopSeasonal />} />
          <Route path="/top-rating/" element={<TopRating />} />
          <Route path="/top-upcoming/" element={<TopUpcoming />} />
          <Route path="/top-recommend/" element={<TopRecommend />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
