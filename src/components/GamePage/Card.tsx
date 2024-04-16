import React from "react";
import "./Card.css";

interface CardProps {
  suit: string;
  rank: string;
}

const Card: React.FC<CardProps> = ({ suit, rank }) => {
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case "SPADES":
        return "♠";
      case "HEARTS":
        return "♥";
      case "DIAMONDS":
        return "♦";
      case "CLUBS":
        return "♣";
      default:
        return "default";
    }
  };

  const getRankSymbol = (rank: string) => {
    switch (rank) {
      case "ACE":
        return "A";
      case "KING":
        return "K";
      case "QUEEN":
        return "Q";
      case "JACK":
        return "J";
      case "TWO":
        return "2";
      case "THREE":
        return "3";
      case "FOUR":
        return "4";
      case "FIVE":
        return "5";
      case "SIX":
        return "6";
      case "SEVEN":
        return "7";
      case "EIGHT":
        return "8";
      case "NINE":
        return "9";
      case "TEN":
        return "10";
      default:
        return rank;
    }
  };

  return (
    <div className="card">
      <div className="card-top">
        <span>{getSuitSymbol(suit)}</span>
      </div>
      <div className="card-center">
        <span className="rank">{getRankSymbol(rank)}</span>
      </div>
      <div className="card-bottom">
        <span>{getSuitSymbol(suit)}</span>
      </div>
    </div>
  );
};

export default Card;
