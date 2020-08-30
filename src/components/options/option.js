import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import correctAudio from "../../assets/correctSound.wav";
import incorrectAudio from "../../assets/incorrectSound.wav";

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
        const correctSound = new Audio();
        correctSound.preload = "auto";
        correctSound.src = correctAudio;
        correctSound.play();
      } else {
        const incorrectSound = new Audio();
        incorrectSound.preload = "auto";
        incorrectSound.src = incorrectAudio;
        incorrectSound.play();
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
