import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { logout, transfer } from '../../actions/user';

/**
 *
 *
 * @class Transfer
 * @extends {Component}
 */
class Transfer extends Component {
  /**
    * @constructor
    * @description Creates Instance of LoginForm
    * @param {Object} props
    * @memberOf LoginForm
    */
  constructor(props) {
    super(props);
    this.state = {
      receiverBank: '',
      receiverName: '',
      receiverAccountNumber: '',
      email: '',
      swiftCode: '',
      ibanNumber: '',
      accountNumber: '',
      amountToTransfer: '',
      transferDescription: ''
    }
    this.baseState = this.state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.logout = this.logout.bind(this);
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
    this.props.transfer(this.state)
  }
  
  /**
   * @method resetForm
   * 
   * @memberof EditClient
   * 
   * @return {void}
   */
  resetForm() {
    this.setState({
      ...this.state
    })
  }

  /**
   * 
   * @param {any} event
   * @memberof NavigationBar
   * @returns {void}
   * @desc this function removes token from localstorage and logs out the user
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
 *
 *
 * @returns {void}
 * @memberof Transfer
 */
  render() {
    return (
      <div className="dashboard-container">
        <header className="nav-section logo">
          <div>
            <Link to="/" className="brand-logo logo">
              <img src="/assets/image/logo.png" alt="ABNB" height="30" />
            </Link>
          </div>
          <span className="user-welcome-name">
            <i class="fab fa-creative-commons-sampling" />
            <h4>
              Welcome
            </h4>
          </span>
        </header>
        <main>
          <div className="side-nav-section channels">
            <div className="side-nav-logout-btn">
              <a onClick={this.logout}>
                <i className="fas fa-power-off" />
                Logout
          </a>
            </div>
            <NavLink exact to="/dashboard" className="side-nav-item">
              <span className="icon-holder">
                <i className="fas fa-wallet" />
              </span>
              <div className="text">
                Dashboard
            {' '}
              </div>
            </NavLink>
            <NavLink className="side-nav-item" exact to="/transactions">
              <span className="icon-holder">
                <i className="fas fa-history" />
              </span>
              <div className="text">
                Transaction History
          </div>
              <i className="active-sign" />
            </NavLink>
            <NavLink className="side-nav-item" exact to="/transfer">
              <span className="icon-holder">
                <i className="fas fa-exchange-alt" />
              </span>
              <div className="text">
                Make Transfer
          </div>
            </NavLink>
            {/* NavLink className="side-nav-item" exact to="/accountdetails">
          <span className="icon-holder">
            <i className="fas fa-credit-card" />
          </span>
          <div className="text">
              Account Details
          </div>
       </NavLink> */}
          </div>

          <div className="account-summary-container">
            <div className="account-summary-section overflow">
              <div><h4>Hi {this.props.userdetail.username} please fill the form below to make your transfer</h4></div>
              <div className="container auth-form form-width">
                <form className="row" onSubmit={this.onSubmit}>
                  <div className="col s12">
                    <div className="input-field">
                      <label htmlFor="receiverBank" className="control-label">Receiver's Bank Name: </label>
                      <input
                        type="text"
                        name="receiverBank"
                        value={this.state.receiverBank}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="receiverName" className="control-label">Receiver's Name: </label>
                      <input
                        type="text"
                        name="receiverName"
                        value={this.state.receiverName}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="receiverAccountNumber" className="control-label">Receiver's Account Number: </label>
                      <input
                        type="text"
                        name="receiverAccountNumber"
                        value={this.state.receiverAccountNumber}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="email" className="control-label">Email: </label>
                      <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="swiftCode" className="control-label">SWIFT Code: </label>
                      <input
                        type="text"
                        name="swiftCode"
                        value={this.state.swiftCode}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="ibanNumber" className="control-label">Routing Number: </label>
                      <input
                        type="text"
                        name="ibanNumber"
                        value={this.state.ibanNumber}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="amountToTransfer" className="control-label">Amount to Transfer: </label>
                      <input
                        type="text"
                        name="amountToTransfer"
                        value={this.state.amountToTransfer}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="transferDescription" className="control-label">Transfer Description: </label>
                      <input
                        type="text"
                        name="transferDescription"
                        value={this.state.transferDescription}
                        className="form-control"
                        required
                        onChange={this.onChange}
                        autoComplete="on"
                      />
                    </div>
                    <div className="update-form-cta">
                      <button type="reset" onClick={this.resetForm} className="btn shadow-effect">Reset</button>
                      <button type="submit" className="btn shadow-effect update-btn">Complete Trasnsfer</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userdetail: state.setCurrentUser.user,
  logout: PropTypes.func.isRequired,

})
Transfer.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout, transfer })(Transfer);
