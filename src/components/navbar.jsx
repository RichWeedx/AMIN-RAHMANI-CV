import React from "react";
import "./navbar.css";

const Navbar = ({
  onHomeClick,
  onAboutClick,
  onProjectsClick,
  onContactClick,
}) => {
  return (
    <nav className="portfolio-card navbar" aria-label="Portfolio navigation">
      <button
        type="button"
        className="navbar-link"
        onClick={() => onHomeClick?.()}
      >
        Home
      </button>
      <button
        type="button"
        className="navbar-link"
        onClick={() => onAboutClick?.()}
      >
        About
      </button>
      <button
        type="button"
        className="navbar-link"
        onClick={() => onProjectsClick?.()}
      >
        Projects
      </button>
      <button
        type="button"
        className="navbar-link"
        onClick={() => onContactClick?.()}
      >
        Contact
      </button>
    </nav>
  );
};

export default Navbar;
