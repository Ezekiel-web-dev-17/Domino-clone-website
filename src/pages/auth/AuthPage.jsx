import React, { useState } from "react";
import "./AuthPage.css";
import logo from "../../../src/assets/Logo.jpg";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <div className="authpg flex align-center justify-end">
      <form
        action=""
        method="post"
        id="sign-form"
        className="border-7 border-white w-100 fixed right-1/10 rounded-3xl top-1/7 flex flex-col align-center justify-center py-9 gap-9 backdrop-blur-[8px] background-color: rgba(105, 105, 105, 0.25);"
      >
        <div className="flex gap-2 w-75 h-fit justify-center align-center place-self-center">
          <img
            src={logo}
            alt="Domino's logo"
            width="50px"
            height="30px"
            className=" h-[50px]"
          />
          <Link to="/">
            <h1 className="text-3xl font-semibold text-white mb-0">
              Domino's Pizza
            </h1>
          </Link>
        </div>

        {isSignUp && (
          <div className="flex w-75 gap-5 text-white flex-col align-start">
            <div className="flex w-100 gap-3 text-white justify-center align-center">
              <label htmlFor="sign-form" className="text-[18px] font-normal">
                Name:
              </label>
              <input
                type="text"
                className="border-b-white border-b-2 px-3 focus:outline-none"
              />
            </div>
            <div className="flex w-100 gap-3 text-white  justify-center align-center">
              <label htmlFor="sign-form" className="text-[18px] font-normal">
                Email:
              </label>
              <input
                type="email"
                className="border-b-white border-b-2 px-3 focus:outline-none"
              />
            </div>
            <div className="flex w-100 gap-3 text-white  justify-center align-center">
              <label htmlFor="sign-form" className="text-[18px] font-normal">
                Password:
              </label>
              <input
                type="password"
                className="border-b-white border-b-2 px-3 focus:outline-none"
              />
            </div>
          </div>
        )}

        {!isSignUp && (
          <div className="flex w-75 gap-5 text-white flex-col align-start">
            <div className="flex w-100 gap-3 text-white  justify-center align-center">
              <label htmlFor="sign-form" className="text-[18px] font-normal">
                Email:
              </label>
              <input
                type="email"
                className="border-b-white border-b-2 px-3 focus:outline-none"
              />
            </div>
            <div className="flex w-100 gap-3 text-white  justify-center align-center">
              <label htmlFor="sign-form" className="text-[18px] font-normal">
                Password:
              </label>
              <input
                type="password"
                className="border-b-white border-b-2 px-3 focus:outline-none"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="border w-50 py-2 px-4 rounded-lg cursor-pointer mx-auto text-xl font-semibold text-white hover:bg-white hover:text-blue-600 hover:border-4"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-200 cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
