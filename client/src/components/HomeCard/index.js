import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import homeImage from '../../assets/images/dogandowner.jpg';
import kennel from '../../assets/images/kennel.jpg'

function HomeCard() {
  return (
    <Card className="bg-light transparent text-white">
      <Card.Img src={homeImage} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="main-card-head">Welcome to The Pet Outlet!</Card.Title>
        <Card.Text className="feat-card-text">Featured</Card.Text>
        <Carousel className= "carousel">
          <Carousel.Item interval={100000000}>
            <img
              className="carousel-img "
              src={kennel}
              alt="First slide"
            />
            <Carousel.Caption className="carousel-item" >
              <h3>Dog/Cat Kennel</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={4000}>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
      </Card.ImgOverlay>
    </Card>
  )
}

export default HomeCard;