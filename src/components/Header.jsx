import React, { useState } from "react";
import "../SCSS/header.scss";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <header className="header">
        <div className="spacer"></div>
        <h1>
          <a href="/">AnimeList</a>
        </h1>
        <div className="icon" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </header>
    </>
  );
};

export default Header;
