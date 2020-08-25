import React from "react";
import "./menu.scss";

// eslint-disable-next-line jsx-a11y/anchor-is-valid
export const MenuList = ({ info, level }) => {
  const navLevel = level - 1;
  return (
    <ul className="links__container">
      {info.map((el, index) => {
        return (
          <li
            className={
              navLevel === index ? "nav__link nav__link-active" : "nav__link"
            }
            key={index}
          >
            {el}
          </li>
        );
      })}
    </ul>
  );
};
