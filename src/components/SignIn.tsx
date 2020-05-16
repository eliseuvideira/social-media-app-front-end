import React, { useState } from 'react';
import { User } from '../models/User';
import { Session } from '../models/Session';
import { RouteComponentProps, Redirect } from 'react-router';
import {
  Card,
  Typography,
  CardContent,
  Button,
  CardActions,
  TextField,
  Icon,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
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

const SignIn = ({ location: { state } }: RouteComponentProps) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

  const onChangeHandler = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const onSubmitHandler = async () => {
    try {
      const [user, token] = await User.signIn(values.email, values.password);
      Session.setToken(user, token);
      setValues({ ...values, error: '', redirectToReferrer: true });
    } catch (err) {
      setValues({ ...values, error: err.message });
    }
  };

  const { from } = (state as any) || { from: { pathname: '/' } };

  if (values.redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={onChangeHandler('email')}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={onChangeHandler('password')}
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
            onClick={onSubmitHandler}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SignIn;
