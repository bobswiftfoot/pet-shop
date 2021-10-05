import React, { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_ALL_PRODUCTS  } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import ProductItem from '../ProductItem';
import Carousel from 'react-bootstrap/Carousel';

function HomeCard() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  const { products, cart } = state;

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

  return (
    <Carousel className="carousel">
        {filterProducts().map((product) => (
      <Carousel.Item className="carousel-item" key={product._id} interval={4000000}> 
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
        <Carousel.Caption className="carousel-caption" >
          {/* <h3>{ProductItem}</h3> */}
  
        </Carousel.Caption>
      </Carousel.Item>
        ))}

      
    
    </Carousel>
    
  )
}

export default HomeCard;