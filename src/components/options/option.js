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
    if (!isFinished) {
      setClickedBird(idx);
      checkAnswer(idx, currentBird);
      if (idx === currentBird) {
        setRight(true);
      } else {
        console.log(1);
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
