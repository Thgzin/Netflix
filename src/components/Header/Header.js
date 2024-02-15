import React from "react";

import "./Header.css";

const Header = ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src="../assets/netflix-logo-png-2582.png" alt="netflix" />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img src="../assets/6759280.png" alt="usuarios" />
        </a>
      </div>
    </header>
  );
};

export default Header;
