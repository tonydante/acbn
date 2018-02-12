import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import history from './history';
import { getAllUsers, logout } from '../actions/user';
import AdminDashboard from '../components/presentational/AdminDashboard';
import EditClient from '../components/presentational/EditClient'
import Signup from '../components/presentational/Signup';


class Authenticate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: 0,
      currentPage: 1,
      limit: 10
    };
    this.logout = this.logout.bind(this);

  }

  /**
   * @method componentWillMount
   * @return {*} set user authentication status
   */
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      return history.push('/admin/signin');
    }
    const { currentPage, limit } = this.state;
    this.props.getAllUsers(currentPage, limit);
  }

  /**
   * @method componentWillUpdate
   * @param {*} nextProps
   * @return {*} props
   */
  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      history.push('/admin/signin');
    }
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
* @return {DOM} 
*/
  render() {
    return (
      <div className="admin">
        <Switch>
          <Route path={this.props.match.url + "/dashboard/clients"} name="adminDashboard" component={AdminDashboard} logout={this.logout} />
          <Route path={this.props.match.url + "/edit/client/:userId"} name="client" component={EditClient} logout={this.logout} />
          <Route path={this.props.match.url + "/dashboard/create"} name="create" component={Signup} logout={this.logout} />

        </Switch>
      </div>
    );
  }
}

Authenticate.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.setCurrentUser.isAuthenticated,
});

export default connect(mapStateToProps, { getAllUsers, logout })(Authenticate);
