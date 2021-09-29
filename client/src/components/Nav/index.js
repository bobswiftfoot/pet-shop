import React from "react";
import Auth from "../../utils/auth";
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import pawprints from '../../assets/images/pawprints.jpg';
import lizard from '../../assets/images/lizard.jpg';
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
        <>
          <div className='nav-items'>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle className = 'dropdown' id="dropdown-autoclose-true">
                Products
            </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
              <Dropdown className="d-inline mx-2" >
                <Dropdown.Toggle className = 'dropdown' id="dropdown-autoclose-true">
                  Clickable Outside
            </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                  <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                </Dropdown.Menu>
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
            <Button className="d-inline cart mx-2" variant="light">🛒</Button>
          </div>
        </>

      );
    }
  }

  return (
    <div className='nav-container'>
    <header className="masthead container nav-text">
      <div className='row inner-nav justify-content-between'>
        <h1 className='col-4'>
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
