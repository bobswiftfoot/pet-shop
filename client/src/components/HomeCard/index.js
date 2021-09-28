import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup';
import homeImage from '../../assets/images/dogandowner.jpg';

function HomeCard() {
  return (
    <Card className="bg-light transparent text-white">
      <Card.Img src={homeImage} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="main-card-head">Welcome to The Pet Outlet!</Card.Title>
        <Card.Text className="feat-card-text">Featured</Card.Text>
        <Card className="bg-dark feat-card text-white">
          <Card.Img src="holder.js/100px270" alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This content is a little bit longer.
            </Card.Text>
            <Card.Text>Last updated 3 mins ago</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Card.ImgOverlay>
    </Card>
  )
}

export default HomeCard;