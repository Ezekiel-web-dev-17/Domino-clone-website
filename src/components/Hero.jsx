import React from "react";
import bg from "../../src/assets/AuthHomeImg.jpg";
import bg2 from "../../src/assets/pizza-header-table.avif";

const Hero = () => {
  return (
    <header className="max-w-full min-h-screen">
      <h1 className="absolute z-20 p-4 text-4xl font-bold text-white -translate-x-1/2 text-nowrap sm:text-5xl -translate-y-3/4 top-1/2 left-1/2">
        <span className="text-amber-400">Hot,</span>{" "}
        <span className="text-green-500">fresh </span>pizzas 🍕 <br /> delivered{" "}
        <span className="relative inline-block mt-3 before:absolute before:-inset-1 before:block before:-skew-y-6 before:bg-pink-500">
          <div className="relative flex items-end gap-1 italic text-white dark:text-gray-950 w-30 sm:w-44">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={`${window.innerWidth < 640 ? "36" : "48"}`}
              height="48"
              fill="currentColor"
              className="bi bi-lightning-charge"
              viewBox="0 0 16 16"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z" />
            </svg>{" "}
            fast
          </div>
        </span>
      </h1>
      <p className="absolute z-20 p-4 text-xl font-semibold text-blue-300 -translate-x-1/2 text-nowrap sm:text-lg -translate-y-3/4 top-5/8 left-1/2">
        Delivered in 30 minutes or less...
      </p>

      <button
        type="button"
        className="absolute z-20 px-4 py-1 text-xl font-normal text-white -translate-x-1/2 bg-blue-500 border-2 rounded-md hover:cursor-pointer hover:bg-red-500 text-nowrap sm:text-lg -translate-y-3/4 top-6/8 left-1/2"
      >
        Place order now
      </button>
      <div className="relative z-0 min-h-screen min-w-screen before:absolute before:-inset-1 before:block before:bg-black-500 before:bg-popover-foreground before:opacity-40">
        <img
          src={window.innerWidth < 640 ? bg2 : bg}
          className="w-full h-screen overflow-hidden"
        />
      </div>
    </header>
  );
};

export default Hero;
