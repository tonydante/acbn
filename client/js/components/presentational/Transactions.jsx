import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { logout, getTransactions } from '../../actions/user';

/**
 *
 *
 * @class Transactions
 * @extends {Component}
 */
class Transactions extends Component {
  /**
    * @constructor
    * @description Creates Instance of LoginForm
    * @param {Object} props
    * @memberOf LoginForm
    */
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    }
    this.logout = this.logout.bind(this);
  }

  /**
* 
* 
* @memberof Dashboard
* @returns {void}
*/
  componentDidMount() {
    this.props.getTransactions();
  }

  /**
     * @method
     * @memberOf Class CommentPage
     * @param {*} nextProps updated props
     * @return {*} sets state to currrent prop
     */
  componentWillReceiveProps(nextProps) {
    this.setState({
      transactions: nextProps.transactions
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
 * @returns { void }
 * @memberof Transactions
 */
  render() {
    const transction = this.state.transactions.map(transaction => {
      return <tr key={transaction._id}>
        <td>{transaction.date}</td>
        <td>{transaction.transferDescription}</td>
        <td>{transaction.transactionType}</td>
        <td>$ {transaction.amountToTransfer}</td>
        <td></td>
      </tr> 
    });
    return (
      <div className="dashboard-container">
        <header className="nav-section logo">
          <div>
            <Link to="/" className="brand-logo logo">
              <img src="/assets/image/logo.png" alt="ABNB" height="30" />
            </Link>
          </div>
          <span className="user-welcome-name">
          <h4>
              Welcome
              {' '}
              {this.props.userdetail.username}
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
          <div className="main-page-wrapper">
            <div className="main-page-header"><h4>Hi {this.props.userdetail.username} below are your transactions</h4></div>
            <div className="transaction-table">
              <table className="table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Transaction Type</th>
                    <th>Amount Transfered</th>
                  </tr>
                </thead>
                <tbody >
                  {transction}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  userdetail: state.setCurrentUser.user,
  transactions: state.transactions.user,

})
Transactions.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout, getTransactions })(Transactions);
