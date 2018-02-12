
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminLoginForm from '../containers/AdminLoginForm';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { adminLoginRequest } from '../../actions/user';

/**
 * @method Login
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the login page
 */
const AdminLogin = props => (
  <div className="login">
    <NavigationBar />
    <div className="container auth-form">
      <span className="login-header">
        <h3>Admin Login</h3>
      </span>
      <AdminLoginForm adminLoginRequest={props.adminLoginRequest} />
    </div>
    <Footer />
  </div>
);

AdminLogin.propTypes = {
  adminLoginRequest: PropTypes.func.isRequired
};


export default connect(null, {
  adminLoginRequest
})(AdminLogin);
