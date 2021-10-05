import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from '../utils/actions';
import { QUERY_PRODUCT, QUERY_ME } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import { Modal, Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth'
import { calculateRating } from '../utils/helpers'
import { getImage } from '../utils/images'

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const [reviewTextError, setReviewText] = useState("");

  const { loading, data } = useQuery(QUERY_PRODUCT, {
    variables: { productId: id },
  });
  const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
  const [addReview] = useMutation(ADD_REVIEW);

  const [show, setShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => {
    setAddShow(true);
    setReviewText("");
  }

  useEffect(() => {
    if (!loading && data) 
    {
      setCurrentProduct(data.product);
    }
  }, [data, loading, id]);

  const addToCart = async () => {
    const cart = await idbPromise('cart', 'get');
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

  const handleAddReview = async () => {
    const reviewText = document.getElementById("addReviewText").value;
    const ratingBoxes = document.getElementById("addRating").children;
    let rating = 0;
    for(let i = 0; i < ratingBoxes.length; i++)
    {
      if(ratingBoxes[i].children[0].checked)
      {
        rating = parseFloat(ratingBoxes[i].children[0].value);
      }
    }

    if(!reviewText)
    {
      setReviewText("Must submit a review.");
      return;
    }
    await addReview({ variables: {addReviewReviewText: reviewText, addReviewRating: rating, addReviewUser: meData.me._id, addReviewProduct: id } });
    window.location.reload();
  }


  return (
    <>
      {!loading && currentProduct.name ? (
        <div className="detail-product container my-1">
          <Link to="/products">← Back to All Products</Link>
          <h2>{currentProduct.name}</h2>
          <h3>Rating: {calculateRating(currentProduct.reviews)}</h3>
          <p>{currentProduct.description}</p>
          <p>
            <strong>Price: ${currentProduct.price}{' '}</strong><br />
            <button className='addtocart-btn' onClick={() => { addToCart(); handleShow(); }} >Add to Cart</button>

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
          </p>
          <img
            className="detail-page-img"
            src={getImage(currentProduct.image)}
            alt={currentProduct.name}
          />
            <ListGroup>
              {currentProduct.reviews.map((review, index) => (
                <ListGroup.Item key={`review ${index}`} className="border-3 mb-1">
                  <p>By: {review.user.userName}</p>
                  <p>{review.reviewText}</p>
                  <p>Rating: {review.rating}/5</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
            {!meLoading && Auth.loggedIn() ? (
            <>
            <Button type="submit" onClick={handleAddShow} className="me-1">Add Review</Button>

            <Modal show={addShow} onHide={handleAddClose}>
              <Modal.Header closeButton>
                <Modal.Title>{meData.me.userName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <Form className="review-form">
                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2} >Review:</Form.Label>
                    <Col sm="10">
                      <Form.Control as="textarea" placeholder="Review" name="reviewText" id="addReviewText" rows={3} />
                      {reviewTextError ? (
                        <p>{reviewTextError}</p>
                      )
                      : null}
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row}>
                    <Form.Label column sm={2} >Rating:</Form.Label>
                    <Col sm="10" key={"inline-rating"} id="addRating">
                      <Form.Check type="radio" name="rating" id="inline-rating-1" label="1" value={1} defaultChecked={true}/>
                      <Form.Check type="radio" name="rating" id="inline-rating-2" label="2" value={2} />
                      <Form.Check type="radio" name="rating" id="inline-rating-3" label="3" value={3} />
                      <Form.Check type="radio" name="rating" id="inline-rating-4" label="4" value={4} />
                      <Form.Check type="radio" name="rating" id="inline-rating-5" label="5" value={5} />
                    </Col>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleAddReview}>
                  Submit
                </Button>
                <Button variant="secondary" onClick={handleAddClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal> </>) : null}
        </div>
      ) : <img src={spinner} alt="loading" />}
    </>
  );
}

export default Detail;
