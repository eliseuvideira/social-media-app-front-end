import React, { useState, useEffect } from 'react';
import { User } from '../models/User';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForward';
import PersonIcon from '@material-ui/icons/Person';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    padding: theme.spacing(3),
  }),
  title: {
    marginTop: theme.spacing(1),
  },
}));

const Users = withRouter(({ history }) => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    (async () => {
      const newUsers = await User.find();
      setUsers(newUsers);
    })();
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((user, i) => {
          return (
            <ListItem button component={Link} to={`/users/${user._id}`} key={i}>
              <ListItemAvatar>
                {user.photo ? (
                  <Avatar src={user.photo.url} />
                ) : (
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => history.push(`/users/${user._id}`)}>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
});

export default Users;
