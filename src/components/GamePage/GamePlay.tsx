import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { GameResponse, hit, stand } from "../../api-calls";
import "./GamePlay.css";
import NavBar from "../LogInPage/NavBar";
import { GameStateContext } from "../game-state-context";
import { UserAuthContext } from "../user-auth-context";
import GameOverModal from "../GameOverModal";

export interface GamePlayProps {
  gameState: GameResponse;
}

function GamePlay() {
  const { betAmount } = useContext(GameStateContext);

  const { gameState, setGameState } = useContext(GameStateContext);
  const [username] = useState("");
  const { user } = useContext(UserAuthContext);

  const parseCard = (cardString: string) => {
    const [rank, suit] = cardString.split(" of ");
    return { rank, suit };
  };

  const handleHit = () => {
    hit({
      username,
      betAmount,
    })
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
    })
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

  const { playerScore } = gameState;

  const handleGameOver = (outcome: string) => {
    // Set the game over state and outcome
    setIsGameOver(true);
    setGameOverOutcome(outcome);
  };

  const checkFinalResponse = () => {
    // Example logic to determine game outcome based on gameState
    if (gameState.gameOutcome === "PLAYER_WON") {
      handleGameOver("You won!");
    } else if (gameState.gameOutcome === "PLAYER_LOST") {
      handleGameOver("You lost!");
    } else if (gameState.gameOutcome === "TIE") {
      handleGameOver("It's a tie!");
    }
  };

  useEffect(() => {
    checkFinalResponse();
  }, [gameState]);

  return (
    <>
      <NavBar />
      <div className="tableContainer1">
        <div className="table1">
          <img src="/assets/table.png" alt="Game Table" />
          <p className="dealer">DEALER</p>
          <p className="userName1">{user}</p>
          <p className="betAmount1">${betAmount}</p>
        </div>
        <div className="standHitContainers">
          <button className="standButton1" onClick={() => handleStand()}>
            STAND
          </button>
          <button className="hitButton1" onClick={() => handleHit()}>
            HIT
          </button>
        </div>
        <div className="Cards-container">
          <div className="dealerCards">
            {dealerCards.map((card, index) => (
              <Card
                key={index + 100}
                suit={card.suit}
                rank={card.rank}
                flipped={index === 1}
              />
            ))}
          </div>
          <div className="playerCards">
            {playerCards.map((card, index) => (
              <Card
                key={index}
                suit={card.suit}
                rank={card.rank}
                flipped={false}
              />
            ))}
          </div>
        </div>

        <div className="scoresContainer">
          <p className="dealerScore">?</p>
          <p className="playerScore">{playerScore}</p>
        </div>

        {/* <div>
          <GameOverModal
            isGameOngoing={setIsGameOver}
            outcome={setGameOverOutcome}
            onClose={() => setIsGameOver(false)}
          />
        </div> */}
      </div>
    </>
  );
}

export default GamePlay;
function setGameOverOutcome(outcome: string) {
  throw new Error("Function not implemented.");
}

function setIsGameOver(arg0: boolean) {
  throw new Error("Function not implemented.");
}
