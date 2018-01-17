import React from 'react'
import { Link } from 'react-router-dom';

/**
 * 
 * 
 */
const NavigationBar = () => (
  <div className="navbar-fixed navbar-main">
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo logo">
          <img src="/img/logo.png" alt="test" height="40" />
        </Link>
        <span>
          <a href="#" data-activates="mobile-demo"
            className="button-collapse">
          </a>
        </span>
      </div>
    </nav>
  </div>
);

export default NavigationBar;