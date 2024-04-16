import React, { useContext, useState } from "react";
import Card from "./Card"; // Import the Card component
import { GameResponse, hit, stand } from "../../api-calls";
import "./GamePlay.css";
import NavBar from "../LogInPage/NavBar";
import { GameStateContext } from "../game-state-context";

interface GamePlayProps {
  gameState: GameResponse;
}

// const jsonResponse = {
//   playerHand: "ACE of SPADES, EIGHT of SPADES",
//   playerScore: 19,
//   dealerHand: "QUEEN of HEARTS, QUEEN of DIAMONDS",
//   dealerScore: 20,
//   gameOutcome: "NONE",
// };

function GamePlay() {
  const { betAmount } = useContext(GameStateContext);

  const { gameState, setGameState } = useContext(GameStateContext);
  const [username] = useState("");

  const parseCard = (cardString: string) => {
    const [rank, suit] = cardString.split(" of ");
    return { rank, suit };
  };
  
  
  const handleHit = () => {
    hit({
      username,
      betAmount,
    }) // Assuming hit does not require betAmount
      .then((response) => {
        setGameState(response);
      })
      .catch((error) => {
        console.error("Failed to hit", error);
      });
  };

  const handleStand = () => {
    stand({
      username,
      betAmount,
    }) // Assuming stand does not require betAmount
      .then((response) => {
        setGameState(response);
      })
      .catch((error) => {
        console.error("Failed to stand", error);
      });
  };

  const playerHand: string = gameState.playerHand;
  const playerCards: { rank: string; suit: string }[] = playerHand
    .split(", ")
    .map(parseCard);

  const dealerHand: string = gameState.dealerHand;
  const dealerCards: { rank: string; suit: string }[] = dealerHand
    .split(", ")
    .map(parseCard);

  return (
    <>
      <NavBar />
      <div className="tableContainer1">
        <div className="table1">
          <img src="/assets/table.png" alt="Game Table" />
        </div>
        <div className="standHitContainers">
          <button className="standButton1" onClick={() => handleStand()}>
            STAND
          </button>
          <button className="hitButton1" onClick={() => handleHit()}>
            HIT
          </button>
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
      </div>
    </>
  );
}

export default GamePlay;
