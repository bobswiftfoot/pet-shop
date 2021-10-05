import React from "react";
import Auth from "../../utils/auth";
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { RiShoppingCart2Fill } from 'react-icons/ri';


function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div className='nav-items'>
          <Dropdown className="d-inline mx-1">
            <Button className="d-inline col-2 products-btn mx-2" href='/products' variant="light">All Products</Button>
          </Dropdown>
          <Dropdown className="d-inline mx-1" >
            <Dropdown.Toggle className='dropdown' id="dropdown-autoclose-true">
              User
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/admin">Admin Page</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="col-2 mx-1 d-inline">
            <Dropdown.Toggle className='dropdown' id="dropdown-autoclose-true">
              🔔
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/" onClick={() => Auth.logout()}>Log Out</Dropdown.Item>
              <Dropdown.Item href="/signup">Register</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button href='/cart' className="d-inline mx-1 col-2 cart-btn " variant="light">
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
              <Dropdown.Toggle className='dropdown' id="dropdown-autoclose-true">
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
          <div className='col-12'>
            <h1 className='px-1'>
              <Link to="/">
                <span role="img" aria-label="shopping bag"></span>
                The Pet Outlet
              </Link>

            </h1>
          </div>
          <div className='col-12'>
            <nav className='right-col' >
              {showNavigation()}
            </nav>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Nav;
