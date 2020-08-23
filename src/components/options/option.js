import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import "./options.scss";

export const Option = ({
  name,
  idx,
  setClickedBird,
  checkAnswer,
  currentBird,
  isFinished,
}) => {
  const option = useRef(null);
  const [right, setRight] = useState(null);
  const optionDotClass = classNames({
    answer__indicator: true,
    "answer__indicator-right": right === true,
    "answer__indicator-wrong": right === false,
  });

  useEffect(() => {
    setRight(null);
  }, [idx]);

  const handleOptionClick = () => {
    setClickedBird(idx);
    if (!isFinished) {
      checkAnswer(idx, currentBird);
      if (idx === currentBird) {
        setRight(true);
        const audioCorrectAnswer = new Audio(
          "https://song.link/by/i/1481418646"
        );
        audioCorrectAnswer.play();
      } else {
        const audioWrongAnswer = new Audio("./correct_answer.mp3");
        audioWrongAnswer.play();
        setRight(false);
      }
    }
  };

  return (
    <div className="option__container" onClick={handleOptionClick}>
      <span className={optionDotClass} />
      <span ref={option} className="option" data-id={idx}>
        {name}
      </span>
    </div>
  );
};
