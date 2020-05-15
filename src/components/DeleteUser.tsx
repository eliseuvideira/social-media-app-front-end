import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router';
import { Session } from '../models/Session';
import { User } from '../models/User';
import PropTypes from 'prop-types';

const DeleteUser: React.FC<{ user: User; token: string }> = ({
  user,
  token,
}) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/" />;
  }

  const onClick = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onDelete = async () => {
    await user.remove(token);
    Session.clearToken();
    setRedirect(true);
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={onClick} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClick={onClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete you account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDelete} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  user: PropTypes.any.isRequired,
  token: PropTypes.string.isRequired,
};

export default DeleteUser;
