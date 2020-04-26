import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Session } from '../models/SessionModel';
import PropTypes from 'prop-types';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => (
  <Route
    {...props}
    render={({ location }) =>
      Session.isAuthenticated() ? (
        children
      ) : (
        <Redirect to={{ pathname: '/sign-in', state: { from: location } }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
