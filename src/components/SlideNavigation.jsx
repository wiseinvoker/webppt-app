import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SlideNavigation = ({ slide, handlePrev, handleNext }) => {
  if (!slide || !slide.id) {
    return null; // Or return a fallback UI if desired
  }

  return (
    <div className="slide-navigation">
      <button className="nav-button" onClick={handlePrev}>&#8810;</button>
      <Link className="create-slide-button" to={`/edit/${slide.id}`}>Edit</Link>
      <button className="nav-button" onClick={handleNext}>&#8811;</button>
    </div>
  );
};

SlideNavigation.propTypes = {
  slide: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default SlideNavigation;
