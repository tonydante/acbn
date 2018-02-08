
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

// import IdeasPage from '../containers/IdeasPage';
// import IdeaPage from '../containers/CommentPage';
// import CategoryPage from '../containers/CategoryPage';
// import UserIdeaPage from '../containers/UserIdeaPage';
// import EditIdeaPage from '../containers/EditIdeaPage';
// import UpdateProfilePage from '../containers/UpdateProfilePage';
// import ForgotPassword from '../containers/ForgotPassword';
// import ResetPassword from '../containers/ResetPassword';
// import Search from '../containers/Search';
import '../../../public/styles/materialize.min.css';
import '../../scss/main.scss';
import '../../../public/js/jquery-3.2.1.min'
import '../../../public/js/materialize.min';
import AuthenticateAdmin from '../utils/AuthenticateAdmin';
//<Route exact path="/login" name="login" component={CheckLoggedinUser(Login)} />


const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" name="login" component={CheckLoggedinUser(Login)} />
      <Route exact path="/signup" name="signup" component={CheckLoggedinUser(Signup)} />
      <Route exact path="/admin/signup" name="adminsignup" component={CheckLoggedinAdmin(AdminSignup)} />
      <Route exact path="/admin/signin" name="adminsignin" component={CheckLoggedinAdmin(AdminLogin)} />
      <Route path="/admin" component={AuthenticateAdmin} />
      <Route exact path="/dashboard" name="Dashboard" component={AuthenticateUser(Dashboard)} />
      <Route exact path="/accountdetails" name="accountdetails" component={AuthenticateUser(AccountDetails)} />
      <Route exact path="/transfer" name="transfer" component={AuthenticateUser(Transfer)} />
      <Route exact path="/transactions" name="transactions" component={AuthenticateUser(Transactions)} />
    </Switch>
  </Router>
);
export default App;