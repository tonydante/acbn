
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../containers/LoginForm';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { userLoginRequest } from '../../actions/user';

/**
 * @method Login
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the login page
 */
const Login = props => (
  <div className="login">
    <NavigationBar />
    <div className="container auth-form">
      <span className="login-header">
        <h3>Sign In</h3>
        <i className="material-icons">person</i>
      </span>
      <LoginForm userLoginRequest={props.userLoginRequest} />
    </div>
    <Footer />
  </div>
);

Login.propTypes = {
  userLoginRequest: PropTypes.func.isRequired
};


export default connect(null, {
  userLoginRequest
})(Login);