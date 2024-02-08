import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8081/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data && typeof data === 'object') {
        setPosts([data]);
      } else {
        console.error('Unexpected response format:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setPosts([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Blog</h1>
      <PostForm />
      <PostList posts={posts} />
      <Outlet />
    </div>
  );
}

export default App;
