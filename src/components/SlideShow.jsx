// frontend/src/components/SlideShow.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from '../api/axios';

const SlideShow = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Fetch slides from backend using Axios
        api.get('/slides')
            .then((response) => setSlides(response.data))
            .catch((error) => console.error("Error fetching slides:", error));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSlide]);


    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const slide = slides[currentSlide];

    // Custom renderer for code blocks (for syntax highlighting)
    const customRenderers = {
        code: ({ language, value }) => {
        return (
            <SyntaxHighlighter language={language} style={solarizedlight}>
            {value}
            </SyntaxHighlighter>
        );
        },
    };

    // Parse markdown content to AST using remark
    const parseMarkdownToAST = (markdownText) => {
        return unified()
            .use(markdown) // parse the markdown text
            .use(remark2react,
                {
                    createElement: React.createElement,
                    components: customRenderers,
                }) // convert the AST to React components
            .processSync(markdownText).result;
    };

    return (
        <div className="slideshow-container">
            <div className='slideshow-header'>
                <h1 className="slideshow-title">Presentation</h1>
                <Link to="/create" className="btn btn-primary">New Slide</Link>
            </div>
            
            {slide ? (
                <div className='content-area'>
                <div className="slide-content">
                    <div className="slide-header">
                        <h2 className="slide-title">{slide.title}</h2>
                    </div>
                    
                    <div className="markdown-content">
                        {parseMarkdownToAST(slide.content)}
                    </div>
                </div>
                <div className='navigation'>
                        <div className="slide-navigation">
                            <button className="nav-button" onClick={handlePrev}>&#8810;</button>
                            <Link className="create-slide-button" to={`/edit/${slide.id}`}>Edit</Link>
                            <button className="nav-button" onClick={handleNext}>&#8811;</button>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
                        </div>

                        <div className="progress-text">
                            Slide {currentSlide + 1} of {slides.length}
                        </div>
                    </div>
                </div>
                
            ) : (
                <p>Loading slides...</p>
            )}
        </div>
    );
};

export default SlideShow;
