import React from "react";

// eslint-disable-next-line jsx-a11y/anchor-is-valid
export const Menulink = ({ name, isActive }) => (
  <a className={isActive ? "menu__link menu__link-active" : "menu__link"}>
    {name}
  </a>
);
