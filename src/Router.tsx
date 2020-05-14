import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users" component={Users} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route exact path="/users/:userId" component={Profile} />
  </Switch>
);

export default Router;
