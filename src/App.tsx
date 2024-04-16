import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/Home";
import LogIn from "./components/LogInPage/LogIn";
import CreateAccount from "./components/CreateAccountPage/CreateAccount";
import { UserAuthProvider } from "./components/user-auth-context";
import PlaceBet from "./components/PlaceBetPage/PlaceBet";
import GamePlay from "./components/GamePage/GamePlay";
import { GameResponse } from "./api-calls";


function App() {

  const [gameState, setGameState] = useState<GameResponse>({
    playerHand: JSON.stringify([]), // Initial empty array for player hand
    playerScore: 0,
    dealerHand: JSON.stringify([]), // Initial empty array for dealer hand
    dealerScore: 0,
    gameOutcome: "",
  });
  
  return (
    <UserAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/PlaceBet" element={<PlaceBet />} />
          <Route path="/GamePlay" element={<GamePlay gameState={gameState} />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </Router>
    </UserAuthProvider>
  );
}

export default App;
