import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateAccount.css";
import "../LogInPage/LogIn.css";
import NavBar from "../LogInPage/NavBar";

const BASE_URL = "http://localhost:8080";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmail = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

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

  const handleConfirmPassword = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/createAccount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      if (response.ok) {
        console.log("Account created successfully");
      } else {
        console.error("Error creating account");
      }
    } catch (error) {
      console.error("Error creating account", error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="formContainer">
        <div className="createAccForm">
          <h2 className="createAccText">CREATE ACCOUNT</h2>
          <div className="createAccTextContainer">
            <p>Have an account?</p>
            <Link to="/LogIn">Log In</Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmail}
              />
            </div>
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
            <div className="formGroup">
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
            </div>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
