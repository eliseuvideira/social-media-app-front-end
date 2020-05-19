import React from 'react';
import { ButtonProps, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const FollowButton: React.FC<{ following: boolean } & ButtonProps> = ({
  following,
  ...props
}) => (
  <div>
    {following ? (
      <Button {...props} variant="contained" color="secondary">
        Unfollow
      </Button>
    ) : (
      <Button {...props} variant="contained" color="primary">
        Follow
      </Button>
    )}
  </div>
);

FollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
};

export default FollowButton;
