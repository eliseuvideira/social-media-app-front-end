import React from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Session } from '../models/Session';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import PropTypes from 'prop-types';
import { Post } from '../models/Post';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    heigth: '100%',
    padding: theme.spacing(1),
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PostComponent: React.FC<{
  post: Post;
  onClickLike: () => Promise<void>;
  onClickDislike: () => Promise<void>;
}> = ({ post, onClickLike, onClickDislike }) => {
  const classes = useStyles();

  const [loggedUser, token] = Session.getToken();

  const deletePost = () => {
    if (!token) {
      return;
    }
    post.delete(token);
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            post.postedBy.photo ? (
              <Avatar src={post.postedBy.photo.url} />
            ) : (
              <Avatar>
                <PersonIcon />
              </Avatar>
            )
          }
          action={
            loggedUser &&
            loggedUser._id === post.postedBy._id && (
              <IconButton onClick={deletePost}>
                <DeleteIcon />
              </IconButton>
            )
          }
          title={
            <Link to={`/users/${post.postedBy._id}`}>{post.postedBy.name}</Link>
          }
          subheader={new Date(post.createdAt || new Date()).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            {post.content}
          </Typography>
          {post.photo && (
            <div className={classes.photo}>
              <img className={classes.media} src={post.photo.url} />
            </div>
          )}
        </CardContent>
        <CardActions>
          {(post.likes || []).includes((loggedUser || { _id: null })._id) ? (
            <IconButton
              onClick={onClickDislike}
              className={classes.button}
              aria-label="Dislike"
              color="secondary"
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={onClickLike}
              className={classes.button}
              aria-label="Like"
              color="secondary"
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <span>{(post.likes || []).length}</span>
          <IconButton
            className={classes.button}
            aria-label="Comment"
            color="secondary"
          >
            <CommentIcon />
          </IconButton>
          <span>{(post.comments || []).length}</span>
        </CardActions>
      </Card>
    </div>
  );
};

PostComponent.propTypes = {
  post: PropTypes.any.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickDislike: PropTypes.func.isRequired,
};

export default PostComponent;
