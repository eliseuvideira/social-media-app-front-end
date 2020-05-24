import React, { useState, useEffect } from 'react';
import { Session } from '../models/Session';
import { RouteComponentProps, Redirect } from 'react-router';
import {
  Card,
  CardContent,
  CardActions,
  makeStyles,
  Button,
  Typography,
  TextField,
  Icon,
  Container,
} from '@material-ui/core';
import { User } from '../models/User';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  filename: {
    marginLeft: '10px',
  },
}));

const EditProfile = ({
  match: {
    params: { userId },
  },
}: RouteComponentProps<{ userId?: string }>) => {
  const classes = useStyles();

  const [values, setValues] = useState<{
    name: string;
    email: string;
    password: string;
    about: string;
    photo?: any;
    error: string;
    redirectToProfile: boolean;
  }>({
    name: '',
    email: '',
    password: '',
    about: '',
    error: '',
    redirectToProfile: false,
  });

  const [user, token] = Session.getToken();

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!token || !userId) {
      setValues({ ...values, redirectToProfile: true });
      return;
    }
    try {
      const foundUser = await User.findOne(userId!, token);
      setValues({
        ...values,
        name: foundUser.name,
        email: foundUser.email,
        about: foundUser.about || '',
      });
    } catch (err) {
      console.error(err);
      setValues({ ...values, redirectToProfile: true });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user || !token || user._id !== userId || values.redirectToProfile) {
    return <Redirect to={`/users/${userId}`} />;
  }

  const onSubmit = async () => {
    user.name = values.name;
    user.email = values.email;
    user.about = values.about;
    setLoading(true);
    try {
      await user.update(
        token,
        values.password || undefined,
        values.photo || undefined,
      );
      setValues({ ...values, redirectToProfile: true });
    } catch (err) {
      setValues({ ...values, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const onChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...values, [key]: e.target.value });
  };

  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      photo: event.target.files ? event.target.files[0] : undefined,
    });
  };

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onPhotoChange}
            id="icon-button-file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default" component="span">
              Upload <AddPhotoAlternateIcon />
            </Button>
          </label>
          <br />
          <span className={classes.filename}>
            {values.photo ? values.photo.name : ''}
          </span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={onChange('name')}
            margin="normal"
          />
          <br />
          <TextField
            id="multiline-flexible"
            label="About"
            className={classes.textField}
            multiline
            rows="2"
            value={values.about}
            onChange={onChange('about')}
          />
          <br />
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={onChange('email')}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            className={classes.textField}
            value={values.password}
            onChange={onChange('password')}
            margin="normal"
          />
          <br />
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
            onClick={onSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Loading loading={loading} />
    </Container>
  );
};

export default EditProfile;
