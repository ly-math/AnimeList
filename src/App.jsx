import { useState, useEffect } from "react";
import LoadingLayout from "./components/loadingLayout";
import Home from "./pages/Home";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

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
      <NavBar />
    </>
  );
}

export default App;