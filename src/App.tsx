import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/Home";
import LogIn from "./components/LogInPage/LogIn";
import CreateAccount from "./components/CreateAccountPage/CreateAccount";
import { UserAuthProvider } from "./components/user-auth-context";
import PlaceBet from "./components/PlaceBetPage/PlaceBet";
import GamePlay from "./components/GamePage/GamePlay";
import { GameStateProvider } from "./components/game-state-context";

function App() {
  return (
    <UserAuthProvider>
      <GameStateProvider>
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
      </GameStateProvider>
    </UserAuthProvider>
  );
}

export default App;
