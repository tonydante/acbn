import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { logout } from '../../actions/user';

/**
 *
 *
 * @class ProgressBar
 * @extends {Component}
 */
class ProgressBar extends Component {
  /**
   * 
   * 
   * @memberof Dashboard
   * @returns {void}
   */
  componentDidMount() {
    $(document).ready(() => {
      $('.skill_three').animate({ width: '100%' }, 10000, () => {
        swal("Write something here:", {
          text: 'Please enter Tax Code',
          content: "input",
        })
          .then((value) => {
            if (value) {
              swal('An error occured. Please contact your account manager if this persists').then(() => {
                history.push('/dashboard');
              });
            } else {
              swal('Please enter a valid Tax code').then(() => {
                history.push('/transfer');
              })
            }
          });
      });
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
 * @memberof ProgressBar
 */
  render() {
    return (
      <div className="dashboard-container">
        <header className="nav-section logo">
          <div>
            <Link to="/" className="brand-logo logo">
              <img src="/assets/image/logo.png" alt="ABNB" height="30" />
            </Link>
          </div>
          <span>
            <i className="fab fa-creative-commons-sampling" />
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
          <div className="account-summary-container">
            <div className="account-summary-section">
              <p className="progress-text">Transfer in progress</p>
              <div className="progress-bar-container">
                <span>0%</span>
                <div className="skill_bar">
                  <div className="skill_bar_progress skill_three" />
                </div>
                <span>100%</span>
              </div>
            </div>
          </div>
        </main>

      </div>
    );
  }
}


ProgressBar.propTypes = {
  logout: PropTypes.func.isRequired
};


export default connect(null, { logout })(ProgressBar);
