import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/Home";
import LogIn from "./components/LogInPage/LogIn";
import CreateAccount from "./components/CreateAccountPage/CreateAccount";
import { UserAuthProvider } from "./components/user-auth-context";
import { PlaceBet } from "./components/PlaceBetPage/PlaceBet";
import GamePlay from "./components/GamePage/GamePlay";

function App() {
  return (
    <UserAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/PlaceBet" element={<PlaceBet />} />
          <Route path="/GamePlay" element={<GamePlay />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Router>
    </UserAuthProvider>
  );
}

export default App;
