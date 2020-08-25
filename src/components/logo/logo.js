import React from "react";
import logo from "../../assets/logo.png";
import "./logo.scss";

export const Logo = () => (
  <React.Fragment>
    <h1>
      Song<span className="logo__green_letters">bird</span>
    </h1>
    <img className="logo__image" src={logo} alt="logo"></img>
  </React.Fragment>
);
