import React, { useContext } from "react";
import Card from "./Card"; // Import the Card component
import { GameResponse } from "../../api-calls";
import "./GamePlay.css";
import NavBar from "../LogInPage/NavBar";
import { GameStateContext } from "../game-state-context";

interface GamePlayProps {
  gameState: GameResponse;
}

const jsonResponse = {
  "playerHand": "ACE of SPADES, EIGHT of SPADES",
  "playerScore": 19,
  "dealerHand": "QUEEN of HEARTS, QUEEN of DIAMONDS",
  "dealerScore": 20,
  "gameOutcome": "NONE"
};

function GamePlay() {
  const { gameState } = useContext(GameStateContext);
  // Function to parse card string and extract rank and suit
  const parseCard = (cardString: string) => {
    const [rank, suit] = cardString.split(" of ");
    return { rank, suit };
  };

  // Parse player's hand
  const playerHand: string = gameState.playerHand;
  const playerCards: { rank: string; suit: string }[] = playerHand.split(", ").map(parseCard);

  // Parse dealer's hand
  const dealerHand: string = gameState.dealerHand;
  const dealerCards: { rank: string; suit: string }[] = dealerHand.split(", ").map(parseCard);

  console.log("Player Hand:", playerHand);
  console.log("Dealer Hand:", dealerHand);

  return (
    <>
      <NavBar />
      <div className="table">
        <img src="/assets/table.png" alt="Game Table" />
      </div>
      <div className="standHitContainers">
        <button>STAND</button>
        <button>HIT</button>
      </div>
      <div className="dealerCards">
        {dealerCards.map((card, index) => (
          <Card key={index + 100} suit={card.suit} rank={card.rank} />
        ))}
      </div>
      <div className="playerCards">
        {playerCards.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </div>
    </>
  );
};

export default GamePlay;