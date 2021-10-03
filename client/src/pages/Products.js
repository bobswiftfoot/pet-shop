import React from "react";
import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';
import ProductItem from '../components/ProductItem';

const Products = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Products;