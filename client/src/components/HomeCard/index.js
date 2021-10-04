import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import Auth from "../../utils/auth";
import { Link, useParams } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_FEATURED_PRODUCTS, QUERY_ALL_PRODUCTS  } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import ProductItem from '../ProductItem';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import kennel from '../../assets/images/kennel.jpg';
import dogandcat from '../../assets/images/dogandcat.jpg';
import fishtank from '../../assets/images/fishtank.jpg';
import birdcage from '../../assets/images/birdcage.jpg';
import dogfood from '../../assets/images/dogfood.jpg';
import cattree from '../../assets/images/cattree.jpg';

function HomeCard() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  const { products, cart } = state;

  const { loading1, data1 } = useQuery(QUERY_FEATURED_PRODUCTS);

  useEffect(() => {
    if (data) {
      console.log(data)
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

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data1) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data1.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading1) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data1, loading1, dispatch, id]);

  function filterProducts() {
    // if (currentCategory) {
    //   console.log('hello');
    //   return state.products;
    // }

    return state.products.filter(
      (product) => product.featuredProduct);

  }

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  console.log(state.products);

  return (

    <Carousel className="carousel">
        {filterProducts().map((product) => (
      <Carousel.Item className="carousel-item" interval={4000}> 
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
        <Carousel.Caption className="carousel-caption" >
          <h3>{ProductItem}</h3>
  
        </Carousel.Caption>
      </Carousel.Item>
        ))}

      
    
    </Carousel>
    
  )
}

export default HomeCard;