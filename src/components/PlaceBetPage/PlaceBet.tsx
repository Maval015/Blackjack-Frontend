import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../LogInPage/NavBar";
import { PlayGameRequest, GameResponse, playGame } from "../../api-calls";
import { UserAuthContext } from "../user-auth-context";
import "./PlaceBet.css";

const BASE_URL = "http://localhost:8080";

function PlaceBet() {
  const [gameState, setGameState] = useState<GameResponse>({
    playerHand: JSON.stringify([]),
    playerScore: 0,
    dealerHand: JSON.stringify([]),
    dealerScore: 0,
    gameOutcome: "",
  });

  const [username, setUsername] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [userTokens, setUserTokens] = useState(0);

  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const startGame = () => {
    if (!user || !username) return;

    const request: PlayGameRequest = { username: user, betAmount };
    playGame(request)
      .then((response) => {
        console.log("Game started successfully:", response);
        setGameState(response);
        navigate("/GamePlay");
      })
      .catch((error) => {
        console.error("Error starting game:", error);
      });
  };

  useEffect(() => {
    if (user) {
      setUsername(user);
    }
  }, [user]);

  // const handleHit = () => {
  //   hit({ username, betAmount })
  //     .then((response) => {
  //       setGameState(response);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to hit", error);
  //     });
  // };

  // const handleStand = () => {
  //   stand({ username, betAmount })
  //     .then((response) => {
  //       setGameState(response);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to stand", error);
  //     });
  // };

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (user) {
        const response = await fetch(`${BASE_URL}/api/user-tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user }),
        });
        const data = await response.text();
        console.log(data);
        setUserTokens(parseInt(data));
      }
    };

    fetchUserTokens();
  }, [user]);

  const betAmounts = [5, 10, 50, 100, 500, 1000] as const;

  return (
    <>
      <NavBar />
      <img className="table" src="/assets/table.png" alt="Game Table" />
      <div className="container">
        <div className="gameInfo">
          <h3 className="placeBetText">Place Your Bet!</h3>
          <p className="amountSelectedText">Amount Selected: ${betAmount}</p>
          <div className="tokensButton">
            {betAmounts.map((amount) => (
              <button
                className="tokensButton"
                onClick={() =>
                  setBetAmount((prev) => {
                    if (prev + amount <= userTokens) {
                      return prev + amount;
                    }
                    return prev;
                  })
                }
              >
                <div>
                  <img
                    className="tokens"
                    src={`/assets/token-${amount}.png`}
                    alt={`Token ${amount}`}
                  />
                </div>
              </button>
            ))}
          </div>
          {userTokens === betAmounts[betAmounts.length - 1] && (
            <button
              className="tokensButton"
              onClick={() => setBetAmount(userTokens)}
            >
              <img
                className="tokens"
                src={`/assets/token-allin.png`}
                alt={`Token All In`}
              />
            </button>
          )}
          <p>{user}</p>
          <p>Available Tokens: ${userTokens}</p>
          <button onClick={() => setBetAmount(0)}>Clear bet amount</button>
          <button onClick={() => startGame()}>PLAY</button>
        </div>
        <div className="standHitContainer">
          <button className="standButton">STAND</button>
          <button className="hitButton">HIT</button>
        </div>
      </div>
    </>
  );
}

export default PlaceBet;
