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
  Container,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import { Session } from '../models/Session';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import FollowButton from './FollowButton';
import ProfileTabs from './ProfileTabs';
import { Post } from '../models/Post';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
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
  const [posts, setPosts] = useState<Post[]>([]);

  const classes = useStyles();
  const [loggedUser, token] = Session.getToken();

  const fetchUser = async () => {
    if (!token || !userId) {
      setRedirectToSignIn(true);
      return;
    }
    try {
      const foundUser = await User.findOne(userId, token);
      setUser(foundUser);
    } catch (err) {
      console.error(err);
      setRedirectToSignIn(true);
    }
  };

  const fetchPosts = async () => {
    if (!token || !user) {
      return;
    }
    const posts = await user.posts(token);
    setPosts(posts);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [user]);

  if (!loggedUser || !token || redirectToSignIn) {
    return (
      <Redirect
        to={{ pathname: '/signin', state: { from: `/users/${userId}` } }}
      />
    );
  }

  const isFollowing = () => {
    if (!user) {
      return false;
    }
    return (user.followers || [])
      .map((follower) => follower._id)
      .includes(loggedUser._id || '');
  };

  const onClickFollow = async () => {
    if (!user) {
      return;
    }
    if (isFollowing()) {
      await user.unfollow(token);
    } else {
      await user.follow(token);
    }
    await fetchUser();
  };

  const onLike = (post: Post) => async () => {
    if (!token) {
      return;
    }
    await post.like(token);
    await fetchPosts();
  };

  const onDislike = (post: Post) => async () => {
    if (!token) {
      return;
    }
    await post.dislike(token);
    await fetchPosts();
  };

  const onDeletePost = (post: Post) => async () => {
    if (!token) {
      return;
    }
    await post.delete(token);
    await fetchPosts();
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        {user && (
          <List dense>
            <ListItem>
              <ListItemAvatar>
                {user.photo ? (
                  <Avatar src={user.photo.url} />
                ) : (
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              {Session.isAuthenticated() && loggedUser._id == user._id ? (
                <ListItemSecondaryAction>
                  <Link to={`/users/${user._id}/edit`}>
                    <IconButton aria-label="Edit" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <DeleteUser user={user} token={token} />
                </ListItemSecondaryAction>
              ) : (
                <FollowButton
                  following={isFollowing()}
                  onClick={onClickFollow}
                />
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
            <ProfileTabs
              user={user}
              posts={posts}
              onLike={onLike}
              onDislike={onDislike}
              onDeletePost={onDeletePost}
            />
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
