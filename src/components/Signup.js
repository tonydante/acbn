import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';




function Signup() {
  return (
    <Fragment>

      <header id="header" className="u-header">
        <div className="u-header__section">

          <div className="container u-header__hide-content pt-2">
            <div className="float-right">

              <div className="position-relative">
                <a id="languageDropdownInvoker" className="dropdown-nav-link dropdown-toggle d-flex align-items-center" href="javascript:;" role="button"
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
              </div>
            </div>
          </div>
          <div id="logoAndNav" className="container">

            <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">

              <a className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center" href="../home/index.html" aria-label="Front">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="46px" height="46px" viewBox="0 0 46 46" style={{ marginBottom: 0 }}>
                  <path fill="#3F7DE0" opacity=".65" d="M23,41L23,41c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18h11.3C38,5,41,8,41,11.7V23C41,32.9,32.9,41,23,41z" />
                  <path className="fill-info" opacity=".5" d="M28,35.9L28,35.9c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18l11.3,0C43,0,46,3,46,6.6V18C46,27.9,38,35.9,28,35.9z" />
                  <path className="fill-primary" opacity=".7" d="M18,46L18,46C8,46,0,38,0,28v0c0-9.9,8-18,18-18h11.3c3.7,0,6.6,3,6.6,6.6V28C35.9,38,27.9,46,18,46z" />
                </svg>
               
                <span className="u-header__navbar-brand-text">
                <Link to="/">
                  <img src="../../assets/img/logo.png" alt="test" height="40" />
                </Link>
                </span>
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main id="content" role="main">
        <div className="container space-2">
          <form className="js-validate w-md-75 w-lg-50 mx-md-auto">
            <div className="mb-7">
              <h1 className="h3 text-primary font-weight-normal mb-0">Welcome to <span className="font-weight-semi-bold">ACBN</span></h1>
              <p>Fill out the form to get started.</p>
            </div>
            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrEmail">Email address</label>
              <input type="email" className="form-control" name="email" id="signinSrEmail" placeholder="Email address" aria-label="Email address" required
                data-msg="Please enter a valid email address."
                data-error-classname="u-has-error"
                data-success-classname="u-has-success" />
            </div>
            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrPassword">Password</label>
              <input type="password" className="form-control" name="password" id="signinSrPassword" placeholder="********" aria-label="********" required
                data-msg="Your password is invalid. Please try again."
                data-error-classname="u-has-error"
                data-success-classname="u-has-success" />
            </div>
            <div className="js-form-message form-group">
              <label className="form-label" htmlFor="signinSrConfirmPassword">Confirm password</label>
              <input type="password" className="form-control" name="confirmPassword" id="signinSrConfirmPassword" placeholder="********" aria-label="********" required
                data-msg="Password does not match the confirm password."
                data-error-classname="u-has-error"
                data-success-classname="u-has-success" />
            </div>
            <div className="js-form-message mb-5">
              <div className="custom-control custom-checkbox d-flex align-items-center text-muted">
                <input type="checkbox" className="custom-control-input" id="termsCheckbox" name="termsCheckbox" required
                  data-msg="Please accept our Terms and Conditions."
                  data-error-classname="u-has-error"
                  data-success-classname="u-has-success" />
                <label className="custom-control-label" htmlFor="termsCheckbox">
                  <small>
                    I agree to the
                <a className="link-muted" href="terms.html">Terms and Conditions</a>
                  </small>
                </label>
              </div>
            </div>
            <div className="row align-items-center mb-5">
              <div className="col-5 col-sm-6">
                <span className="small text-muted">Already have an account?</span>
                <Link className="small" to="/signin">Login</Link>
              </div>

              <div className="col-7 col-sm-6 text-right">
                <button type="submit" className="btn btn-primary transition-3d-hover">Get Started</button>
              </div>
            </div>

          </form>
        </div>

      </main>

       
  <footer class="border-top">
    
    <div class="border-bottom">
      <div class="container space-2">
        <div class="row justify-content-md-between">

          <div class="col-sm-4 col-lg-2 mb-4 mb-lg-0"/>
          <div class="col-md-6 col-lg-4">
            <h4 class="h6 font-weight-semi-bold mb-4">We are driven to deliver results for all your businesses.</h4>

            
            <button type="button" class="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2 mr-1">
              <span class="media align-items-center">
                <span class="fab fa-apple fa-2x mr-3"></span>
                <span class="media-body">
                  <span class="d-block">Download on the</span>
                  <strong class="font-size-1">App Store</strong>
                </span>
              </span>
            </button>
            

            
            <button type="button" class="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2">
              <span class="media align-items-center">
                <span class="fab fa-google-play fa-2x mr-3"></span>
                <span class="media-body">
                  <span class="d-block">Get it on</span>
                  <strong class="font-size-1">Google Play</strong>
                </span>
              </span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
    

        <div className="container text-center space-1">

          <a className="d-inline-flex align-items-center mb-2" href="../home/index.html" aria-label="Front">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36px" height="36px" viewBox="0 0 46 46" style={{ marginBottom: 0 }}>
              <path fill="#3F7DE0" opacity=".65" d="M23,41L23,41c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18h11.3C38,5,41,8,41,11.7V23C41,32.9,32.9,41,23,41z" />
              <path className="fill-info" opacity=".5" d="M28,35.9L28,35.9c-9.9,0-18-8-18-18v0c0-9.9,8-18,18-18l11.3,0C43,0,46,3,46,6.6V18C46,27.9,38,35.9,28,35.9z" />
              <path className="fill-primary" opacity=".7" d="M18,46L18,46C8,46,0,38,0,28v0c0-9.9,8-18,18-18h11.3c3.7,0,6.6,3,6.6,6.6V28C35.9,38,27.9,46,18,46z" />
            </svg>
          </a>

          <p className="small text-muted">&copy; Acbn. 2019. All rights reserved.</p>
        </div>

      </footer>
      <a className="js-go-to u-go-to" href="#"
        data-position='{"bottom": 15, "right": 15 }'
        data-type="fixed"
        data-offset-top="400"
        data-compensation="#header"
        data-show-effect="slideInUp"
        data-hide-effect="slideOutDown">
        <span className="fas fa-arrow-up u-go-to__inner"></span>
      </a>

    </Fragment>
  );
}

export default Signup;
