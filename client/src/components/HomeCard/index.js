import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import cardImage from '../../assets/images/dogandowner.jpg';

function HomeCard() {
  return (
    <Card className="bg-dark text-white">
    <Card.Img src={cardImage} alt="Card image" />
    <Card.ImgOverlay>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
      <Card.Text>Last updated 3 mins ago</Card.Text>
    </Card.ImgOverlay>
  </Card>
  )
}

export default HomeCard; 