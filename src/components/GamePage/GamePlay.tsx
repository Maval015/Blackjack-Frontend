import React from "react";
import Card from "./Card"; // Import the Card component
import { GameResponse } from "../../api-calls";
import "./GamePlay.css";
import NavBar from "../LogInPage/NavBar";

interface GamePlayProps {
  gameState: GameResponse;
}

const GamePlay: React.FC<GamePlayProps> = ({ gameState }) => {
  const parseHand = (hand: string) => {
    return hand.split(", ").map((cardStr) => {
      const [rank, suit] = cardStr.split(" of ");
      return { rank, suit };
    });
  };

  const playerHand = parseHand(gameState.playerHand);
  const dealerHand = parseHand(gameState.dealerHand);

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
      <div className="playerCards">
        {playerHand.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </div>
      <div className="dealerCards">
        {dealerHand.map((card, index) => (
          <Card key={index} suit={card.suit} rank={card.rank} />
        ))}
      </div>
    </>
  );
};

export default GamePlay;
