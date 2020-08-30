import React from "react";
import "./score.scss";

export const Score = ({ score }) => {
  return (
    <div className="score__container">
      <p className="score__text">
        Score:<span> {score}</span>
      </p>
    </div>
  );
};
