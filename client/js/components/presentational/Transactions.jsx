import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { logout, getTransactions } from '../../actions/user';

class Transactions extends Component {
  /**
    * @constructor
    * @description Creates Instance of LoginForm
    * @param {Object} props
    * @memberOf LoginForm
    */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  /**
* 
* 
* @memberof Dashboard
* @returns {void}
*/
  componentDidMount() {
    this.props.getTransactions()
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible('open');
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
    let transction = [];
    if (this.props.transactions && this.props.transactions.length > 1) {
      transction = this.props.transactions.map(transaction => {
        return <tr key={transaction._id}>
          <td>Alvin</td>
          <td>{transaction.transferDescription}</td>
          <td>{transaction.transactionType}</td>
          <td>$ {transaction.amountToTransfer}</td>
          <td></td>
        </tr>

      })
    }
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
                <a onClick={this.props.logout}>Logout</a>
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
            <span><h4>Hello, {this.props.userdetail.username}</h4></span>
          </div>
          <div>
            <div><h4>Hi {this.props.userdetail.username} below are your transactions</h4></div>
            <div className="transaction-table">
              <table className="striped">
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
