import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PostComponent from './Post';
import { Post } from '../models/Post';
import DeletePost from './DeletePost';

const PostList: React.FC<{
  posts: any[];
  onLike: (post: Post) => () => Promise<void>;
  onDislike: (post: Post) => () => Promise<void>;
  onDeletePost: (post: Post) => () => Promise<void>;
}> = ({ posts, onLike, onDislike, onDeletePost }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: '24px' }}>
      {posts.map((post) => (
        <>
          <PostComponent
            post={post}
            key={post._id}
            onClickLike={onLike(post)}
            onClickDislike={onDislike(post)}
            onDeletePost={async () => setOpen(true)}
          />
          <DeletePost
            open={open}
            onClose={() => setOpen(false)}
            onDelete={onDeletePost(post)}
          />
        </>
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
};

export default PostList;
