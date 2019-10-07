import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Header from './Header';
import Footer from './Footer';
import Aside from './Aside'
import {
  logout, userSignupRequest
} from '../actions';




class Signup extends Component {
  /**
  * @constructor
  * @param {State} props
  */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      gender: 'male',
      address: '',
      userId: '',
      identificationNumber: '',
      dob: '',
      phone: '',
      city: '',
      state: '',
      province: '',
      maritalStatus: '',
      nationality: '',
      accountNumber: '',
      accountType: '',
      zipcode: '',
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
    if (!isEmpty(this.state.firstname) && !isEmpty(this.state.lastname) &&
      !isEmpty(this.state.username) && !isEmpty(this.state.password) &&
      !isEmpty(this.state.email) && !isEmpty(this.state.address) && !isEmpty(this.state.userId) &&
      !isEmpty(this.state.identificationNumber) && !isEmpty(this.state.dob) && !isEmpty(this.state.phone) && !isEmpty(this.state.city)
      && !isEmpty(this.state.state) && !isEmpty(this.state.province) && !isEmpty(this.state.maritalStatus) && !isEmpty(this.state.nationality) &&
      !isEmpty(this.state.accountNumber) && !isEmpty(this.state.accountType) && !isEmpty(this.state.zipcode)) {
      this.setState({ isLoading: false });
    }
  }

  /**
   *
   * @param {Event} event
   * @return {state} updates state
   */
  onSubmit(event) {
    event.preventDefault();
    const { history } = this.props
    this.props.userSignupRequest(this.state, history);
  }
  render() {
    return (
      <Fragment>

        <header id="header" className="u-header">

          


          <div className="u-header__section">

            <div className="container u-header__hide-content pt-2">
              <div className="d-flex align-items-center">

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
                    <path className="fill-white" d="M17.4,34V18.3h10.2v2.9h-6.4v3.4h4.8v2.9h-4.8V34H17.4z" />
                  </svg>
                  <span className="u-header__navbar-brand-text">ACBN</span>
                </a>



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
                      <Link id="sidebarNavToggler" className="btn btn-xs btn-text-secondary u-sidebar--account__toggle-bg ml-1" to="#" role="button"
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
                          <span className="u-sidebar--account__toggle-text">Howdy, {this.props.admin.username}!</span>
                          <img className="u-sidebar--account__toggle-img" src="../../assets/img/100x100/img1.jpg" alt="Image Description" />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        <main id="content" role="main">
          <div className="container space-2">
            <form className="js-validate">
              <div className="row">

                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="nameLabel" className="form-label">
                      Firstname
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="text" className="form-control"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.onChange}
                        placeholder="Enter client's Firstname"
                        aria-label="Enter client's Firstname"
                        required
                        aria-describedby="nameLabel"
                        data-msg="Please enter client's Firstname."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                      <small className="form-text text-muted">Displayed on client's public profile, notifications and other places.</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="lastNameLabel" className="form-label">
                      Lastname
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="text" className="form-control"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.onChange}
                        placeholder="Enter client's Lastname"
                        aria-label="Enter client's Lastname"
                        required
                        aria-describedby="lastNameLabel"
                        data-msg="Please enter client's Lastname."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>
                </div>


                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="usernameLabel" className="form-label">
                      Username
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="text" className="form-control" name="username" placeholder="Enter your username" aria-label="Enter your username" required aria-describedby="usernameLabel"
                        value={this.state.username}
                        onChange={this.onChange}
                        data-msg="Please enter client's username."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="usernameLabel" className="form-label">
                      Password
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="password" className="form-control" name="password" placeholder="********" aria-label="********" required aria-describedby="passwordLabel"
                        value={this.state.password}
                        onChange={this.onChange}
                        data-msg="Please enter client's password."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="usernameLabel" className="form-label">
                      Birth date
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="text" className="form-control"
                        name="dob"
                        onChange={this.onChange}
                        placeholder="e.g. dd/mm/yyyy"
                        aria-label="e.g. dd/mm/yyyy" required aria-describedby="passwordLabel"
                        value={this.state.dob}
                        onChange={this.onChange}
                        data-msg="Please enter client's date of birth."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6  mb-6">
                  <div className="js-form-message">
                    <label id="usernameLabel" className="form-label">
                      Gender
                  <span className="text-danger">*</span>
                    </label>
                    <div className="form-group">
                      <select className="form-control custom-select" required
                        value={this.state.gender}
                        onChange={this.onChange}
                        data-msg="Please select client's gender."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success">
                        <option value="male" defaultValue>Male</option>
                        <option value="male">Female</option>
                        <option value="other">other</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              <div className="row">

                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="emailLabel" className="form-label">
                      Email address
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="email" className="form-control"
                        name="email"
                        placeholder="Enter an email address"
                        aria-label="Enter an email address" required aria-describedby="emailLabel"
                        value={this.state.email}
                        onChange={this.onChange}
                        data-msg="Please enter a valid email address."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                      <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                  </div>
                </div>



                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="userIdLabel" className="form-label">
                      User ID
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input type="text" className="form-control" name="userId"
                        value={this.state.userId}
                        onChange={this.onChange}
                        placeholder="Enter User ID" aria-label="Enter userId"
                        required aria-describedby="userIdLabel"
                        data-msg="Please enter User Id."
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>
                </div>

              </div>





              <hr className="mt-1 mb-7" />


              <div className="mb-3">
                <h2 className="h5 mb-0">Address</h2>
                <p>Enter client's address information below.</p>
              </div>

              <div className="row">

                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="phoneNumberLabel" className="form-label">
                      Phone number
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="tel" name="phone"
                        placeholder="Enter client's phone number" aria-label="Enter client's phone number" required aria-describedby="phoneNumberLabel"
                        value={this.state.phone}
                        onChange={this.onChange}
                        data-msg="Please enter a valid phone number"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>



                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="addressLabel" className="form-label">
                      Address
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="address"
                        placeholder="Enter client's address" aria-label="Enter client's address" required aria-describedby="addressLabel"
                        value={this.state.address}
                        onChange={this.onChange}
                        data-msg="Please enter an address"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>

              </div>
              <div className="row">

                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="cityLabel" className="form-label">
                      City
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="city"
                        placeholder="Enter client's city" aria-label="Enter client's city" required aria-describedby="cityLabel"
                        value={this.state.city}
                        onChange={this.onChange}
                        data-msg="Please enter city"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>



                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="stateLabel" className="form-label">
                      State
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="state"
                        placeholder="Enter client's state" aria-label="Enter client's state" required aria-describedby="stateLabel"
                        value={this.state.state}
                        onChange={this.onChange}
                        data-msg="Please enter a state"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>

              </div>
              <div className="row">

                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="provinceLabel" className="form-label">
                      Provice
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="province"
                        placeholder="Enter client's provice" aria-label="Enter client's provice" required aria-describedby="provinceLabel"
                        value={this.state.province}
                        onChange={this.onChange}
                        data-msg="Please enter province"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>



                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="nationalityLabel" className="form-label">
                      Nationality
                  <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="nationality"
                        placeholder="Enter client's nationality" aria-label="Enter client's nationality" required aria-describedby="nationalityLabel"
                        value={this.state.nationality}
                        onChange={this.onChange}
                        data-msg="Please enter nationality"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>

              </div>
              <div className="row">

                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="zipCodeLabel" className="form-label">
                      zipcode
                    <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="zipcode"
                        placeholder="Enter client's zipcode" aria-label="Enter client's zipcode" required aria-describedby="zipCodeLabel"
                        value={this.state.zipcode}
                        onChange={this.onChange}
                        data-msg="Please enter zipcode"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>



                <div className="col-sm-6 mb-6">
                  <div className="js-form-message">
                    <label id="maritalStatus" className="form-label">
                      Marital Status
                    <span className="text-danger">*</span>
                    </label>

                    <div className="form-group">
                      <input className="form-control" type="text" name="maritalStatus"
                        placeholder="Enter client's marital status" aria-label="Enter client's marital status" required aria-describedby="maritalStatus"
                        value={this.state.maritalStatus}
                        onChange={this.onChange}
                        data-msg="Please enter client's marital status"
                        data-error-class="u-has-error"
                        data-success-class="u-has-success" />
                    </div>
                  </div>

                </div>

              </div>
              <hr className="my-7" />


              <div className="mb-3">
                <h2 className="h5 mb-0">Account information</h2>
                <p>Enter Client's account information below.</p>
              </div>




              <div className="row">
                <div className="col-sm-6 mb-6">
                  <label id="identificationNumberLabel" className="form-label">Identification Number</label>


                  <div className="input-group">
                    <input type="text"
                      name="identificationNumber"
                      className="form-control"
                      value={this.state.identificationNumber}
                      onChange={this.onChange}
                      placeholder="Enter client's identification number"
                      aria-label="Enter client's identification number" aria-describedby="identificationNumberLabel" />
                  </div>

                </div>

                <div className="col-sm-4 col-md-3 mb-6">
                  <label id="accountNumberLabel" className="form-label">Account Number</label>


                  <div className="input-group">
                    <input type="text"
                      name="accountNumber"
                      value={this.state.accountNumber}
                      onChange={this.onChange}
                      className="form-control" placeholder="Enter Account Number" aria-label="Enter Account Number" aria-describedby="accountNumberLabel" />
                  </div>

                </div>
                <div className="col-sm-4 col-md-3 mb-6">
                  <label id="accountTypeLabel" className="form-label">Account Type</label>


                  <div className="input-group">
                    <input type="text"
                      name="accountType"
                      value={this.state.accountType}
                      onChange={this.onChange}
                      className="form-control"
                      placeholder="Enter Account type" aria-label="Enter Account type" aria-describedby="accountTypeLabel" />
                  </div>

                </div>
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-primary transition-3d-hover mr-1"
                disabled={this.state.isLoading}
                onClick={this.onSubmit}>
                Create Client
              </button>

            </form>
          </div>

        </main>
        <Footer />
       <Aside admin={this.props.admin} logout={this.props.logout} history={this.props.history}/>
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
}
const mapStateToProps = state => ({
  admin: state.setCurrentUser.user
});
export default connect(mapStateToProps, {
  userSignupRequest, logout
})(Signup);