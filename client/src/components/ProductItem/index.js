import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import {
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  UPDATE_PRODUCTS
} from "../../utils/actions";

import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { idbPromise } from "../../utils/helpers";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import dogfood from '../../assets/images/dogfood.jpg';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;


  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  const { products, cart } = state;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { cart } = state
  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    console.log('hello');
    console.log(cart);
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    console.log(itemInCart);
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
    //     <div className="card px-1 py-1">
    //       <Link to={`/products/${_id}`}>
    //         <img
    //           alt={name}
    //           src={`/images/${image}`}
    //         />
    //         <p>{name}</p>
    //       </Link>
    //       <div>
    //         <div>{quantity} {pluralize("item", quantity)} in stock</div>
    //         <span>${price}</span>
    //       </div>
    //       <button onClick={addToCart}>Add to cart</button>
    // </div>

    <Row xs={1} md={1} className="prod-g-4">
      {/* {Array.from({ length: 1 }).map((_, idx) => ( */}
      <Col className='product-page-col'>
        <br />
        <Card className='product-page-cards mt-5'>


          <Card.Body>
            <Link to={`/products/${_id}`} className='product-link'>
              <Card.Img className='product-page-img' variant="top" src={dogfood} />
            </Link>
            <Link to={`/products/${_id}`} className='product-link'>
              <Card.Title className='product-card-h2'>{name}</Card.Title>
            </Link >
            <Link to={`/products/${_id}`} className='product-link'>
              <Card.Text>${price}</Card.Text>
            </Link>
          </Card.Body>
          <br />
          <button className='addtocart-btn mx-3 mb-3' onClick={addToCart && handleShow } >Add to Cart</button>
          <br />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your item has been added!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
                    </Button>
            </Modal.Footer>
          </Modal>

        </Card>
        <br />
      </Col>
    </Row>
  );
}

export default ProductItem;
