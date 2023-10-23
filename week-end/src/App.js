import React, { useState } from 'react';
import './App.css';

function App() {
  const [post, setPost] = useState([]);
  const [newPostText, setNewPostText] = useState('');

  const handlePostChange = (e) => {
    setNewPostText(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPostText.trim() !== '') {
      const newPost = {
        id: post.length + 1,
        text: newPostText,
        likes: 0,
      };
      setPost([...post, newPost]);
      setNewPostText('');
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = post.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPost(updatedPosts);
  };

  return (
    <div className = "App">

      <h1> Mini Social Media Feed </h1>

      <div id="PostForm" className="PostForm">
        <textarea
          rows="4"
          className="PostBox"
          placeholder="What's on your mind?"
          value={newPostText}
          onChange={handlePostChange}
        />
        <button onClick={handlePostSubmit} className = "PostButton"> Post </button>
      </div>

        <div>
          {post.map((post) => (
            <div className="Post" key={post.id}>
              <p>{post.text}</p>
            <div>
              <span className="LikeButton" onClick={() => handleLike(post.id)}> Like ({post.likes}) </span>
            </div>
          </div>
        ))}
        </div>

    </div>
  );
}

export default App;
