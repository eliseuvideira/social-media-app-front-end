import React, { useEffect, useState } from 'react';
import { makeStyles, Card, Typography, Divider } from '@material-ui/core';
import PostList from './PostList';
import { Post } from '../models/Post';
import { Session } from '../models/Session';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2.5)}px ${theme.spacing(
      3,
    )}px`,
    fontSize: '1em',
  },
  media: {
    minHeight: 330,
  },
}));

const Newsfeed = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState<Post[]>([]);

  const [, token] = Session.getToken();

  const fetchPosts = async () => {
    if (!token) {
      return;
    }
    const foundPosts = await Post.find(token);
    setPosts(foundPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
  };

  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Newsfeed
      </Typography>
      <Divider />
      <PostList
        posts={posts}
        onLike={onLike}
        onDislike={onDislike}
        onDeletePost={onDeletePost}
      />
    </Card>
  );
};

export default Newsfeed;
