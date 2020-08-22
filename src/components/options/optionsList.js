import React from "react";
import { Option } from "./option";
import { birdsData } from "../../constants";

export const OptionsList = ({
  idx,
  setClickedBird,
  checkAnswer,
  clickedBird,
  currentBird,
  isFinished,
}) => {
  const dataForOprions = birdsData.filter((el) => el.id === idx);
  return (
    <div className="options__container">
      <div className="options__list" onClick={(e) => console.log(e.target)}>
        {dataForOprions.map((el, idx) => (
          <Option
            name={el.name}
            key={idx}
            idx={el.unic}
            setClickedBird={setClickedBird}
            checkAnswer={checkAnswer}
            clickedBird={clickedBird}
            currentBird={currentBird}
            isFinished={isFinished}
          />
        ))}
      </div>
    </div>
  );
};
