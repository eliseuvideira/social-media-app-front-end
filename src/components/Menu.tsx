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
import HomeIcon from '@material-ui/icons/Home';
import { Session } from '../models/Session';

const useStyles = makeStyles(() => ({
  marginLeftAuto: {
    marginLeft: 'auto',
  },
}));

const getStyle = (active: boolean) => {
  if (active) {
    return { color: '#ff4081' };
  }
  return { color: '#ffffff' };
};

const Menu = withRouter(({ history }) => {
  const classes = useStyles();
  const isAuth = Session.isAuthenticated();
  const [user] = isAuth ? Session.getToken() : [null];

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Link to="/">
            <IconButton
              aria-label="Home"
              style={getStyle(history.location.pathname === '/')}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit">
            MERN Skeleton
          </Typography>
          <Link to="/users" className={classes.marginLeftAuto}>
            <Button style={getStyle(history.location.pathname === '/users')}>
              Users
            </Button>
          </Link>
          {isAuth && user ? (
            <span>
              <Link to={`/users/${user._id}`}>
                <Button
                  style={getStyle(
                    history.location.pathname === `/users/${user._id}`,
                  )}
                >
                  My Profile
                </Button>
              </Link>
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
              <Link to="/signup">
                <Button
                  style={getStyle(history.location.pathname === '/signup')}
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button
                  style={getStyle(history.location.pathname === '/signin')}
                >
                  Sign In
                </Button>
              </Link>
            </span>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default Menu;
