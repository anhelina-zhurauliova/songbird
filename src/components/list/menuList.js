import React from "react";
import { Menulink } from "./menuLink";
import "./menu.scss";

// eslint-disable-next-line jsx-a11y/anchor-is-valid
export const MenuList = ({ info, level }) => (
  <ul className="links__container">
    {info.map((el, index) => {
      const navLevel = level - 1;
      return (
        <li key={index}>
          <Menulink isActive={navLevel === index} name={el} />
        </li>
      );
    })}
  </ul>
);
