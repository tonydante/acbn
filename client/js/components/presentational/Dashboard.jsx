import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getUserAccDetails } from '../../actions/user';
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
      lastLogin: this.props.userAccDetails.lastLogin
    };
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
      lastLogin: nextProps.userAccDetails.lastLogin
    });
  }

  render() {
    return (
      <div>
        <header>
          <div id="slide-out" className="side-nav fixed">
            <div className="side-nav-section logo">
              <Link to="/" className="brand-logo logo">
                <img src="/img/logo.png" alt="test" height="30" />
              </Link>
            </div>
            <div className="side-nav-section channels">
              <div className="side-nav-header">
                <span className="">Dashboard</span>
              </div>
              <ul className="side-nav-list">
                <li className="side-nav-item"><a href="#!">Account Summary </a></li>
                <li className="side-nav-item"><a href="#!">Recent Transactions</a></li>
                <li className="side-nav-item"><a href="#!">Make Transfer</a></li>
                <li className="side-nav-item"><a href="#!">Account Details</a></li>
              </ul>
            </div>
          </div>
          <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only ">
            <i className="material-icons">menu</i>
          </a>

        </header>
        <main>
          <div><h4>Welcome, {this.state.username}</h4></div>
          <AccountSummary accountDetails={this.state} />
        </main>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  userAccDetails: state.userAccDetails
});

Dashboard.propTypes = {
  getUserAccDetails: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, { getUserAccDetails })(Dashboard);