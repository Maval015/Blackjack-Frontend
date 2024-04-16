import { createContext, useEffect, useMemo, useState } from "react";
import { GameResponse } from "../api-calls";

type GameStateContext = {
  gameState: GameResponse;
  setGameState: React.Dispatch<React.SetStateAction<GameResponse>>;
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
};

export const GameStateContext = createContext<GameStateContext>({
  gameState: {
    playerHand: JSON.stringify([]),
    playerScore: 0,
    dealerHand: JSON.stringify([]),
    dealerScore: 0,
    gameOutcome: "",
  },
  setGameState: () => {},
  betAmount: 0,
  setBetAmount: () => {},
});

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameResponse>({
    playerHand: JSON.stringify([]),
    playerScore: 0,
    dealerHand: JSON.stringify([]),
    dealerScore: 0,
    gameOutcome: "",
  });

  const [betAmount, setBetAmount] = useState(0);

  const value = useMemo(() => ({ gameState, setGameState, betAmount, setBetAmount }), [gameState, betAmount]);

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}
