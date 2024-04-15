import React from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";

function NavBar() {
    return (
    <div className="navBar">
        <Link className="logo" to={"/"}>
          <h1>BlackJack</h1>
          <img
            className="cardLogo"
            src="assests/logo-cards.svg"
            alt="BlackJack Logo"
          />
        </Link>
        <div className="navLinks">
          <h3 className="socialLink">Social</h3>
          <div className="profileLink">
            <img src="assests/profile-icon.svg" alt="Profile Icon" />
            <h3>Profile</h3>
          </div>
        </div>
      </div>
    );
}

export default NavBar;