import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid'
import { getAllUsers, logout, authTransfer, deleteUser } from '../../actions/user';
import UserList from '../containers/UserList';

class AdminDashboard extends Component {
  /**
  * Creates Instance of UpdateProfilePage
  * @param {Object} props
  * @memberOf UpdateProfilePage
  */
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.allUsers,
      pages: 0,
      currentPage: 1,
      limit: 10,
    };
    this.onChange = this.onChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }
  /**
 * 
 * 
 * @memberof Dashboard
 * @returns {void}
 */
  componentDidMount() {
    const { currentPage, limit } = this.state;
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible('open');
  }

  /**
   * 
   * @desc thsi method handles deleting a user 
   * @memberof AdminDashboard
   */
  handleDelete(event, id) {
    event.preventDefault();
    this.props.deleteUser(id).then(() => {
      this.props.getAllUsers(1, 6)
    });
    console.log(id, 'this is a delete method');

  }

  /**
     * @method onChange
     * @param {Event} event
     * @return {Object} updates State
     */
  onChange(event) {
    const toggleTokenValue = event.target.checked
    const id = event.target.name;
    const transferToken = {
      firstToken: toggleTokenValue,
      secondToken: toggleTokenValue,
      thirdToken: toggleTokenValue,
      isActive: toggleTokenValue
    }
    this.props.authTransfer(id, transferToken).then(() => {
      if (toggleTokenValue === true) {
        return swal({
          title: "Hi there!",
          text: 'Transfer has been activated for this user',
          icon: "success"
        });
      }
      if (toggleTokenValue === false) {
        return swal({
          title: "Hi there!",
          text: 'Transfer has been deactivated for this user',
          icon: "warning"
        });
      }
    })
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
                <a onClick={this.props.logout}>Logout</a>
              </div>
              <ul className="side-nav-list">
                <li className="side-nav-item"><NavLink exact to="/admin/dashboard/clients">Users </NavLink></li>
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
            <span><h4>Welcome, {this.props.admin.username} </h4></span>
          </div>
          {   /*<UserList />*/}
          <div className="account-summary-container">
            <div className="account-summary-section">
              {this.props.data.users.length > 0 ? this.props.data.users.map(user => (
                <div className="account-summary-list" key={shortId.generate()}>
                  <span>User: </span>
                  <Link to={`/admin/edit/client/${user._id}`}><span key={shortId.generate()}>{user.username}</span></Link>
                  <div className="switch">
                    <label>
                      Off
                    <input id={user._id} name={user._id} type="checkbox" onChange={this.onChange} checked={user.isActive} />
                      <span className="lever"></span>
                      On
                  </label>
                  </div>
                  <button className="w3-btn w3-circle" onClick={(event, id) => this.handleDelete(event, user._id)}>x</button>

                </div>
              )) : (<h3> No users found</h3>)}
            </div>
          </div>
        </main>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.clients,
  admin: state.setCurrentUser.user
});

AdminDashboard.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};


export default connect(mapStateToProps, { getAllUsers, logout, authTransfer, deleteUser })(AdminDashboard);