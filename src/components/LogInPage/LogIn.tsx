import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";

const BASE_URL = "http://localhost:8080";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log("User logged in successfully");
      } else {
        console.error("Error logging in user");
      }
    } catch (error) {
      console.error("Error logging in user", error);
    }
  };

  return (
    <>
      <div className="navBar">
        <div className="logo">
          <h1>BlackJack</h1>
          <img
            className="cardLogo"
            src="assests/logo-cards.svg"
            alt="BlackJack Logo"
          />
        </div>
        <div className="navLinks">
          <h3 className="socialLink">Social</h3>
          <div className="profileLink">
            <img src="assests/profile-icon.svg" alt="Profile Icon" />
            <h3>Profile</h3>
          </div>
        </div>
      </div>

      <div className="formContainer">
        <div className="logInForm">
          <h2 className="logInText">LOGIN</h2>
          <div className="signUpTextContainer">
            <p className="signupText">Don't have an account yet?</p>
            <Link to="/CreateAccount">Sign Up</Link>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsername} />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
