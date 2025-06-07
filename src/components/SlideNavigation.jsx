import PropTypes from 'prop-types';

const SlideNavigation = ({ slide, handlePrev, handleNext }) => {
  if (!slide || !slide.id) {
    return null;
  }

  return (
    <div className="slide-navigation">
      <button className="nav-button" onClick={handlePrev}>&#8810;</button>
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
