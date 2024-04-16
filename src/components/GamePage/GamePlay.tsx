import React from "react";
import NavBar from "../LogInPage/NavBar";
import "./GamePlay.css";

function GamePlay() {
  return (
    <>
      <NavBar />
      <div>
        <div className="table">
          <img src="/assets/table.png" alt="Game Table" />
        </div>
        <div className="standHitContainers">
          <button>STAND</button>
          <button>HIT</button>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
