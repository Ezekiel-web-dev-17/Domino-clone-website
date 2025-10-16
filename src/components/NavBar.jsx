import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/Logo.png";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow sm:px-28 sm:py-0">
      <span className="flex gap-3 cursor-pointer">
        <img src={logo} alt="Website's logo" />
        <h4 className="inline-block text-2xl font-extrabold text-transparent bg-gradient-to-r from-blue-700 via-purple-950 to-red-500 bg-clip-text">
          DOMINO'S PIZZA
        </h4>
      </span>
      {open && (
        <ul className="nav-links animate-accordion-down gap-10 *:font-extrabold *:text-lg *:text-blue-600 *:italic sm:*:not-italic absolute top-16 sm:top-0 z-40 right-0 py-7 sm:relative flex-col sm:flex-row oswald flex bg-white w-1/2 h-[90vh] sm:h-1/12">
          <Link to="/menu">
            <li>MENU</li>
          </Link>
          <Link to="/deals">
            <li>DEALS</li>
          </Link>
          <Link to="/about-us">
            <li>ABOUT US</li>
          </Link>
          <Link to="/contact">
            <li>CONTACT</li>
          </Link>
          <Link
            to="/cart"
            className="relative text-blue-900 sm:hidden outline-4 animate-pulse outline-red-700"
          >
            <li>CART</li>
          </Link>
        </ul>
      )}
      <Link className="relative hidden sm:flex" to="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={`${window.innerWidth < 450 ? "18" : "26"}`}
          height={`${window.innerHeight < 450 ? "18" : "26"}`}
          fill="blue"
          className="relative font-bold cursor-pointer bi bi-cart3-fill"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
      </Link>
      <div
        className="relative flex sm:hidden"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
          console.log(open);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="blue"
          className="relative block cursor-pointer bi bi-list sm:hidden"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
      </div>
    </nav>
  );
};

export default NavBar;
