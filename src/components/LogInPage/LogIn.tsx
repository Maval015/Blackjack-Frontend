import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./LogIn.css";
import NavBar from "./NavBar";
import { UserAuthContext } from "../user-auth-context";

const BASE_URL = "http://localhost:8080";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserAuthContext);

  const handleUsername = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: {
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
        setUser(username);
      } else {
        console.error("Error logging in user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging in user", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/Game");
    }
  }, [user, navigate]);

  return (
    <>
      <NavBar />

      <div className="formContainer">
        <div className="logInForm">
          <h2 className="logInText">LOGIN</h2>
          <div className="signUpTextContainer">
            <p>Don't have an account yet?</p>
            <Link to="/CreateAccount">Sign Up</Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsername}
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
