import React from "react";
import logo from "../../src/assets/Logo.png";

const NavBar = () => {
  return (
    <nav>
      <span className="flex bg-amber-500">
        <img src={logo} alt="Website's logo" />
        <h4 className="text-2xl font-extrabold">DOMINO'S PIZZA</h4>
      </span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  );
};

export default NavBar;
