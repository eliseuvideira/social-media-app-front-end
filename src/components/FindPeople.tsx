import React, { useEffect, useState } from 'react';
import { Session } from '../models/Session';
import { Redirect } from 'react-router';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
  Button,
  Paper,
  Snackbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { User } from '../models/User';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    fontSize: '1em',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  viewButton: {
    verticalAlign: 'middle',
  },
}));

const FindPeople = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [values, setValues] = useState<{
    open: boolean;
    followMessage: string;
  }>({
    open: false,
    followMessage: '',
  });
  const [loggedUser, token] = Session.getToken();

  const findPeople = async () => {
    if (!loggedUser || !token) {
      return;
    }
    const foundUsers = await loggedUser.findPeople(token);
    setUsers(foundUsers);
  };

  useEffect(() => {
    findPeople();
  }, []);

  if (!token || !loggedUser) {
    return <Redirect to="/sign-in" />;
  }

  const clickFollow = async (user: User) => {
    if (!token || !loggedUser) {
      return;
    }
    await user.follow(token);
    await findPeople();
    setValues({
      ...values,
      open: true,
      followMessage: `Following ${user.name}`,
    });
  };

  const onCloseSnackbar = () => {
    setValues({ ...values, open: false });
  };

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <List>
          {users.length ? (
            users.map((user) => (
              <span key={user._id}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    {user.photo ? (
                      <Avatar src={user.photo.url} />
                    ) : (
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={`/users/${user._id}`}>
                      <IconButton
                        className={classes.viewButton}
                        color="secondary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="primary"
                      onClick={() => clickFollow(user)}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            ))
          ) : (
            <span>
              <ListItem>
                <ListItemText primary="No one else left to follow" />
              </ListItem>
            </span>
          )}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={values.open}
        onClose={onCloseSnackbar}
        autoHideDuration={6000}
        message={<span>{values.followMessage}</span>}
      />
    </div>
  );
};

export default FindPeople;
