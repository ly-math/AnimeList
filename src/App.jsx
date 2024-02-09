import { useState, useEffect } from "react";
import LoadingLayout from "./components/loadingLayout";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenrePage from "./pages/GenrePage";

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
          <Route path="/AnimeList/" element={<Home />} />
          <Route path="/genre/:mal_id" element={<GenrePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
