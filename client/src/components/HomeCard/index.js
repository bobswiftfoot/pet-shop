import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_ALL_PRODUCTS  } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import ProductItem from '../ProductItem';
import Carousel from 'react-bootstrap/Carousel';

function HomeCard() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  const { products } = state;

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    return products.filter(
      (product) => product.featuredProduct);
  }

  return (
    <Carousel className="carousel">
      {filterProducts().map((product) => (
        <Carousel.Item className="carousel-item" key={product._id} interval={4000000}>
          {console.log(product)}
          <ProductItem
            key={product._id}
            _id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
          <Carousel.Caption className="carousel-caption" >
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default HomeCard;