// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remark2react from 'remark-react';
import api from '../api/axios';
import { SlideHeader } from '../components/SlideHeader';
import SlideContent from '../components/SlideContent';
import ProgressBar from '../components/ProgressBar';
import ProgressText from '../components/ProgressText';
import SlideNavigation from '../components/SlideNavigation';

const Home = () => {
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

    // Parse markdown content to AST using remark
    const parseMarkdownToAST = (markdownText) => {
        return unified()
            .use(markdown) // parse the markdown text
            .use(remark2react,
                {
                    createElement: React.createElement,
                }) // convert the AST to React components
            .processSync(markdownText).result;
    };

    return (
        <div className="slideshow-container">
            <SlideHeader />

            {slide ? (
                <div className='content-area'>
                    <SlideContent slide={slide} parseMarkdownToAST={parseMarkdownToAST} />
                    <div className='navigation'>
                        <SlideNavigation slide={slide} handleNext={handleNext} handlePrev={handlePrev} />
                        <ProgressBar currentSlide={currentSlide} slides={slides} />
                        <ProgressText currentSlide={currentSlide} slides={slides} />
                    </div>
                </div>

            ) : (
                <p>Loading slides...</p>
            )}
        </div>
    );
};

export default Home;
