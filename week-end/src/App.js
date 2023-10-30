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
        unlikes: 0,
      };
      setPost([...post, newPost]);
      setNewPostText('');
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = post.map((p) => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setPost(updatedPosts);
  };

  const handleUnlike = (postId) => {
    const updatedPosts = post.map((p) => {
      if (p.id === postId) {
        return { ...p, unlikes: p.unlikes + 1 };
      }
      return p;
    });
    setPost(updatedPosts);
  };

  return (
    <div className="App">
      <h1>Mini Social Media Feed</h1>
      <div id="PostForm" className="PostForm">
        <textarea
          rows="4"
          className="PostBox"
          placeholder="What's on your mind?"
          value={newPostText}
          onChange={handlePostChange}
        />
        <button onClick={handlePostSubmit} className="PostButton">
          Post
        </button>
      </div>

      <div>
        {post.map((p) => (
          <div className="Post" key={p.id}>
            <p>{p.text}</p>
            <div>
              <span className="LikeButton" onClick={() => handleLike(p.id)}>
                👍Likes({p.likes})
              </span>
              <span className="UnlikeButton" onClick={() => handleUnlike(p.id)}>
                👎Dislike({p.unlikes})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
