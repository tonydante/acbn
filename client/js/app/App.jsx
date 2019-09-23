
import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Signup from '../components/presentational/Signup';
import Login from '../components/presentational/Login';
import Dashboard from '../components/presentational/Dashboard';
import AdminDashboard from '../components/presentational/AdminDashboard';
import AuthenticateUser from '../utils/AuthenticateUser';
import AuthenticatedAdmin from '../utils/AuthenticateAdmin';
import CheckLoggedinUser from '../utils/CheckLoggedInUser';
import CheckLoggedinAdmin from '../utils/CheckLoggedInAdmin';
import AdminSignup from '../components/presentational/AdminSignup';
import AdminLogin from '../components/presentational/AdminLogin';
import EditClient from '../components/presentational/EditClient';
import AccountDetails from '../components/presentational/AccountDetails'
import Transfer from '../components/presentational/Transfer'
import Transactions from '../components/presentational/Transactions';
import ProgressBar from '../components/presentational/ProgressBar';
import AuthenticateAdmin from '../utils/AuthenticateAdmin';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" name="login" component={CheckLoggedinUser(Login)} />
      <Route exact path="/admin/signup" name="adminsignup" component={CheckLoggedinAdmin(AdminSignup)} />
      <Route exact path="/admin/signin" name="adminsignin" component={CheckLoggedinAdmin(AdminLogin)} />
      <Route path="/admin" component={AuthenticateAdmin} />
      <Route exact path="/dashboard" name="Dashboard" component={AuthenticateUser(Dashboard)} />
      <Route exact path="/accountdetails" name="accountdetails" component={AuthenticateUser(AccountDetails)} />
      <Route exact path="/transfer" name="transfer" component={AuthenticateUser(Transfer)} />
      <Route exact path="/transactions" name="transactions" component={AuthenticateUser(Transactions)} />
      <Route exact path="/taxcode" name="ProgressBar" component={AuthenticateUser(ProgressBar)} />
    </Switch>
  </Router>
);
export default App;
