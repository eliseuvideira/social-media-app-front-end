import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import imageCover from '../assets/images/cover.jpg';
import { Grid } from '@material-ui/core';
import { Session } from '../models/Session';
import FindPeople from './FindPeople';
import Newsfeed from './Newsfeed';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
      ${theme.spacing(2)}px`,
  },
  media: {
    minHeight: 400,
  },
}));

const Home = () => {
  const classes = useStyles();

  const [loggedUser, token] = Session.getToken();

  return (
    <div className={classes.root}>
      {loggedUser && token ? (
        <Grid container spacing={8} justify="center">
          <Grid item xs={8} sm={7}>
            <Newsfeed />
          </Grid>
          <Grid item xs={4} sm={5}>
            <FindPeople />
          </Grid>
        </Grid>
      ) : (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia
            className={classes.media}
            image={imageCover}
            title="Unicorn Bicycle"
          />
          <CardContent>
            <Typography variant="body2" component="p">
              Welcome to the MERN Skeleton home page.
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
