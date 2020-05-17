import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  makeStyles,
  Container,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { Session } from '../models/Session';

const useStyles = makeStyles(() => ({
  marginLeftAuto: {
    marginLeft: 'auto',
  },
}));

const getColor = (active: boolean): 'secondary' | 'inherit' => {
  if (active) {
    return 'secondary';
  }
  return 'inherit';
};

const Menu = withRouter(({ history }) => {
  const classes = useStyles();
  const isAuth = Session.isAuthenticated();
  const [user] = Session.getToken();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton color="inherit" onClick={() => history.push('/')}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            MERN Social
          </Typography>
          <Button
            color={getColor(history.location.pathname === '/users')}
            component={Link}
            to="/users"
            className={classes.marginLeftAuto}
          >
            Users
          </Button>
          {isAuth && user ? (
            <span>
              <Button
                component={Link}
                to={`/users/${user._id}`}
                color={getColor(
                  history.location.pathname === `/users/${user._id}`,
                )}
              >
                My Profile
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  Session.clearToken();
                  history.push('/');
                }}
              >
                Sign out
              </Button>
            </span>
          ) : (
            <span>
              <Button
                color={getColor(history.location.pathname === '/signup')}
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
              <Button
                color={getColor(history.location.pathname === '/signin')}
                component={Link}
                to="/signin"
                variant="outlined"
              >
                Sign In
              </Button>
            </span>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Menu;
