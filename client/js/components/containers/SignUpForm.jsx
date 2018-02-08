import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Router } from 'react-router-dom';
import history from '../../utils/history';


/**
 * @class SignupForm
 */
export default class SignupForm extends Component {
  /**
   * @constructor
   * @param {State} props
   */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      userId: '',
      username: '',
      password: '',
      gender: 'male',
      address: '',
      identificationNumber: '',
      dob: '',
      phone: '',
      city: '',
      state: '',
      provice: '',
      maritalStatus: '',
      nationality: '',
      accountNumber: '',
      accountType: '',
      zipcode: '',
      loggedIn: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    $(document).ready(function () {
      $('select').material_select();
    });
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
    this.props.userSignupRequest(this.state);
  }
  /**
   * @return {Object} Returns DOM element
   */
  render() {
    return (
      <div>
        <div className="row">
          <h4 className="heading">Admin can create a user here</h4>
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  id="firstname"
                  required
                  value={this.state.firstname}
                  onChange={this.onChange}
                />
                <label htmlFor="firstname" className="control-label">Firstname</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="lastname"
                  id="lastname"
                  type="text"
                  required
                  value={this.state.lastname}
                  onChange={this.onChange}
                />
                <label htmlFor="lastname" className="control-label">Lastname</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m12">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="userId" className="control-label">Email :</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  type="text"
                  name="userId"
                  id="userId"
                  required
                  value={this.state.userId}
                  onChange={this.onChange}
                />
                <label htmlFor="userId" className="control-label">User ID</label>
              </div>

              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="username"
                  id="username"
                  type="text"
                  required
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <label htmlFor="username" className="control-label">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  pattern=".{5,10}"
                  required
                  title="Password must be between 5 and 10 characters"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="control-label">Password:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="identificationNumber"
                  id="identificationNumber"
                  type="text"
                  required
                  value={this.state.identificationNumber}
                  onChange={this.onChange}
                />
                <label htmlFor="identificationNumber" className="control-label">Identification NO:</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="dob"
                  id="dob"
                  type="text"
                  required
                  value={this.state.dob}
                  onChange={this.onChange}
                />
                <label htmlFor="dob" className="control-label">Date of birth:</label>
              </div>
              <div className="input-field col s12 m6">
                <select className="form-control" id="gender" name="sex" required='true' value={this.state.gender} onChange={this.onChange}>
                  <option value="male" defaultValue>Male</option>
                  <option value="female">Female</option>
                </select>
                <label>Gender :</label>
              </div>

            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="address"
                  id="address"
                  type="text"
                  required
                  value={this.state.address}
                  onChange={this.onChange}
                />
                <label htmlFor="address" className="control-label">Address:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="phone"
                  id="phone"
                  type="text"
                  required
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                <label htmlFor="phone" className="control-label">Phone NO:</label>
              </div>

            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="city"
                  id="city"
                  type="text"
                  required
                  value={this.state.city}
                  onChange={this.onChange}
                />
                <label htmlFor="city" className="control-label">City:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="state"
                  id="state"
                  type="text"
                  required
                  value={this.state.state}
                  onChange={this.onChange}
                />
                <label htmlFor="state" className="control-label">State:</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="provice"
                  id="provice"
                  type="text"
                  required
                  value={this.state.provice}
                  onChange={this.onChange}
                />
                <label htmlFor="provice" className="control-label">Provice:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="maritalStatus"
                  id="maritalStatus"
                  type="text"
                  required
                  value={this.state.maritalStatus}
                  onChange={this.onChange}
                />
                <label htmlFor="maritalStatus" className="control-label">Marital Status:</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="nationality"
                  id="nationality"
                  type="text"
                  required
                  value={this.state.nationality}
                  onChange={this.onChange}
                />
                <label htmlFor="nationality" className="control-label">Nationality:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="accountNumber"
                  id="accountNumber"
                  type="text"
                  required
                  value={this.state.accountNumber}
                  onChange={this.onChange}
                />
                <label htmlFor="accountNumber" className="control-label">Account Number :</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="accountType"
                  id="accountType"
                  type="text"
                  required
                  value={this.state.accountType}
                  onChange={this.onChange}
                />
                <label htmlFor="accountType" className="control-label">Account Type:</label>
              </div>
              <div className="input-field col s12 m6">
                <input
                  className="form-control"
                  name="zipcode"
                  id="zipcode"
                  type="text"
                  required
                  value={this.state.zipcode}
                  onChange={this.onChange}
                />
                <label htmlFor="zipcode" className="control-label">Zip Code:</label>
              </div>
            </div>
            <div className="row form-cta">
              <button type="submit" className="btn shadow-effect" href="#">Submit</button>
            </div>
          </form>
          <div className="disclaimer row">
            <div>
              <span>
                <img src="/img/NCUAlogo.png" width="100" height="100" />
              </span>
            </div>
            <div className="disclaimer-right">
              <img src="/img/norton.png" width="100" height="50" />
              <span>
                Services is provided through a
                secured connection.
                If you have difficulty creating a user please contact your site administrator.
            </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};