import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function HomePage() {
  return (
    <>
      <div>
        <div className="backgroundImg">
          <img src="/public/assests/casino-pic.jpg" alt="Background Image" />
        </div>
        <div className="topBar">
          <h1 className="logoText">BlackJack</h1>
          <img
            className="logoImg"
            src="assests/logo-cards.svg"
            alt="BlackJack Logo"
          />
        </div>

        <div className="homePageContainers">
          <div className="welcomeText">
            <p>Welcome to BlackJack Online!</p>
            <p>
              Pull up a virtual chair, shuffle up the deck, and experience the
              excitement of 21 at your own pace. We offer secure betting, smooth
              gameplay, and thrilling opportunities to test your skills and win
              big!
            </p>
          </div>

          <div className="readyToPlay">
            <h2 className="R2PTitle">Ready to Play?</h2>
            <Link to="/LogIn" className="redButton">
              Log In
            </Link>
            <p className="orText">or</p>
            <Link to="/CreateAccount" className="redButton">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
