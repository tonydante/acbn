import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


const AccountSummary = (props) => {
  const { accountDetails } = props
  const divStyle = {
    width: 'unset'
  };
  return (
    <div className="account-summary-container">
      <div className="account-summary-section">
        <div className="account-summary-header">
          <div className="header-caption">Account Summmary</div>
          <div className="month">month <span>{moment().format('MMM').toUpperCase()}</span></div>
        </div>
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
    </div>
  );
}

export default AccountSummary;
