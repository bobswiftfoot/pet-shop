import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import HomeCard from "../components/HomeCard";

const Home = () => {
  return (
    <div className="container">
      {/* <CategoryMenu /> */}
      <HomeCard />
      {/* <ProductList /> */}
      <Cart />
    </div>
  );
};

export default Home;
