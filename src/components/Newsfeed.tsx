import React, { useEffect, useState } from 'react';
import { makeStyles, Card, Typography, Divider } from '@material-ui/core';
import PostList from './PostList';
import { Post } from '../models/Post';
import { Session } from '../models/Session';
import NewPost from './NewPost';

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

  const [user, token] = Session.getToken();

  const fetchPosts = async () => {
    if (!user || !token) {
      return;
    }
    const foundPosts = await user.feed(token);
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
    await fetchPosts();
  };

  const onComment = (post: Post) => async (content: string) => {
    if (!token) {
      return;
    }
    await post.comment(token, content);
    await fetchPosts();
  };

  const onUncomment = (post: Post) => async (commentId: string) => {
    if (!token || !user) {
      return;
    }
    await post.uncomment(token, commentId);
    await fetchPosts();
  };

  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title}>
        Newsfeed
      </Typography>
      <Divider />
      <NewPost onAddPost={() => fetchPosts()} />
      <Divider />
      <PostList
        posts={posts}
        onLike={onLike}
        onDislike={onDislike}
        onDeletePost={onDeletePost}
        onComment={onComment}
        onUncomment={onUncomment}
      />
    </Card>
  );
};

export default Newsfeed;
