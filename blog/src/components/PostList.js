

import Post from './Post';

function PostList({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <Post key={post._id} title={post.title} content={post.content} createdAt={post.createdAt} />
      ))}
    </div>
  );
}

export default PostList;

