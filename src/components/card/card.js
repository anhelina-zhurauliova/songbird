import React, { useRef } from "react";
import classNames from "classnames";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import unknownImage from "../../assets/unknown-bird.png";
import "./card.scss";

export const Card = ({ isCardToShow, data, isFinished, clickedBird }) => {
  const species = clickedBird === null ? "Послушайте плеер." : data[0]?.species;
  const nameWithStars = data[0]?.name.split("").map((el) => (el = "*"));
  const nameOfBirdSecondCard = clickedBird === null ? null : data[0]?.name;
  const nameOfBirdFirstCard = isFinished
    ? data[0]?.name
    : nameWithStars?.join("");
  const description =
    clickedBird === null ? "Выберите птицу из списка" : data[0]?.description;
  const image = isCardToShow ? unknownImage : data[0]?.image;
  const player = useRef();

  const nameOfBirdClass = classNames({
    "name-of-bird": clickedBird !== null,
  });
  const speciesClass = classNames({
    "not-species-of-bird": clickedBird === null,
    "species-of-bird": clickedBird !== null,
  });
  const decriptionClass = classNames({
    "not-description-of-bird": clickedBird === null,
    "description-of-bird": clickedBird !== null,
  });
  const mainCardContainerClass = classNames({
    main_card__container: !isCardToShow,
    "main_card__container-before-click": clickedBird === null,
  });
  const cardContainerClass = classNames({
    card__container: true,
    "card__container-second": !isCardToShow,
  });

  if (isFinished) {
    player.current.audio.current.pause();
  }

  return (
    <div className={mainCardContainerClass}>
      <div className={cardContainerClass}>
        {clickedBird === null ? null : (
          <img
            className="image__bird"
            src={isFinished ? data[0]?.image : image}
            alt="bird"
          />
        )}
        <div className="card-info__container">
          <p className={nameOfBirdClass}>
            {isCardToShow ? nameOfBirdFirstCard : nameOfBirdSecondCard}
          </p>
          {isCardToShow ? null : <p className={speciesClass}>{species}</p>}
          {isCardToShow || clickedBird !== null ? (
            <AudioPlayer
              ref={player}
              src={data[0]?.audio}
              autoPlayAfterSrcChange={false}
              autoPlay={false}
              layout="horizontal-reverse"
              customAdditionalControls={[]}
            />
          ) : null}
          {isCardToShow ? null : (
            <p className={decriptionClass}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
