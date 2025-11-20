import React, { useEffect, useState } from "react";
import demoImg from "../../src/assets/Authbgimg.jpg";
import {
  LucideArrowBigLeft,
  LucideArrowBigRight,
  LucideHeart,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const allBests = [
  { img: demoImg, name: "Pizza 1", price: 10, rating: 3 },
  { img: demoImg, name: "Pizza 2", price: 7.5, rating: 2 },
  { img: demoImg, name: "Pizza 3", price: 5.15, rating: 4 },
  { img: demoImg, name: "Pizza 4", price: 3.25, rating: 1 },
  { img: demoImg, name: "Pizza 5", price: 4.02, rating: 2 },
  { img: demoImg, name: "Pizza 1", price: 10, rating: 2 },
  { img: demoImg, name: "Pizza 2", price: 7.5, rating: 4 },
  { img: demoImg, name: "Pizza 3", price: 5.15, rating: 5 },
  { img: demoImg, name: "Pizza 4", price: 3.25, rating: 3 },
  // { img: demoImg, name: "Pizza 5", price: 4.02, rating: 1 },
];

const BestSelling = () => {
  const [liked, setLiked] = useState(false);
  const [start, setStart] = useState(0);
  const [bests, setBests] = useState(allBests.slice(start, 3));
  useGSAP(() => {
    gsap.fromTo(
      ".inner-coat",
      {
        x: "-200px",
        opacity: 0,
        duration: 1,
        ease: "sine",
      },
      { x: 0, opacity: 1, duration: 1, ease: "sine" }
    );
  }, [start]);

  useEffect(() => {
    setBests(allBests.slice(start, start + 3));
  }, [start]);
  return (
    <div className="pt-10">
      <h3 className="mb-6 text-3xl font-black">Best Selling</h3>

      <div className="relative flex items-center justify-between min-w-full overflow-hidden min-h-32 outer-coat">
        <div
          className="absolute z-10 p-3 bg-white rounded-full cursor-pointer active:scale-90 active:transition-transform min-w-fit aspect-square left-40 top-2/5"
          onClick={() => {
            if (start > 0) {
              setStart((prev) => prev - 1);
            }
          }}
        >
          <LucideArrowBigLeft className="scale-125" />
        </div>
        <div
          className={`flex flex-row gap-10 px-30 py-5 overflow-x-visible pb-7 -right-40 min-h-32 inner-coat`}
        >
          {bests.map((best, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-3 bg-[#eee] rounded-2xl max-w-1/3 text-start relative"
                style={{
                  boxShadow:
                    "-10px -10px 15px 5px #999, 10px 10px 15px 5px #eee",
                }}
              >
                <div className="absolute flex gap-3 top-4 right-6">
                  <LucideHeart
                    color="white"
                    className={`cursor-pointer hover:fill-yellow-400 ${
                      liked ? "fill-rose-600" : ""
                    }`}
                    onClick={() => setLiked(!liked)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={`${window.innerWidth < 450 ? "20" : "23"}`}
                    height={`${window.innerHeight < 450 ? "20" : "23"}`}
                    fill="white"
                    className="font-bold cursor-pointer bi bi-cart3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </div>
                <img
                  src={best.img}
                  className="rounded-t-xl w-fit h-fit"
                  alt={`best product image ${i}`}
                />
                <div className="flex flex-col gap-5 px-4 pt-0 pb-7">
                  <h5 className="text-xl font-bold">{best.name}</h5>
                  <p>price: ${best.price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="absolute z-10 p-3 bg-white rounded-full cursor-pointer active:scale-90 active:transition-transform min-w-fit aspect-square right-40 top-2/5 "
          onClick={() => {
            if (start < allBests.length - 3) {
              setStart((prev) => prev + 1);
            } else return;
          }}
        >
          <LucideArrowBigRight className="scale-125" />
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
