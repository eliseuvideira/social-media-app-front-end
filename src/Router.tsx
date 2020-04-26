import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users" component={Users} />
  </Switch>
);

export default Router;
