import { useState, useEffect } from "react";
import LoadingLayout from "./components/LoadingLayout";
import Home from "./pages/Home";
import Header from "./components/Header";

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
      <Header />
      <Home />
    </>
  );
}

export default App;
