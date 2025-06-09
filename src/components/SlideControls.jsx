// slide navigation controls and etc
const SlideControls = ({ handlePrev, handleNext, createSlide, saveSlide, enterFullScreen, exitFullScreen, fullScreenMode }) => {
  return (
    <div className="slide-navigation">
      <button className="nav-button" onClick={handlePrev}>&#8592;</button>
      {!fullScreenMode && <button className="nav-button" onClick={enterFullScreen}><i className="material-icons">&#xe5d0;</i></button>}
      {fullScreenMode && <button className="nav-button" onClick={exitFullScreen}><i className="material-icons">&#xe5d1;</i></button>}
      {!fullScreenMode && <button className="nav-button" onClick={createSlide}>&#128929;</button>}
      {!fullScreenMode && <button className="nav-button" onClick={saveSlide}>&#10003;</button>}
      <button className="nav-button" onClick={handleNext}>&#8594;</button>
    </div>
  );
};

export default SlideControls;
