// frontend/src/components/SlideCreate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SlideCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [layout, setLayout] = useState('default');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the new slide data to the backend
    api.post('/slides', { title, content, layout })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error creating slide:", error);
      });
  };

  return (
    <div>
      <h1>Create New Slide</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Slide Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter slide title"
            required
          />
        </div>
        <div>
          <label htmlFor="content">Slide Content (Markdown)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter markdown content"
            rows="10"
            required
          />
        </div>
        <div>
          <label htmlFor="layout">Slide Layout</label>
          <select
            id="layout"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="image">Image</option>
          </select>
        </div>
        <button type="submit">Create Slide</button>
      </form>
    </div>
  );
};

export default SlideCreate;
