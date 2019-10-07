import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function Header(props) {
    return ( 
        <Fragment>
            <header id="header" className="u-header">
                    <div className="u-header__section">

                        <div className="container u-header__hide-content pt-2">
                            <div className="d-flex align-items-center">
{/* 
                                <div className="position-relative mr-auto">
                                    <a id="languageDropdownInvoker" className="dropdown-nav-link dropdown-toggle d-flex align-items-center" href="#" role="button"
                                        aria-controls="languageDropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        data-unfold-event="hover"
                                        data-unfold-target="#languageDropdown"
                                        data-unfold-type="css-animation"
                                        data-unfold-duration="300"
                                        data-unfold-delay="300"
                                        data-unfold-hide-on-scroll="true"
                                        data-unfold-animation-in="slideInUp"
                                        data-unfold-animation-out="fadeOut">
                                        <img className="dropdown-item-icon" src="../../assets/vendor/flag-icon-css/flags/4x3/us.svg" alt="SVG" />
                                        <span className="d-inline-block d-sm-none">US</span>
                                        <span className="d-none d-sm-inline-block">United States</span>
                                    </a>

                                    <div id="languageDropdown" className="dropdown-menu dropdown-unfold" aria-labelledby="languageDropdownInvoker">
                                        <a className="dropdown-item active" href="#">English</a>
                                        <a className="dropdown-item" href="#">Deutsch</a>
                                        <a className="dropdown-item" href="#">Español‎</a>
                                    </div>
                                </div> */}
                            </div>
                        </div>


                        <div id="logoAndNav" className="container">

                            <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">

                                <div className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center" aria-label="Front">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="46px" height="46px" viewBox="0 0 46 46" style={{ marginBottom: 0 }}>
                                        <path fill="#3F7DE0" opacity=".65" d="M23,41L23,41c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18h11.3C38,5,41,8,41,11.7V23C41,32.9,32.9,41,23,41z" />
                                        <path className="fill-info" opacity=".5" d="M28,35.9L28,35.9c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18l11.3,0C43,0,46,3,46,6.6V18C46,27.9,38,35.9,28,35.9z" />
                                        <path className="fill-primary" opacity=".7" d="M18,46L18,46C8,46,0,38,0,28v0c0-9.9,8-18,18-18h11.3c3.7,0,6.6,3,6.6,6.6V28C35.9,38,27.9,46,18,46z" />
                                    </svg>
                                    <span className="u-header__navbar-brand-text">ACBN</span>
                                </div>



                                <button type="button" className="navbar-toggler btn u-hamburger"
                                    aria-label="Toggle navigation"
                                    aria-expanded="false"
                                    aria-controls="navBar"
                                    data-toggle="collapse"
                                    data-target="#navBar">
                                    <span id="hamburgerTrigger" className="u-hamburger__box">
                                        <span className="u-hamburger__inner"></span>
                                    </span>
                                </button>



                                <div id="navBar" className="collapse navbar-collapse u-header__navbar-collapse">
                                    <ul className="list-inline ml-2 mb-0 ml-auto">

                                        <li className="list-inline-item">

                                            <a id="sidebarNavToggler" className="btn btn-xs btn-text-secondary u-sidebar--account__toggle-bg ml-1" href="#" role="button"
                                                aria-controls="sidebarContent"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                data-unfold-event="click"
                                                data-unfold-hide-on-scroll="false"
                                                data-unfold-target="#sidebarContent"
                                                data-unfold-type="css-animation"
                                                data-unfold-animation-in="fadeInRight"
                                                data-unfold-animation-out="fadeOutRight"
                                                data-unfold-duration="500">
                                                <span className="position-relative">
                                                    <span className="u-sidebar--account__toggle-text">Howdy, {props.username}!</span>
                                                    <img className="u-sidebar--account__toggle-img" src="../../assets/img/100x100/img1.jpg" alt="Image Description" />
                                                </span>
                                            </a>

                                        </li>

                                    </ul>
                                </div>

                            </nav>

                        </div>
                    </div>
                </header>
        </Fragment>
    )
}

export default Header;