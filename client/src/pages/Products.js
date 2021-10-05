import React from "react";
import ProductList from '../components/ProductList';
import CategoryMenu from '../components/CategoryMenu';
import { Container } from 'react-bootstrap';

const Products = () => {
  return (
    <Container fluid>
      <CategoryMenu />
      <ProductList />
    </Container>
  );
};

export default Products;