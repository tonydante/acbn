import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getUserAccDetails, logout } from '../../actions/user';
import AccountSummary from '../containers/AccountSummary';

class Dashboard extends Component {
  /**
  * Creates Instance of UpdateProfilePage
  * @param {Object} props
  * @memberOf UpdateProfilePage
  */
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.userAccDetails.firstname,
      lastname: this.props.userAccDetails.lastname,
      username: this.props.userAccDetails.username,
      email: this.props.userAccDetails.email,
      accountNumber: this.props.userAccDetails.accountNumber,
      balance: this.props.userAccDetails.balance,
      availableCredit: this.props.userAccDetails.availableCredit,
      currentCreditLimitedAmount: this.props.userAccDetails.currentCreditLimitedAmount,
      lastPaymentDate: this.props.userAccDetails.lastPaymentDate,
      lastPaymentAmt: this.props.userAccDetails.lastPaymentAmt,
      totalMinAmtDue: this.props.userAccDetails.totalMinAmtDue,
      paymentDueDate: this.props.userAccDetails.paymentDueDate,
      rewardBal: this.props.userAccDetails.rewardBal,
      pendingBal: this.props.userAccDetails.pendingBal,
    };
    this.logout = this.logout.bind(this);
  }
  /**
 * 
 * 
 * @memberof Dashboard
 * @returns {void}
 */
  componentDidMount() {
    this.props.getUserAccDetails()
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible('open');
  }
  /**
 *
 * @param {*} nextProps updated props
 * @returns {DOM} DOM object
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      firstname: nextProps.userAccDetails.firstname,
      lastname: nextProps.userAccDetails.lastname,
      username: nextProps.userAccDetails.username,
      email: nextProps.userAccDetails.email,
      accountNumber: nextProps.userAccDetails.accountNumber,
      balance: nextProps.userAccDetails.balance,
      availableCredit: nextProps.userAccDetails.availableCredit,
      currentCreditLimitedAmount: nextProps.userAccDetails.currentCreditLimitedAmount,
      lastPaymentDate: nextProps.userAccDetails.lastPaymentDate,
      lastPaymentAmt: nextProps.userAccDetails.lastPaymentAmt,
      totalMinAmtDue: nextProps.userAccDetails.totalMinAmtDue,
      paymentDueDate: nextProps.userAccDetails.paymentDueDate,
      rewardBal: nextProps.userAccDetails.rewardBal,
      pendingBal: nextProps.userAccDetails.pendingBal,
    });
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

  render() {
    return (
      <div className="dashboard-container">
        <header>
          <div id="slide-out" className="side-nav fixed">
            <div className="side-nav-section logo">
              <Link to="/" className="brand-logo logo">
                <img src="/img/logo.png" alt="test" height="30" />
              </Link>
            </div>
            <div className="side-nav-section channels">
              <div className="side-nav-logout-btn">
                <a onClick={this.logout}>Logout</a>
              </div>
              <ul className="side-nav-list">
                <li className="side-nav-item"><NavLink exact to="/dashboard">Account Summary </NavLink></li>
                <li className="side-nav-item"><NavLink exact to="/transactions">Recent Transactions</NavLink></li>
                <li className="side-nav-item"><NavLink exact to="/transfer">Make Transfer</NavLink></li>
                <li className="side-nav-item"><NavLink exact to="/accountdetails">Account Details</NavLink></li>
              </ul>
            </div>
          </div>
        </header>
        <main>
          <div className="welcome-caption">
            <div className="mobile-hambuger">
              <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only ">
                <i className="material-icons">menu</i>
              </a>
            </div>
            <span className="float-header-with-flex"></span>
            <span><h4>Welcome, {this.state.username}</h4></span>
          </div>
          <AccountSummary accountDetails={this.state} />
        </main>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  userAccDetails: state.userAccDetails,
  logout: PropTypes.func.isRequired,
});

Dashboard.propTypes = {
  getUserAccDetails: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};


export default connect(mapStateToProps, { getUserAccDetails, logout })(Dashboard);