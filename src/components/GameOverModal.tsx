import React from "react";
import Modal from "react-modal";

interface GameOverModalProps {
  isOpen: boolean;
  outcome: string;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  outcome,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <div>
        {outcome === "PLAYER_WON" && <h2>You Won!</h2>}
        {outcome === "PLAYER_LOST" && <h2>You Lost!</h2>}
        {outcome === "TIE" && <h2>You Tied!</h2>}
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default GameOverModal;
