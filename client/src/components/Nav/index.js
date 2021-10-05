import React from "react";
import Auth from "../../utils/auth";
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import pawprints from '../../assets/images/pawprints.jpg';
import lizard from '../../assets/images/lizard.jpg';
import { RiShoppingCart2Fill } from 'react-icons/ri';


function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
         <div className='nav-items'>
            <Dropdown className="d-inline mx-2">
            <Button className="d-inline  products-btn mx-2" href='/products' variant="light">All Products</Button>
            </Dropdown>
              <Dropdown className="d-inline mx-2" >
                <Dropdown.Toggle className = 'dropdown' id="dropdown-autoclose-true">
                  User
            </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/admin">Admin Page</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle className = 'dropdown' id="dropdown-autoclose-true">
                🔔
            </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/" onClick={() => Auth.logout()}>Log Out</Dropdown.Item>
                <Dropdown.Item href="/signup">Register</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button href='/cart' className="d-inline cart-btn mx-2" variant="light">
            <RiShoppingCart2Fill />
            </Button>
          </div>
      );
    } else {
      return (
        <>
          <div className='nav-items'>
            <Dropdown className="d-inline mx-2">
            <Button className="d-inline  products-btn mx-2" href='/products' variant="light">All Products</Button>
            </Dropdown>
              
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle className = 'dropdown' id="dropdown-autoclose-true">
                🔔
            </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/signup">Register</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button href='/cart' className="d-inline cart-btn mx-2" >
            <RiShoppingCart2Fill />
            </Button>
          </div>
        </>

      );
    }
  }

  return (
    <div className='nav-container'>
    <header className="masthead inner-nav-container nav-text">
      <div className='row inner-nav justify-content-between'>
        <h1 className='col-5'>
          <Link to="/">
            <span role="img" aria-label="shopping bag"></span>
           The Pet Outlet
        </Link>
        <Image src={pawprints} className='nav-pawprints'/>
        <Image src={lizard} className='nav-lizard'/>
        </h1>
        <nav className='col-6 right-col'>
          {showNavigation()}
        </nav>
      </div>
    </header>
    </div>
  );
}

export default Nav;
