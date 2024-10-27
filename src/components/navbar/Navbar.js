import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assets/icons/logo.png" alt="Logo" className="logo-image" />
        </Link>
      </div>
      <ul className="navbar-icons">
        <li><Link to="/profile"><img src="/assets/icons/user.png" alt="Profile Icon" className="icon" /></Link></li>
        <li><Link to="/wishlist"><img src="/assets/icons/wishlist.png" alt="Wishlist Icon" className="icon" /></Link></li>
        <li><Link to="/cart"><img src="/assets/icons/shopping-cart.png" alt="Smart Cart Icon" className="icon" /></Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
