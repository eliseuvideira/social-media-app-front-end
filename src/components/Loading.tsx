import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Fade, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  background: {
    position: 'fixed',
    zIndex: 999,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '80%',
    marginTop: '2%',
    zIndex: 1000,
  },
});

const Loading: React.FC<{
  loading?: boolean;
}> = ({ loading }) => {
  const classes = useStyles();

  return (
    <Fade in={loading}>
      <div className={classes.background}>
        <CircularProgress color="secondary" />
      </div>
    </Fade>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
