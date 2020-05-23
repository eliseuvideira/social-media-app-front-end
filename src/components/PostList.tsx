import React from 'react';
import PropTypes from 'prop-types';
import PostComponent from './Post';
import { Post } from '../models/Post';

const PostList: React.FC<{
  posts: any[];
  onLike: (post: Post) => () => Promise<void>;
  onDislike: (post: Post) => () => Promise<void>;
}> = ({ posts, onLike, onDislike }) => {
  return (
    <div style={{ marginTop: '24px' }}>
      {posts.map((post) => (
        <PostComponent
          post={post}
          key={post._id}
          onClickLike={onLike(post)}
          onClickDislike={onDislike(post)}
        />
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default PostList;