// frontend/src/components/SlideEditor.js
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SlideEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [layout, setLayout] = useState('default');

  useEffect(() => {
    if (id) {
      // Fetch slide data for editing
      api.get(`/slides/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setLayout(response.data.layout);
        })
        .catch((error) => console.error("Error fetching slide:", error));
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      api.put(`/slides/${id}`, { title, content, layout })
      .then(() => navigate('/'))
      .catch((error) => console.error("Error saving slide:", error));
    } else {
      api.post(`/slides`, { title, content, layout })
      .then(() => navigate('/'))
      .catch((error) => console.error("Error saving slide:", error));
    }
  };

  return (
    <div className="slide-editor-container">
      <h1 className='slide-edit-header'>{id ? 'Edit' : 'Create'} Slide</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="slide-editor-form">
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <button type="submit" className="save-slide-button">Save Slide</button>
      </form>
    </div>
  );
};

export default SlideEditor;
