import React from "react";
import ProductList from '../components/ProductList';
import ProductItem from '../components/ProductItem'

const Products = () => {
  return (
    <div className="container">
      <ProductList />
      <ProductItem />
    </div>
  );
};

export default Products;