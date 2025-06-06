import React from 'react';

const SlideContent = ({ slide, parseMarkdownToAST }) => {
  return (
    <div className="slide-content-center">
      <div className="slide-header">
        <h2 className="slide-title">{slide.title}</h2>
      </div>

      <div className={`markdown-content ${slide.layout == 'center' ? 'slide-content-center' : ''}`}>
        {parseMarkdownToAST(slide.content)}
      </div>
    </div>
  );
};

export default SlideContent;
