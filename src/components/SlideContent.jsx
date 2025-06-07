import MarkdownRenderer from "./MarkdownRenderer";
import api from '../api/axios';

const SlideContent = ({ slide }) => {
    const handleDelete = () => {
        const confirmMsg = "Are you sure to delete this slide?";
        if (confirm(confirmMsg) == false) return;

        if (slide.id) {
            api.delete(`/slides/${slide.id}`)
                .then(() => location.reload())
                .catch((error) => console.error("Error deleting slide:", error));
        }
    };

    return (
        <div className="slide-content-center">
            <div className="slide-header">
                <h2 className="slide-title">{slide.title}</h2>
                <a href={`/edit/${slide.id}`}>Edit</a> | <span onClick={handleDelete}>Delete</span>
            </div>

            <div className={`markdown-content ${slide.layout == 'center' ? 'slide-content-center' : ''}`}>
                <MarkdownRenderer markdown={slide.content} />
            </div>
        </div>
    );
};

export default SlideContent;
