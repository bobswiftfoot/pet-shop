import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import kennel from '../../assets/images/kennel.jpg';
import dogandcat from '../../assets/images/dogandcat.jpg';
import fishtank from '../../assets/images/fishtank.jpg';
import birdcage from '../../assets/images/birdcage.jpg';

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
          <Button className="d-inline  addtocart-btn mx-2" href='/products' variant="light">Products</Button>
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
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HomeCard;