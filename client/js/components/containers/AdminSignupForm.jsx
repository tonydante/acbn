import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Router } from 'react-router-dom';
import history from '../../utils/history';


/**
 * @class SignupForm
 */
export default class AdminSignupForm extends Component {
  /**
   * @constructor
   * @param {State} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  /**
   *
   * @param {Event} event
   * @return {state} sets state of button
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {Event} event
   * @return {state} updates state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.adminSignupRequest(this.state);
  }

  /**
   * @return {Object} Returns DOM element
   */
  render() {
    return (
      <div>
          <form className="row" onSubmit={this.onSubmit}>
          <div className="col s12">
              <div className="input-field">
                <input
                  className="form-control"
                  name="username"
                  placeholder="username"
                  id="username"
                  type="text"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </div>
          
           
              <div className="input-field">
                <input
                  className="form-control"
                  name="password"
                  placeholder="password"
                  id="password"
                  type="password"
                  pattern=".{5,10}"
                  required
                  title="Password must be between 5 and 10 characters"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
            <div className="form-cta">
              <button type="submit" className="btn shadow-effect" href="#">Submit</button>
            </div>
          </div>
          </form>
          <div className="disclaimer">
            <div>
                <img src="/img/NCUAlogo.png" width="100" height="100" />
            </div>
            <div className="disclaimer-right">
              <img src="/img/norton.png" width="100" height="50" />
              <span>
                Services is provided through a
                secured connection.
                If you have difficulty create an admin please contact the site administrator.
              </span>
            </div>
          </div>
      </div>
    );
  }
}

AdminSignupForm.propTypes = {
  adminSignupRequest: PropTypes.func.isRequired
};
