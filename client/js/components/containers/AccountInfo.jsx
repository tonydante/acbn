import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


class AccountInfo extends Component {
  render() {
    const { accountDetails } = this.props
    const divStyle = {
      width: 'unset'
    };
    return (
      <div className="account-summary-container">
        <div className="account-summary-section">
          <div className="account-summary-list">
            <span>Firstname: </span>
            <span>{accountDetails.firstname}</span>
          </div>
          <div className="account-summary-list">
            <span>Lastname: </span>
            <span>{accountDetails.lastname}</span>
          </div>
          <div className="account-summary-list">
            <span>Username: </span>
            <span>{accountDetails.username}</span>
          </div>
          <div className="account-summary-list">
            <span>Email: </span>
            <span> {accountDetails.email}</span>
          </div>
          <div className="account-summary-list">
            <span>Gender: </span>
            <span>{accountDetails.gender}</span>
          </div>
          <div className="account-summary-list">
            <span>Nationality: </span>
            <span>{accountDetails.nationality}</span>
          </div>
          <div className="account-summary-list">
            <span>Address: </span>
            <span> {accountDetails.address}</span>
          </div>
          <div className="account-summary-list">
            <span>State: </span>
            <span> {accountDetails.state}</span>
          </div>
          <div className="account-summary-list">
            <span>Account Number:  </span>
            <span>{accountDetails.accountNumber}</span>
          </div>
          <div className="account-summary-list">
            <span>Balance </span>
            <span> {accountDetails.balance}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountInfo;