import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './components/EditProfile';
import Menu from './components/Menu';

const Router = () => (
  <>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute exact path="/users/:userId/edit" component={EditProfile} />
      <Route exact path="/users/:userId" component={Profile} />
    </Switch>
  </>
);

export default Router;
