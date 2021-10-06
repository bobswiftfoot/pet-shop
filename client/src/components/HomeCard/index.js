import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import ProductItem from '../ProductItem';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import fish from '../../assets/images/fish.jpg';
import cat from '../../assets/images/cat.jpg';
import chameleon from '../../assets/images/chameleon.jpg';
import parrot from '../../assets/images/parrot.jpg';

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
    <div className='container'>
      <div className='row align-items-start'>
        <div class="col-md-3 left-column">
          <Image className='fish' src={fish} roundedCircle />
          <Image className='chameleon' src={chameleon} thumbnail />
        </div>
        <div class="col-md-6 middle-column">
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
        </div>
        <div class="col-md-3 right-column">
          <Image className='cat' src={cat} thumbnail />
          <Image className='parrot' src={parrot} roundedCircle />
        </div>
      </div>
    </div>
  )
}

export default HomeCard;