// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SlideEditor from './components/SlideEditor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<SlideEditor />} />
        <Route path="/create" element={<SlideEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
