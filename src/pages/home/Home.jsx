import BestSelling from "@/components/BestSelling";
import Categories from "@/components/Categories";
import Contact from "@/components/Contact.jsx";
import Favorites from "@/components/Favorites";
import GreatDeals from "@/components/GreatDeals";
import Hero from "@/components/Hero.jsx";
import NavBar from "@/components/NavBar.jsx";
import React from "react";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <div>
        <BestSelling />
        <Favorites />
        <GreatDeals />
      </div>
      <Categories />
      <Contact />
    </div>
  );
};

export default Home;
