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
} from '@material-ui/core';
import { User } from '../models/User';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
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
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const EditProfile = ({
  match: {
    params: { userId },
  },
}: RouteComponentProps<{ userId?: string }>) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    error: '',
    redirectToProfile: false,
  });

  const [user, token] = Session.getToken();

  useEffect(() => {
    if (!token || !userId) {
      setValues({ ...values, redirectToProfile: true });
      return;
    }
    User.findOne(userId!, token)
      .then((foundUser) =>
        setValues({ ...values, name: foundUser.name, email: foundUser.email }),
      )
      .catch((err) => {
        console.error(err);
        setValues({ ...values, redirectToProfile: true });
      });
  }, [userId]);

  if (!user || !token || user._id !== userId || values.redirectToProfile) {
    return <Redirect to={`/users/${userId}`} />;
  }

  const onSubmit = async () => {
    user.name = values.name;
    user.email = values.email;
    try {
      await user.update(token);
      setValues({ ...values, redirectToProfile: true });
    } catch (err) {
      setValues({ ...values, error: err.message });
    }
  };

  const onChange = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...values, [key]: e.target.value });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
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
          id="email"
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={onChange('email')}
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
  );
};

export default EditProfile;
