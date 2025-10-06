import React, { useContext, useState } from "react";
import "./AuthPage.css";
import logo from "../../../src/assets/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import ApiContext from "../../Axios";
import toast, { Toaster } from "react-hot-toast";
import eye from "../../../src/assets/eye.svg";
import eyeSlash from "../../../src/assets/eyeSlash.svg";
import { SpinnerCustom } from "@/components/ui/spinner.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [show, setShow] = useState(false);
  const [webAuthSign, setWebAuthSign] = useState(false);
  const [signUpData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const authApi = useContext(ApiContext);
  const navigate = useNavigate();

  const signProper = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (!isSignUp) {
        const response = await authApi.post("/auth/sign-in", {
          email: signUpData.email,
          password: signUpData.password,
        });

        setSignupData({ name: "", email: "", password: "" });

        if (!response?.response?.data.success) {
          toast(`${response?.response?.data.message}`);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast(`${response?.response?.data.message}`);
        }
        setLoading(false);
        return;
      }

      const response = await authApi.post("/auth/sign-up", signUpData);

      setSignupData({ name: "", email: "", password: "" });

      if (!response?.response?.data.success) {
        toast("Registration successful!");
        setIsSignUp(false);
      } else {
        toast(`${response?.response?.data.message}`);
      }
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      toast(error?.response?.data?.message || "An error occurred");
      console.error(
        "Error during registration:",
        error.response?.data.message || error.message || error
      );
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      "#sign-form",
      { y: "-100%" },
      { y: "0%", opacity: 1, duration: 1, ease: "power4.out" }
    );
  }, [!isSignUp]);

  const webAuthnSign = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!isSignUp) {
        const response = await authApi.post(
          "/webauthn/authentication/options",
          {
            username: signUpData.name,
          }
        );

        if (!response?.data?.success) {
          setLoading(false);
          return toast("User not registered, please sign up.");
        }

        setSignupData({ name: "", email: "", password: "" });

        const credIn = await startAuthentication(response?.data?.opts);

        const verification = await authApi.post(
          "/webauthn/authentication/verify",
          JSON.stringify(credIn),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (verification?.response?.data.success) {
          toast(`${verification?.response?.data.message}`);
          localStorage.setItem("token", verification?.response?.data.token);
          navigate("/");
        } else {
          toast(`${verification?.response?.data.message}`);
        }
        setLoading(false);

        return;
      }

      const responseOpts = await authApi.post(
        "/webauthn/registration/options",
        {
          username: signUpData.name,
          displayName: signUpData.name,
        }
      );

      const opts = responseOpts?.data?.opts;
      const credential = await startRegistration(opts);
      const credReqBody = {
        cred: JSON.stringify(credential),
        userId: signUpData.name,
      };
      const upResponse = await authApi.post(
        "/webauthn/registration/verify",
        credReqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      setSignupData({ name: "", email: "", password: "" });

      if (upResponse?.data.success) {
        toast(upResponse?.data.message);
        setIsSignUp(false);
      } else {
        toast(upResponse?.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast(
        error?.response?.data?.message !== "input.replace is not a function"
          ? error?.response?.data?.message
          : "User already registered, please sign in."
      );
      console.error(
        "Error during registration:",
        error?.response?.data.message || error
      );
    }
  };

  return (
    <div className="grid items-center content-center justify-end grid-cols-1 authpg justify-items-center sm:flex">
      <Toaster />

      <form
        action=""
        id="sign-form"
        className="border-7 border-white w-75 sm:w-100 fixed sm:right-1/10 rounded-3xl top-1/7 flex flex-col items-center justify-center py-9 gap-9 backdrop-blur-[8px] background-color:rgba(105, 105, 105, 0.25);"
      >
        <div className="flex items-center justify-center gap-2 w-75 h-fit place-self-center">
          <img
            src={logo}
            alt="Domino's logo"
            width="50px"
            height="30px"
            className="h-9 w-9 sm:h-10 sm:w-10"
          />
          <Link to="/" className="flex items-center">
            <h1 className="mb-0 text-2xl font-semibold text-white">
              Domino's Pizza
            </h1>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-5 text-white w-75">
          {isSignUp && (
            <div
              className={`justify-center gap-3 text-white ${
                webAuthSign ? "none" : "flex"
              }`}
            >
              <label htmlFor="name" className="text-sm font-normal">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-48 px-2 text-base border-b-2 sm:w-full border-b-white focus:outline-none"
                placeholder="Name"
                value={signUpData.name}
                required={true}
                onChange={(e) =>
                  setSignupData({ ...signUpData, name: e.target.value })
                }
              />
            </div>
          )}
          {webAuthSign && (
            <div className="flex justify-center gap-3 text-white">
              <label htmlFor="name" className="text-sm font-normal">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-48 px-2 text-base border-b-2 sm:w-full border-b-white focus:outline-none"
                placeholder="Name"
                value={signUpData.name}
                required={true}
                onChange={(e) =>
                  setSignupData({ ...signUpData, name: e.target.value })
                }
              />
            </div>
          )}
          {!webAuthSign && (
            <>
              <div className="flex justify-center gap-3 text-white">
                <label htmlFor="email" className="text-sm font-normal">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-48 px-2 text-base border-b-2 sm:w-full border-b-white focus:outline-none"
                  placeholder="Email address"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignupData({ ...signUpData, email: e.target.value })
                  }
                />
              </div>
              <div className="relative flex justify-center gap-3 text-white">
                <label htmlFor="password" className="text-sm font-normal">
                  Password:
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-40 px-2 text-base border-b-2 sm:w-full border-b-white focus:outline-none"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignupData({ ...signUpData, password: e.target.value })
                  }
                />
                <p
                  className="absolute z-4 right-1 hover:cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {!show && <img src={eye} alt="Show password" />}
                  {show && <img src={eyeSlash} alt="Hide password" />}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="flex items-center justify-center gap-1 py-1 mx-auto text-base text-white border-2 rounded-lg cursor-pointer w-50 sm:text-base hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              !webAuthSign ? signProper(e) : setWebAuthSign(false);
            }}
          >
            {loading && <SpinnerCustom />}
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <p
            className="text-white w-50 hover:cursor-pointer hover:font-bold hover:text-blue-500"
            onClick={(e) =>
              webAuthSign ? webAuthnSign(e) : setWebAuthSign(true)
            }
          >
            {!webAuthSign ? "Sign " : "Continue"}
            {!webAuthSign ? (!isSignUp ? "In" : "Up") : ""} with passkey key
          </p>
        </div>

        <p className="text-white">
          {isSignUp ? "Already" : "Don't"} have an account?{" "}
          <span
            onClick={() => (
              setIsSignUp(!isSignUp),
              setSignupData({ name: "", email: "", password: "" })
            )}
            className="font-extrabold text-blue-500 cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
