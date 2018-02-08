import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { NavLink, Link } from 'react-router-dom';


class AccountSummary extends Component {
  render() {
    const { accountDetails } = this.props
    const divStyle = {
      width: 'unset'
    };
    return (
      <div className="account-summary-container">
        <div className="account-summary-section">
          <div className="account-summary-list">
            <span>Current Balance: </span>
            <span>{accountDetails.balance}</span>
          </div>
          <div className="account-summary-list">
            <span>Pending Balance</span>
            <span>{accountDetails.pendingBal}</span>
          </div>
          <div className="account-summary-list">
            <span>Statement Balance </span>
            <span>{accountDetails.balance}</span>
          </div>
          <div className="account-summary-list">
            <span>Available Credit</span>
            <span> {accountDetails.availableCredit}</span>
          </div>
          <div className="account-summary-list">
            <span>Current Credit Limited Amount</span>
            <span>{accountDetails.currentCreditLimitedAmount}</span>
          </div>
          <div className="account-summary-list">
            <span>Last Payment </span>
            <span>{accountDetails.lastPaymentDate}</span>
          </div>
          <div className="account-summary-list">
            <span>Total Minimum Due</span>
            <span> {accountDetails.totalMinAmtDue}</span>
          </div>
          <div className="account-summary-list">
            <span>Payment Due Date</span>
            <span> {accountDetails.paymentDueDate}</span>
          </div>
          <div className="account-summary-list">
            <span>Reward Balance </span>
            <span>{accountDetails.rewardBal}</span>
          </div>
        </div>
        <div className="row form-cta" >
          <Link to="/transfer">
            <button type="submit" className="btn shadow-effect" href="#" style={divStyle}>Make Transfer</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default AccountSummary;