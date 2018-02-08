import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


class UserList extends Component {
  render() {
    const { accountDetails } = this.props
    const divStyle = {
      width: 'unset'
    };
    return (
      <div className="account-summary-container">
        <div className="account-summary-section">

        </div>
      </div>
    )
  }
}

export default UserList;