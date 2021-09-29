import React from "react";
import Auth from "../../utils/auth";
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row list me-auto ">
         <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Products
          </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/signup">Register</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button href="/cart" variant="link">Cart</Button>
          <Dropdown className="d-inline mx-2">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              🔔
          </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/Login">Login</Dropdown.Item>
              <Dropdown.Item href="/signup">Register</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ul>

      );
    }
  }

  return (
    <header className="masthead container nav-text">
      <div className='row justify-content-between'>
        <h1 className='col-4'>
          <Link to="/">
            <span role="img" aria-label="shopping bag"></span>
           The Pet Outlet
        </Link>
        </h1>

        <nav className='col-4'>
          {showNavigation()}
        </nav>
      </div>
    </header>
  );
}

export default Nav;
