import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getUserAccDetails, logout, getTransactions } from '../../actions/user';
import AccountSummary from '../containers/AccountSummary';

/**
 *
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
  * Creates Instance of UpdateProfilePage
  * @param {Object} props
  * @memberOf UpdateProfilePage
  */
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
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
      phone: this.props.userAccDetails.phone,
      identificationNumber: this.props.userAccDetails.identificationNumber
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
    this.props.getUserAccDetails();
    this.props.getTransactions();
  }

  /**
 *
 * @param {*} nextProps updated props
 * @returns {DOM} DOM object
 */
  componentWillReceiveProps(nextProps) {
    this.setState({
      transactions: nextProps.transactions,
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
      phone: nextProps.userAccDetails.phone,
      identificationNumber: nextProps.userAccDetails.identificationNumber
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

  /**
 *
 *
 * @returns {void}
 * @memberof Dashboard
 */
render() {
  const transaction = this.state.transactions.map(transaction => {
    const color = (transaction.transactionType === 'credit') ? 'color-change' : '';
    const charges = (transaction.transactionType === 'credit') ? '+' : '-';
    
    return <div className={`bank-credits-items ${color}`} key={transaction._id}>
    <div className="item-header">
    <i className="fas fa-credit-card" />
    <div>{transaction.date}</div>
    </div>
    <div className="item-body"><span>{charges}</span>{transaction.amountToTransfer}</div>
    <div className="item-footer"> {transaction.transferDescription}</div>
    </div>
  })
    const transKey = this.state.transactions
    const { userAccDetails} = this.props;
    const isActive = (userAccDetails && userAccDetails.isActive == true ) ? 'active' : 'in-active';
    return (
      <div className="dashboard-container">
        <header className="nav-section logo">
          <div>
            <Link to="/" className="brand-logo logo">
              <img src="/assets/image/logo.png" alt="ABNB" height="30" />
            </Link>
          </div>
          <span className={`user-welcome-name ${isActive}`}>
            <i className="fab fa-creative-commons-sampling" />
            <h4>
              Welcome,
              {' '}
              {this.state.username}
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
          </div>
          <div className="main-page-wrapper">
            <div className="page-header">
              <div className="account-number">
                acc no: {userAccDetails.accountNumber}
              </div>
              <Link to="/transfer" className="transfer-icon">
                <i className="fas fa-exchange-alt" />
              </Link>
            </div>
            <div className="dashboard-details">
              <div className="bank-credits" >
                {transaction}
              </div>
              <div className="account-details">
                <div className="profile-header">
                  <div className="welcome-text">
                    <i className="fas fa-money-check-alt" />
                   Welcome
                  </div>
                  <div className="profile-image-holder">
                    <img src="/img/profile-img.png" alt=""/>
                    <div className="profile-name">
                      <span className="fullname">{userAccDetails.firstname} {userAccDetails.lastname}</span>
                      <span className="email">{userAccDetails.email}</span>
                      <span className="accountno">+{userAccDetails.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="profile-summary">
                  <div className="profile-summary-list">
                    <i className="far fa-user" /> 
                    {userAccDetails.username}
                  </div>
                  <div className="profile-summary-list"> 
                    <i className="far fa-address-card" /> 
                    {userAccDetails.address}
                  </div>
                  <div className="profile-summary-list"> 
                    <i className="fas fa-genderless" />
                    {userAccDetails.gender}
                  </div>
                  <div className="profile-summary-list"> 
                    <i className="fas fa-location-arrow" /> 
                    {userAccDetails.state}
                  </div>
                  <div className="profile-summary-list"> 
                    <i className="fas fa-globe-asia" /> 
                    {userAccDetails.nationality}
                  </div>
                  <div className="profile-summary-list">
                    <i className="fas fa-credit-card" />
                    {userAccDetails.accountNumber}
                  </div>
                  <div className="profile-summary-list"> 
                    <i className="fas fa-coins" /> 
                    {userAccDetails.balance}
                  </div>
                </div>
              </div>
              <AccountSummary accountDetails={this.state} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userAccDetails: state.userAccDetails,
  transactions: state.transactions.user,
});

Dashboard.propTypes = {
  getUserAccDetails: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getUserAccDetails, logout, getTransactions })(Dashboard);
