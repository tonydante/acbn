import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getUserAccDetails, logout } from '../../actions/user';
import AccountInfo from '../containers/AccountInfo';

class AccountDetails extends Component {
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
      gender: this.props.userAccDetails.gender,
      nationality: this.props.userAccDetails.nationality,
      address: this.props.userAccDetails.address,
      state: this.props.userAccDetails.state,
      accountNumber: this.props.userAccDetails.accountNumber,
      balance: this.props.userAccDetails.balance
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
      gender: nextProps.userAccDetails.gender,
      nationality: nextProps.userAccDetails.nationality,
      address: nextProps.userAccDetails.address,
      state: nextProps.userAccDetails.state,
      accountNumber: nextProps.userAccDetails.accountNumber,
      balance: nextProps.userAccDetails.balance
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
          <AccountInfo accountDetails={this.state} />
        </main>

      </div>
    )
  }
}
const mapStateToProps = state => ({
  userAccDetails: state.userAccDetails,
  logout: PropTypes.func.isRequired,
});

AccountDetails.propTypes = {
  getUserAccDetails: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};


export default connect(mapStateToProps, { getUserAccDetails, logout })(AccountDetails);