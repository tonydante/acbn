import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
/**
 * @class LoginForm
 * @extends React.Component
 */
export default class AdminLoginForm extends Component {
  /**
   * @constructor
   * @description Creates Instance of LoginForm
   * @param {Object} props
   * @memberOf LoginForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @method onChange
   * @param {Event} event
   * @return {Object} updates State
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @method onSubmit
   * @param {Event} event
   * @return {Object} new State
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.adminLoginRequest(this.state);
  }
  /**
   * @return {DOM} DOM Object
   */
  render() {
    return (
      <div>
        <form className="row" onSubmit={this.onSubmit}>
          <div className="col s12">
            <div className="input-field">
              <label htmlFor="userId" className="control-label">Username: </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                className="form-control login"
                required
                onChange={this.onChange}
                autoComplete="off"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password" className="control-label">Password: </label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                className="form-control"
                required
                onChange={this.onChange}
                autoComplete="off"
              />
            </div>
            <div className="form-cta">
              <button type="submit" className="btn shadow-effect">Log in</button>
            </div>

          </div>
        </form>
        <div className="row">
          <div className="col s12">
            <p className="authlinks"><Link to="/forgot-password">Forgot your password? </Link></p>
          </div>
        </div>
        <div className="disclaimer row">
          <div>
            <span>
              <img src="/img/NCUAlogo.png" width="100" height="100" />
            </span>
          </div>
          <div className="disclaimer-right">
            <img src="/img/norton.png" width="100" height="50" />
            <span>
              A username and password is required to log in to our services. Services is provided through a
                secured connection.
                If you have difficulty logging in please click on the forgot your password link
            </span>
          </div>
        </div>
      </div>
    );
  }
}

AdminLoginForm.propTypes = {
  adminLoginRequest: PropTypes.func.isRequired
};