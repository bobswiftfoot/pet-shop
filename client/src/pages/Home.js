import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import About from '../components/About';
import Footer from '../components/Footer';
import HomeCard from "../components/HomeCard";

const Home = () => {
  return (
    <div className="container">
      {/* <CategoryMenu /> */}
      <HomeCard />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
