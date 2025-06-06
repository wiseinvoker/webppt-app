const ProgressBar = ({ currentSlide, slides }) => {
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
