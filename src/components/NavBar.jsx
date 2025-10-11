import React, { useState } from "react";
import "../SCSS/nav-bar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar({ isOpen, setIsOpen }) {
  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className={`nav-bar ${isOpen ? "close" : ""}`}>
        <div className="icon" onClick={handleClick}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="link">
          <h4>
            <a href="/AnimeList/">Home</a>
          </h4>
          <Link to="/AnimeList/top-seasonal/">
            <h4>Top Seasonal</h4>
          </Link>
          <Link to="/AnimeList/top-rating/">
            <h4>Top Rating</h4>
          </Link>
          <Link to="/AnimeList/top-upcoming/">
            <h4>Top Upcoming</h4>
          </Link>
          <h4>
            <a href="#recommend">Top Recommends</a>
          </h4>
          <h4>
            <a href="#genre-section">Genres</a>
          </h4>
        </div>
      </div>
    </>
  );
}

export default NavBar;
