import React from 'react';
import PropTypes from 'prop-types';

const ProgressText = ({ currentSlide = 0, slides = [] }) => {
  const totalSlides = Array.isArray(slides) ? slides.length : 0;
  const current = Math.min(currentSlide + 1, totalSlides);

  if (totalSlides === 0) {
    return <div className="progress-text">No slides available</div>;
  }

  return (
    <div className="progress-text">
      Slide {current} of {totalSlides}
    </div>
  );
};

ProgressText.propTypes = {
  currentSlide: PropTypes.number,
  slides: PropTypes.arrayOf(PropTypes.object),
};

ProgressText.defaultProps = {
  currentSlide: 0,
  slides: [],
};

export default ProgressText;
