import React from "react";
import About from '../components/About';
import Footer from '../components/Footer';
import HomeCard from "../components/HomeCard";

const Home = () => {
  return (
    <div className="container">
      <HomeCard />
      <About />
    </div>
  );
};

export default Home;
