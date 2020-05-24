import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Icon,
  CardActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Session } from '../models/Session';
import PersonIcon from '@material-ui/icons/Person';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { User } from '../models/User';
import { Post } from '../models/Post';
import PropTypes from 'prop-types';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0 1px`,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none',
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%',
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: 'super',
  },
  error: {
    verticalAlign: 'middle',
  },
}));

const NewPost: React.FC<{ onAddPost: () => Promise<void> }> = ({
  onAddPost,
}) => {
  const classes = useStyles();

  const [values, setValues] = useState<{
    content: string;
    error: string;
    photo?: File;
    user?: User;
  }>({
    content: '',
    error: '',
  });

  const [loggedUser, token] = Session.getToken();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setValues({ ...values, user: loggedUser });
    }
  }, []);

  const clickPost = async () => {
    if (!token) {
      return;
    }
    const post = new Post({ content: values.content });
    setLoading(true);
    try {
      await post.insert(token, values.photo);
      setValues({ ...values, error: '', content: '', photo: undefined });
      onAddPost();
    } catch (err) {
      setValues({ ...values, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.files && event.target.files[0];
    if (value) {
      setValues({ ...values, photo: value });
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
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
          title={values.user && values.user.name}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            value={values.content}
            onChange={onChange('content')}
            className={classes.textField}
            margin="normal"
          />
          <input
            accept="image/*"
            onChange={onPhotoChange}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              className={classes.photoButton}
              component="span"
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ''}
          </span>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={values.content === ''}
            onClick={clickPost}
            className={classes.submit}
          >
            Post
          </Button>
        </CardActions>
      </Card>
      <Loading loading={loading} />
    </div>
  );
};

NewPost.propTypes = {
  onAddPost: PropTypes.func.isRequired,
};

export default NewPost;
