import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../LogInPage/NavBar";
import { playGame } from "../../api-calls";
import { UserAuthContext } from "../user-auth-context";
import "./PlaceBet.css";
import { GameStateContext } from "../game-state-context";

const BASE_URL = "http://localhost:8080";

function PlaceBet() {
  const { setGameState } = useContext(GameStateContext);
  const { betAmount, setBetAmount } = useContext(GameStateContext);

  const [username, setUsername] = useState("");
  const [userTokens, setUserTokens] = useState(0);

  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const startGame = () => {
    if (!user || !username) return;

    playGame({ username: user, betAmount })
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

      <div className="container">
        <div className="tableContainer">
          <img className="table" src="/assets/table.png" alt="Game Table" />

          <div className="gameInfo">
            <div className="textContainer">
              <h3 className="placeBetText">Place Your Bet!</h3>
              <p className="amountSelectedText">
                Amount Selected: ${betAmount}
              </p>
            </div>
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
            </div>
            <div className="playerInfoContainer">
              <div className="playerInfo">
                <p className="userName">{user}</p>
                <p className="lineSplit">|</p>
                <p className="availableTokens">
                  Available <br /> Tokens: ${userTokens}
                </p>
                <button className="clearBetButton" onClick={() => setBetAmount(0)}>
                  Clear Bet Amount
                </button>
              </div>
              <div>
                <button className="playButton" onClick={() => startGame()}>PLAY</button>
              </div>
            </div>
          </div>
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
