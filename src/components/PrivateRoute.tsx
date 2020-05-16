import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Session } from '../models/Session';
import PropTypes from 'prop-types';

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...props
}: {
  component?: any;
}) => (
  <Route
    {...props}
    render={({ location, match, history }) =>
      Session.isAuthenticated() ? (
        <Component {...{ ...props, location, match, history }} />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: location } }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
