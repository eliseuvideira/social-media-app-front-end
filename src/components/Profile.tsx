import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { User } from '../models/User';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import { Session } from '../models/Session';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = ({
  match: {
    params: { userId },
  },
}: RouteComponentProps<{ userId?: string }>) => {
  const [user, setUser] = useState<null | User>(null);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  const classes = useStyles();
  const [loggedUser, token] = Session.getToken();

  useEffect(() => {
    if (!token || !userId) {
      setRedirectToSignIn(true);
      return;
    }
    User.findOne(userId, token)
      .then((foundUser) => setUser(foundUser))
      .catch((err) => {
        console.error(err);
        setRedirectToSignIn(true);
      });
  }, [userId]);

  if (!loggedUser || !token || redirectToSignIn) {
    return (
      <Redirect
        to={{ pathname: '/signin', state: { from: `/users/${userId}` } }}
      />
    );
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      {user && (
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            {Session.isAuthenticated() && loggedUser._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={`/users/${user._id}/edit`}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <DeleteUser user={user} token={token} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={user.about}
              secondary={`Joined: ${(user.createdAt
                ? new Date(user.createdAt)
                : new Date()
              ).toDateString()}`}
            />
          </ListItem>
        </List>
      )}
    </Paper>
  );
};

export default Profile;
