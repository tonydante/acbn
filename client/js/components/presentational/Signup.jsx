
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupForm from '../containers/SignUpForm';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { userSignupRequest } from '../../actions/user';

/**
 * @method Login
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the login page
 */
const Signup = props => (
  <div className="login">
    <NavigationBar />
    <div className="container signup-form ">
      <span className="login-header">
        <h3>Create User</h3>
        <i className="material-icons">person</i>
      </span>
      <SignupForm userSignupRequest={props.userSignupRequest} />
    </div>
    <Footer />
  </div>
);

Signup.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userSignupRequest
})(Signup);