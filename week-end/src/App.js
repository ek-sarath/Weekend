import React, {useState} from 'react';
import './App.css';

 function App() {
   const [posts, setPosts] = useState([]);
   const [newPostText, setNewPostText] = useState('');
   const [editingPostId, setEditingPostId] = useState(null); 


   const handlePostChange = (e) => {
    setNewPostText(e.target.value);};


   const handlePostSubmit = () => {
     if (newPostText.trim() !== '') {
       const newPost = {
         id: Date.now(),
         text: newPostText,
         likes: 0,
         unlikes: 0,
         isEditing: false,};
      setPosts([...posts, newPost]);
      setNewPostText('');}};


  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {...post, likes: post.likes+1};
      }
      return post;});
    setPosts(updatedPosts);};


  const handleUnlike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {...post, unlikes: post.unlikes+1};
      }
      return post;
    });
    setPosts(updatedPosts);
  }; 


  const handleEdit = (postId) => {
    setEditingPostId(postId);

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, isEditing: true };
      }
      return post;});
    setPosts(updatedPosts);};
    

  const handleSaveEdit = (postId, newText) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, text: newText, isEditing: false };
      }
      return post;});
    setPosts(updatedPosts);
    setEditingPostId(null);};


  const handleCancelEdit = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, isEditing: false };
      }
      return post;});
    setPosts(updatedPosts);
    setEditingPostId(null);};
 

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    if (editingPostId === postId) {
      setEditingPostId(null);}
  };



  return (
    <div className="App">

        <h1>Mini Social Media Feed</h1>

        <div className="PostForm">
          <textarea rows="4" className="PostBox" placeholder="What's on your mind?" value={newPostText} onChange={handlePostChange}/>
          <button onClick={handlePostSubmit} className="PostButton"> Post </button>
       </div>

        <div>
            {posts.map((post) => (
              <div className="Post" key={post.id}>
                {post.isEditing ? (

                <div>
                  <textarea value={newPostText} onChange={(e) => setNewPostText(e.target.value)}/>
                  <button onClick={() => handleSaveEdit(post.id, newPostText)} className='SaveButton'>Save</button>
                  <button onClick={() => handleCancelEdit(post.id)} className='CancelButton'>Cancel</button>
                </div>

                 ) : (<p>{post.text}</p>)}
                   
                <div>
                  <span className="LikeButton" onClick={() => handleLike(post.id)}>👍Likes({post.likes})</span>
                  <span className="UnlikeButton" onClick={() => handleUnlike(post.id)}>👎Dislike({post.unlikes})</span>
                  {post.isEditing ? null : (
                  <button onClick={() => handleEdit(post.id)} className='EditButton'>Edit</button>
                  )}
                  <button onClick={() => handleDelete(post.id)} className='DeleteButton'>Delete</button>
                </div>

              </div>
          ))}
        </div>
    </div>
  );
}

export default App;
