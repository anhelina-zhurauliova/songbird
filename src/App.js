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
  const [hideAfterFinish, setHideAfterFinish] = useState(false);
  const [isMaxScore, setIsMaxScore] = useState(false);

  const handleClickNextLevel = () => {
    if (isFinished) {
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
        setAttempts(0);
      } else {
        setScore((prevState) => {
          if (attempts < 5) {
            return prevState + 5 - attempts;
          } else {
            return prevState;
          }
        });
        setHideAfterFinish(true);
        if (attempts === 0 && score === 25) {
          setIsMaxScore(true);
        }
      }
    }
  };

  const handleClickTryAgainButton = () => {
    setLevel(1);
    setIsFinished(false);
    setClickedBird(null);
    setHideAfterFinish(false);
    setIsMaxScore(false);
    setScore(0);
    setAttempts(0);
  };

  useEffect(() => {
    const dataForCurrentLevel = birdsData.filter((el) => el.id === level);
    setDataForCard(dataForCurrentLevel.sort(() => Math.random() - 0.5));
    setCurrentBird(dataForCurrentLevel[0]?.unic);
    console.log("correct answer", dataForCurrentLevel[0]?.name);
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
    // margin_for__button: addMargin,
  });

  return (
    <div className="App">
      <div className="header__container">
        <Logo />
        <Score score={score} />
      </div>
      <MenuList info={infoMenu} level={level} />
      {hideAfterFinish ? null : (
        <div className="question__container">
          <Card
            isCardToShow={true}
            data={dataForCard}
            isFinished={isFinished}
          />
        </div>
      )}
      {hideAfterFinish ? null : (
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
      )}
      {hideAfterFinish ? null : (
        <button
          className={nextLevelBtnClass}
          type="button"
          onClick={handleClickNextLevel}
        >
          next level
        </button>
      )}

      {hideAfterFinish ? (
        <div className="end_game__container">
          <p className="cogratulations">Поздравляем!</p>
          <p className="score_congrats_text">
            Вы набрали {score} баллов из 30 возможных {isMaxScore ? "!" : "."}
          </p>
          {isMaxScore ? (
            <img
              className="max_score_gif"
              src="https://media.giphy.com/media/OHZ1gSUThmEso/giphy.gif"
              alt="congrats"
            />
          ) : null}
          {isMaxScore ? null : (
            <button
              className="try_again__button"
              onClick={handleClickTryAgainButton}
            >
              Попробовать еще раз
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
