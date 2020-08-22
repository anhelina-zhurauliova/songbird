import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Logo } from "./components/logo/logo";
import { Score } from "./components/score/score";
import { MenuList } from "./components/list/menuList";
import { infoMenu, birdsData } from "./constants";
import { Card } from "./components/card/card";
import { OptionsList } from "./components/options/optionsList";

import "./App.css";

function App() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [clickedBird, setClickedBird] = useState(null);
  const [currentBird, setCurrentBird] = useState(null);
  const [dataForCard, setDataForCard] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleClickNextLevel = () => {
    if (level < 6) {
      setLevel((prevState) => prevState + 1);
      setIsFinished(false);
      setClickedBird(null);
      setScore((prevState) => {
        if (attempts < 5) {
          return prevState + 5 - attempts;
        } else {
          return prevState;
        }
      });
    } else {
    }
  };
  useEffect(() => {
    const dataForCurrentLevel = birdsData.filter((el) => el.id === level);
    setDataForCard(dataForCurrentLevel.sort(() => Math.random() - 0.5));
    setCurrentBird(dataForCurrentLevel[0]?.unic);
  }, [level]);

  const dataForOptions = birdsData.filter(
    (el) => el.unic === clickedBird && el.id === level
  );

  const checkAnswer = (clicked, current) => {
    if (clicked !== current && !isFinished) {
      setAttempts((prevState) => prevState + 1);
    } else {
      setIsFinished(true);
    }
  };
  const nextLevelBtnClass = classNames({
    next_level__button: true,
    "next_level__button-active": isFinished,
  });
  return (
    <div className="App">
      <div className="header__container">
        <Logo />
        <Score score={score} />
      </div>
      <div className="menu__container">
        <MenuList info={infoMenu} level={level} />
      </div>
      <div className="question__container">
        <Card isCardToShow={true} data={dataForCard} isFinished={isFinished} />
      </div>
      <div className="game__container">
        <OptionsList
          idx={level}
          setClickedBird={setClickedBird}
          checkAnswer={checkAnswer}
          clickedBird={clickedBird}
          currentBird={currentBird}
          isFinished={isFinished}
        />
        <Card
          isCardToShow={false}
          data={dataForOptions}
          clickedBird={clickedBird}
        />
      </div>
      <button
        className={nextLevelBtnClass}
        type="button"
        onClick={handleClickNextLevel}
      >
        next level
      </button>
    </div>
  );
}

export default App;
