// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SlideShow from './components/SlideShow';
import SlideEditor from './components/SlideEditor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SlideShow />} />
        <Route path="/edit/:id" element={<SlideEditor />} />
        <Route path="/create" element={<SlideEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
