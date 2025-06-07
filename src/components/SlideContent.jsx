import MarkdownRenderer from "./MarkdownRenderer";

const SlideContent = ({ slide }) => {
  return (
    <div className="slide-content-center">
      <div className="slide-header">
        <h2 className="slide-title">{slide.title}</h2>
      </div>

      <div className={`markdown-content ${slide.layout == 'center' ? 'slide-content-center' : ''}`}>
        <MarkdownRenderer markdown={slide.content} />
      </div>
    </div>
  );
};

export default SlideContent;
