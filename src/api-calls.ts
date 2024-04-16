export interface PlayGameRequest {
  username: string;
  betAmount: number;
}

export interface GameResponse {
  playerHand: string;
  playerScore: number;
  dealerHand: string;
  dealerScore: number;
  gameOutcome: string;
}

export interface Card {
  suit: string;
  rank: string;
}

const BASE_URL = "http://localhost:8080"; // Adjust this URL to match your backend's URL

export const playGame = (request: PlayGameRequest): Promise<GameResponse> => {
  return fetch(`${BASE_URL}/api/playGame`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to start game");
    }
    return response.json();
  });
};

export const hit = (request: PlayGameRequest): Promise<GameResponse> => {
  return fetch(`${BASE_URL}/hit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to hit");
    }
    return response.json();
  });
};

export const stand = (request: PlayGameRequest): Promise<GameResponse> => {
  return fetch(`${BASE_URL}/stand`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to stand");
    }
    return response.json();
  });
};

// Test Case
const testPlayGame = () => {
  const request: PlayGameRequest = {
    username: "mattk",
    betAmount: 1000,
  };

  playGame(request)
    .then((response) => {
      console.log("playGame response:", response);
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

// Run the test case
testPlayGame();
