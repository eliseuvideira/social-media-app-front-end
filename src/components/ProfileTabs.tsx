import React, { useState, PropsWithChildren } from 'react';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import UsersGrid from './UsersGrid';
import PostList from './PostList';
import { User } from '../models/User';
import { Post } from '../models/Post';

const TabContainer: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <Typography
    component="div"
    style={{ padding: 16, overflowY: 'auto', height: 500 }}
  >
    {children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

const ProfileTabs: React.FC<{
  user: User;
  posts: Post[];
  onLike: (post: Post) => () => Promise<void>;
  onDislike: (post: Post) => () => Promise<void>;
  onDeletePost: (post: Post) => () => Promise<void>;
  onComment: (post: Post) => (content: string) => Promise<void>;
  onUncomment: (post: Post) => (commentId: string) => Promise<void>;
}> = ({
  user,
  posts,
  onLike,
  onDislike,
  onDeletePost,
  onComment,
  onUncomment,
}) => {
  const [tab, setTab] = useState(0);

  const onChange = (_: any, value: number) => {
    setTab(value);
  };

  return (
    <div>
      <AppBar position="static" color="transparent">
        <Tabs
          value={tab}
          onChange={onChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          <PostList
            posts={posts}
            onLike={onLike}
            onDislike={onDislike}
            onDeletePost={onDeletePost}
            onComment={onComment}
            onUncomment={onUncomment}
          />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <UsersGrid users={user.following || []} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <UsersGrid users={user.followers || []} />
        </TabContainer>
      )}
    </div>
  );
};

ProfileTabs.propTypes = {
  user: PropTypes.any.isRequired,
  posts: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
  onUncomment: PropTypes.func.isRequired,
};

export default ProfileTabs;
