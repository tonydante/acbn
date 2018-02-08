
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminSignupForm from '../containers/AdminSignupForm';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { adminSignupRequest } from '../../actions/user';

/**
 * @method Login
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the login page
 */
const AdminSignup = props => (
  <div className="login">
    <NavigationBar />
    <div className="container auth-form ">
      <span className="login-header">
        <h3>Create Amin</h3>
        <i className="material-icons">person</i>
      </span>
      <AdminSignupForm adminSignupRequest={props.adminSignupRequest} />
    </div>
    <Footer />
  </div>
);

AdminSignup.propTypes = {
  adminSignupRequest: PropTypes.func.isRequired
};


export default connect(null, {
  adminSignupRequest
})(AdminSignup);