import React from "react";

export default function Flashcard({ card, showAnswer, onKnow, onDontKnow }) {
  return (
    <div className="card-container">
      <div className={`card ${showAnswer ? "flipped" : ""}`}>
        <div className="card-front">
          {card.image && <img src={card.image} alt="Flashcard" />}
          <h2>{card.question}</h2>
        </div>
        <div className="card-back">{card.answer}</div>
      </div>
      <div className="button-group">
        <button className="know" onClick={onKnow}>
          Know
        </button>
        <button className="dont-know" onClick={onDontKnow}>
          Don't Know
        </button>
      </div>
    </div>
  );
}
