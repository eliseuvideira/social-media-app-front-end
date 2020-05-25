import React from 'react';
import PropTypes from 'prop-types';
import PostComponent from './Post';
import { Post } from '../models/Post';

const PostList: React.FC<{
  posts: any[];
  onLike: (post: Post) => () => Promise<void>;
  onDislike: (post: Post) => () => Promise<void>;
  onDeletePost: (post: Post) => () => Promise<void>;
  onComment: (post: Post) => (content: string) => Promise<void>;
  onUncomment: (post: Post) => (commentId: string) => Promise<void>;
}> = ({ posts, onLike, onDislike, onDeletePost, onComment, onUncomment }) => {
  return (
    <div style={{ marginTop: '24px' }}>
      {posts.map((post) => (
        <PostComponent
          post={post}
          key={post._id}
          onClickLike={onLike(post)}
          onClickDislike={onDislike(post)}
          onDeletePost={onDeletePost(post)}
          onComment={onComment(post)}
          onUncomment={onUncomment(post)}
        />
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onComment: PropTypes.func.isRequired,
  onUncomment: PropTypes.func.isRequired,
};

export default PostList;
