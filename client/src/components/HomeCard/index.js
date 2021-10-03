import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_FEATURED_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
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

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_FEATURED_PRODUCTS);
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

  function filterProducts() {
    // if (currentCategory) {
    //   console.log('hello');
    //   return state.products;
    // }

    return state.products.filter(
      (product) => product.featuredProduct);

  }

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
          <Button className="addtocart-btn" href='/products' variant="light">Add To Cart</Button>
        </Carousel.Caption>
      </Carousel.Item>
        ))}

      
      <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }).map((_, idx) => (
    <Col className='home-product-col'>
      <Card className='home-product-cards'>
        <Card.Img variant="top" src={dogandcat} />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a 
            
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
    </Carousel>
    
  )
}

export default HomeCard;