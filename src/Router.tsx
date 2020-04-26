import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import SignUp from './components/SignUp';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users" component={Users} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default Router;
