import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
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
  return (

    <Carousel className="carousel">
      <Carousel.Item className="carousel-item" interval={1000000}>
        <img
          className="carousel-img "
          src={kennel}
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption" >
          <h3>Multi-purpose Kennel</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          <Button className="addtocart-btn" href='/products' variant="light">Add To Cart</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="carousel-img"
          src={fishtank}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Button className="d-inline  addtocart-btn mx-2" href='/products' variant="light">Add To Cart</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
      <img
          className="carousel-img"
          src={birdcage}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Button className="d-inline  addtocart-btn mx-2" href='/products' variant="light">Add To Cart</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="carousel-img"
          src={dogfood}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Button className="d-inline  addtocart-btn mx-2" href='/products' variant="light">Add To Cart</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="carousel-img"
          src={cattree}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          <Button className="d-inline  addtocart-btn mx-2" href='/products' variant="light">Add To Cart</Button>
        </Carousel.Caption>
      </Carousel.Item>
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