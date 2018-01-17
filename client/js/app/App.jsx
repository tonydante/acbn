
import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import Signup from '../components/presentational/Signup';
import Login from '../components/presentational/Login';
import Dashboard from '../components/presentational/Dashboard';
import AuthenticateUser from '../utils/AuthenticateUser';
import CheckLoggedinUser from '../utils/CheckLoggedInUser';
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
//<Route exact path="/login" name="login" component={CheckLoggedinUser(Login)} />


const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" name="login" component={CheckLoggedinUser(Login)} />
      <Route exact path="/signup" name="signup" component={CheckLoggedinUser(Signup)} />
      <Route exact path="/dashboard" name="Dashboard" component={AuthenticateUser(Dashboard)} />
    </Switch>
  </Router>
);
export default App;