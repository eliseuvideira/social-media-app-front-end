import React from 'react';
import {
  makeStyles,
  GridList,
  GridListTile,
  Avatar,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    justifyContent: 'space-around',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  gridList: {
    margin: 'auto',
    width: '100%',
    heigth: '100%',
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10,
  },
}));

const UsersGrid: React.FC<{
  users: { _id: any; name: string; photo: { url: string } }[];
}> = ({ users }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {users.map((user) => (
          <GridListTile style={{ height: 120 }} key={user._id}>
            <Link to={`/users/${user._id}`} style={{ textDecoration: 'none' }}>
              {user.photo ? (
                <Avatar src={user.photo.url} className={classes.bigAvatar} />
              ) : (
                <Avatar className={classes.bigAvatar}>
                  <PersonIcon />
                </Avatar>
              )}
              <Typography
                variant="inherit"
                display="block"
                className={classes.tileText}
              >
                {user.name}
              </Typography>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

UsersGrid.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UsersGrid;
