import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import shortId from 'shortid';
import {
  getAllUsers, logout, authTransfer, deleteUser 
} from '../../actions/user';
import UserList from '../containers/UserList';
 
/**
 *
 *
 * @class AdminDashboard
 * @extends {Component}
 */
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
    this.handleDelete = this.handleDelete.bind(this);
  }

 
  
  /**
     * @method onChange
     * @param {Event} event
     * @return {Object} updates State
     */
  onChange(event) {
    const toggleTokenValue = event.target.checked;
    const id = event.target.name;
    const transferToken = {
      firstToken: toggleTokenValue,
      isActive: toggleTokenValue
    };
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
    });
  }

  /**
   * 
   * @desc thsi method handles deleting a user 
   * @memberof AdminDashboard
   */
  handleDelete(event, id) {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to view this user again!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteUser(id).then(() => {
            this.props.getAllUsers();
          });
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("User was not deleted!");
        }
      });
  }

  /**
 *
 *
 * @returns { void }
 * @memberof AdminDashboard
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
            <h4>Welcome, {this.props.admin.username} </h4>
          </span>          
        </header>
        <main className="admin-main-wrapper">
          <div className="side-nav-section channels">
            <div className="side-nav-logout-btn">
              <a onClick={this.props.logout}>Logout</a>
            </div>
            <NavLink className="side-nav-item" exact to="/admin/dashboard/clients">
              <span className="icon-holder">
                <i className="fas fa-users" />
              </span>
              <div className="text">
                  Users 
              </div>
            </NavLink>
            <NavLink className="side-nav-item" exact to="/admin/dashboard/create">
              <span className="icon-holder">
                <i className="fab fa-reddit-alien" />
              </span>  
              <div className="text">Create a client</div> 
            </NavLink>
           
          </div>
        
          { /* <UserList /> */}
          <div className="account-summary-container overflow">
            <div className="account-summary-section flexer">
              {this.props.data.users.length > 0 ? this.props.data.users.map(user => (
                <div className="account-summary-list list-space" key={shortId.generate()}>
                  <div className="text">
                    <span> 
                      <i className="fab fa-reddit-alien" />
                    </span>
                    <Link to={`/admin/edit/client/${user._id}`}>
                      <span key={shortId.generate()}>{user.username}</span>
                    </Link>
                  </div>
                  <div className="switch-wrapper">
                    <label className="switch">
                      <input id={user._id} name={user._id} type="checkbox" onChange={this.onChange} checked={user.isActive} />
                      <span className="slider round" />
                    </label>
                  </div>
                  <div>
                    <button className="w3-btn w3-circle" onClick={(event, id) => this.handleDelete(event, user._id)}>x</button>

                  </div>
                </div>
              )) : (<h3> No users found</h3>)}
            </div>
          </div>
        </main>
      </div>
    );
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


export default connect(mapStateToProps, {
  getAllUsers, logout, authTransfer, deleteUser 
})(AdminDashboard);
