import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, IconButton, Fade } from '@material-ui/core';

const useStyles = makeStyles({
  lightbox: {
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
  closeIcon: {
    position: 'fixed',
    zIndex: 1001,
    top: 0,
    right: 0,
    marginTop: '2%',
    marginRight: '2%',
    color: 'white',
  },
});

const Lightbox: React.FC<{
  open?: boolean;
  onClose?: () => void;
  imageUrl: string;
}> = ({ open, onClose, imageUrl }) => {
  const classes = useStyles();

  const clickClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Fade in={open}>
      <div className={classes.lightbox} onClick={clickClose}>
        <IconButton className={classes.closeIcon} onClick={clickClose}>
          <CloseIcon />
        </IconButton>
        <img
          className={classes.image}
          src={imageUrl}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </Fade>
  );
};

Lightbox.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  imageUrl: PropTypes.string.isRequired,
};

export default Lightbox;
