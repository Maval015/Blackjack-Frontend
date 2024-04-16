import React from "react";
import "./Card.css"; 

interface CardProps {
  suit: string;
  rank: string;
}

const Card: React.FC<CardProps> = ({ suit, rank }) => {
  return (
    <div className={`card ${suit}`}>
      <div className="card-top">
        <span>{rank}</span>
        <span>{suit}</span>
      </div>
      <div className="card-center">
        <span className="rank">{rank}</span>
      </div>
      <div className="card-bottom">
        <span>{suit}</span>
        <span>{rank}</span>
      </div>
    </div>
  );
};

export default Card;
