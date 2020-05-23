import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import imageCover from '../assets/images/cover.jpg';
import { Grid, Container, Hidden } from '@material-ui/core';
import { Session } from '../models/Session';
import FindPeople from './FindPeople';
import Newsfeed from './Newsfeed';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
      ${theme.spacing(2)}px`,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771',
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  const [loggedUser, token] = Session.getToken();

  return (
    <div className={classes.root}>
      {loggedUser && token ? (
        <Container maxWidth="lg">
          <Grid container spacing={8} justify="center">
            <Grid item xs={12} md={7}>
              <Newsfeed />
            </Grid>
            <Hidden smDown>
              <Grid item sm={5}>
                <FindPeople />
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="md">
          <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
              Home Page
            </Typography>
            <CardMedia
              className={classes.media}
              image={imageCover}
              title="Unicorn Bicycle"
            />
            <Typography
              variant="body2"
              component="p"
              className={classes.credit}
              color="textSecondary"
            >
              Photo by{' '}
              <a
                href="https://unsplash.com/@boudewijn_huysmans"
                target="_blank"
                rel="noopener noreferrer"
              >
                Boudewijn Huysmans
              </a>{' '}
              on Unsplash
            </Typography>
            <CardContent>
              <Typography variant="body2" component="p">
                Welcome to the MERN Skeleton home page.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default Home;
