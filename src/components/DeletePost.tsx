import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const DeletePost: React.FC<{
  open?: boolean;
  onClose: () => void;
  onDelete: () => void;
}> = ({ open, onClose, onDelete }) => {
  return (
    <span>
      <Dialog open={open || false} onClick={onClose}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your post.</DialogContentText>
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

DeletePost.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeletePost;
