import React, { useState } from 'react';
import {
  CardHeader,
  Avatar,
  TextField,
  makeStyles,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Session } from '../models/Session';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: '96%',
  },
  commentText: {
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    color: 'gray',
    fontSize: '0.8em',
  },
  commentDelete: {
    fontSize: '1.6em',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
}));

const Comments: React.FC<{
  comments: any[];
  onComment: (content: string) => Promise<void>;
  onUncomment: (commentId: string) => Promise<void>;
}> = ({ comments, onComment, onUncomment }) => {
  const classes = useStyles();

  const [loggedUser] = Session.getToken();

  const [content, setContent] = useState('');

  const addComment = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && content) {
      event.preventDefault();
      await onComment(content);
      setContent('');
    }
  };

  const commentBody = (comment: any) => {
    return (
      <div className={classes.commentText}>
        <Grid container direction="row">
          <Grid item xs={11}>
            <Grid container direction="column">
              <Grid item>
                <Link to={`/users/${comment.postedBy._id}`}>
                  {comment.postedBy.name}
                </Link>
              </Grid>
              <Grid item>{comment.content}</Grid>
              <Grid item>
                <div className={classes.commentDate}>
                  {new Date(comment.createdAt).toDateString()}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            {loggedUser && loggedUser._id === comment.postedBy._id && (
              <IconButton
                onClick={() => onUncomment(comment._id)}
                className={classes.commentDelete}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          loggedUser &&
          (loggedUser.photo ? (
            <Avatar src={loggedUser.photo.url} />
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          ))
        }
        title={
          <TextField
            multiline
            onKeyDown={addComment}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Write something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
      />
      {comments.map((comment) => (
        <CardHeader
          key={comment._id}
          avatar={
            comment.postedBy.photo ? (
              <Avatar src={comment.postedBy.photo.url} />
            ) : (
              <Avatar>
                <PersonIcon />
              </Avatar>
            )
          }
          title={commentBody(comment)}
          className={classes.cardHeader}
        />
      ))}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  onComment: PropTypes.func.isRequired,
  onUncomment: PropTypes.func.isRequired,
};

export default Comments;
