import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../LogInPage/NavBar";
import { GameResponse, hit, playGame, stand } from "../../api-calls";
import { UserAuthContext } from "../user-auth-context";

const BASE_URL = "http://localhost:8080";

export function Game() {
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

    playGame({ username: user!, betAmount })
      .then((response) => {
        setGameState(response);
        navigate("/gameplay");
      })
      .catch((error) => {
        console.error("Failed to start game", error);
      });
  };

  useEffect(() => {
    if (user) {
      setUsername(user);
    }
  }, [user]);

  const handleHit = () => {
    hit({ username, betAmount })
      .then((response) => {
        setGameState(response);
      })
      .catch((error) => {
        console.error("Failed to hit", error);
      });
  };

  const handleStand = () => {
    stand({ username, betAmount })
      .then((response) => {
        setGameState(response);
      })
      .catch((error) => {
        console.error("Failed to stand", error);
      });
  };

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
      <div className="gameTable">
        <div className="table">
        <img src="/assets/table.png" alt="Game Table" />
        </div>

        <div>
          <h3>Place Your Bet!</h3>
          <p>Amount Selected: ${betAmount}</p>
          {betAmounts.map((amount) => (
            <button
              onClick={() =>
                setBetAmount((prev) => {
                  if (prev + amount <= userTokens) {
                    return prev + amount;
                  }
                  return prev;
                })
              }
            >
              <img
                src={`/assets/token-${amount}.png`}
                alt={`Token ${amount}`}
              />
            </button>
          ))}
          {userTokens === betAmounts[betAmounts.length - 1] && (
            <button onClick={() => setBetAmount(userTokens)}>
              <img src={`/assets/token-allin.png`} alt={`Token All In`} />
            </button>
          )}
          <p>{user}</p>
          <p>Available Tokens: ${userTokens}</p>
          <button onClick={() => setBetAmount(0)}>Clear bet amount</button>
          <button onClick={startGame}>PLAY</button>
        </div>
      </div>

      <div>
        <button>STAND</button>
        <button>HIT</button>
      </div>
    </>
  );
}
