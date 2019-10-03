import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { userLoginRequest } from '../actions';
import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';


 class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          userId: '',
          password: '',
          isLoading: true
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
      }
    
      /**
       * 
       * @returns {void} 
       * @param {any} event
       * @memberof SignupForm
       */
      onChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
        
        if (!isEmpty(this.state.userId) && !isEmpty(this.state.password)) {
            this.setState({ isLoading: false });
            console.log('they are not empty')
        }
        console.log('they are empty')
      }
    
    
      /**
       * This method validates the input from the state object 
       * and chcecks if its valid and makes an api call to the backend
       * 
       * @param {any} event 
       * @memberof SigninForm
       * @returns {void}
       */
      onSubmit(event) {
        event.preventDefault();
        //   return console.log(this.props.history)
        const { history } = this.props
        this.props.userLoginRequest(this.state, history);
      }
    
    render() {
        return (
            <Fragment>
                <header id="header" className="u-header">
                    <div className="u-header__section">

                        <div className="container u-header__hide-content pt-2">
                            <div className="float-right">

                                <div className="position-relative">
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
                                </div>
                            </div>
                        </div>
                        <div id="logoAndNav" className="container">

                            <nav className="js-mega-menu navbar navbar-expand-md u-header__navbar u-header__navbar--no-space">

                                <span className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center" href="../home/index.html" aria-label="Front">
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
                                </span>
                            </nav>
                        </div>
                    </div>
                </header>
                <main id="content" role="main">
                    <div className="container space-2">
                        <form className="js-validate w-md-75 w-lg-50 mx-md-auto">
                            <div className="mb-7">
                                <h2 className="h3 text-primary font-weight-normal mb-0">Welcome <span className="font-weight-semi-bold">back</span></h2>
                                <p>Login to manage your account.</p>
                            </div>
                            <div className="js-form-message form-group">
                                <label className="form-label" htmlFor="signinSrEmail">User ID</label>
                                <input type="text" 
                                className="form-control" 
                                name="userId" 
                                value={this.state.userId}
                                onChange={this.onChange}
                                id="signinSrEmail" 
                                placeholder="User ID" 
                                aria-label="User ID"
                                required
                                    data-msg="Please enter a valid User ID."
                                    data-error-class="u-has-error"
                                    data-success-class="u-has-success" />
                            </div>
                            <div className="js-form-message form-group">
                                <label className="form-label" htmlFor="signinSrPassword">
                                    <span className="d-flex justify-content-between align-items-center">
                                        Password
                                       
                                    </span>
                                </label>
                                <input type="password" 
                                className="form-control" 
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                id="signinSrPassword" placeholder="********" aria-label="********" required
                                    data-msg="Your password is invalid. Please try again."
                                    data-error-class="u-has-error"
                                    data-success-class="u-has-success" />
                            </div>
                            <div className="row align-items-center mb-5">
                                <div className="col-6">
                                    <span className="small text-muted">Don't have an account?</span>
                                    <Link className="small" to='/signup'>Signup</Link>
                                </div>
                                <div className="col-6 text-right">
                                    <button type="submit" 
                                    className="btn btn-primary transition-3d-hover" 
                                    disabled={this.state.isLoading} 
                                    onClick={this.onSubmit}>Get Started</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
                <footer className="border-top">
                    <div className="border-bottom">
                        <div className="container space-2">
                            <div className="row justify-content-md-between">

                                <div className="col-sm-4 col-lg-2 mb-4 mb-lg-0" />
                                <div className="col-md-6 col-lg-4">
                                    <h4 className="h6 font-weight-semi-bold mb-4">We are driven to deliver results for all your businesses.</h4>


                                    <button type="button" className="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2 mr-1">
                                        <span className="media align-items-center">
                                            <span className="fab fa-apple fa-2x mr-3"></span>
                                            <span className="media-body">
                                                <span className="d-block">Download on the</span>
                                                <strong className="font-size-1">App Store</strong>
                                            </span>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-xs btn-dark btn-wide transition-3d-hover text-left mb-2">
                                        <span className="media align-items-center">
                                            <span className="fab fa-google-play fa-2x mr-3"></span>
                                            <span className="media-body">
                                                <span className="d-block">Get it on</span>
                                                <strong className="font-size-1">Google Play</strong>
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
            </Fragment>


        )
    }
}

// LoginForm.propTypes = {
//     userLoginRequest: PropTypes.func.isRequired
//   };
//   export default connect(null, {
//     userLoginRequest
//   })(Login);
  export default connect (null, {userLoginRequest})(Login);