// src/components/Home.js
import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import ProgressBar from '../components/ProgressBar';
import ProgressText from '../components/ProgressText';
import SlideControls from '../components/SlideControls';
import MarkdownRenderer from '../components/MarkdownRenderer';

const Home = () => {
    const [slides, setSlides] = useState([]);
    const [slideData, setSlideData] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mdText, setMdText] = useState('');
    const [stashedSlides, setStash] = useState([])
    const [legend, setLegend] = useState([]);
    const [fullScreenMode, setFullScreenMode] = useState(false);

    const mdEditor = useRef(null);
    const slideAreaRef = useRef(null);

    useEffect(() => {
        // Fetch slides from backend using Axios
        api.get('/slides')
            .then((response) => {
                // fetch first slide by default
                setSlideData(response.data[0]);
                handleEditorChange(response.data[0].content);
            })
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

    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullScreenMode(document.fullscreenElement === slideAreaRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

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

    const handleSave = () => {
        api.put(`/slides/${slideData.id}`, { title: slideData.title, content: mdText, layout: slideData.layout })
            .then(() => alert('Slides are saved!'))
            .catch((error) => console.error("Error saving slide:", error));
    }

    let currentSlides = slides;
    let nav = legend;

    const handleEditorChange = (text) => {
        setStash(currentSlides)
        let lines = text.split('\n')
        let legend = []
        let sections = []
        let currentSection = []

        lines.forEach((line, index) => {

            if (((line.startsWith('# ') || line.startsWith('## ')) && (currentSection.length > 0))) {
                legend.push(line)
                sections.push(currentSection.join('\n'))
                currentSection = [line]
            } else if (((line.startsWith('# ') || line.startsWith('## ')) && (currentSection.length === 0))) {
                legend.push(line)
                currentSection = [line]
            } else {
                currentSection.push(line)
            }

            if (index === lines.length - 1) {
                sections.push(currentSection.join('\n'))
            }
        })

        setSlides(sections)
        setLegend(legend)
        setMdText(text)
    }

    function createSlide() {
        const newSlide = '\n\n## New Slide\nAdd slide content here';
        mdEditor.current.value = mdText + newSlide
        handleEditorChange(mdText + newSlide)
    }

    const handleFullScreen = () => {
        if (slideAreaRef.current.requestFullscreen) {
            slideAreaRef.current.requestFullscreen();
        } else if (slideAreaRef.current.webkitRequestFullscreen) { // Safari
            slideAreaRef.current.webkitRequestFullscreen();
        } else if (slideAreaRef.current.msRequestFullscreen) { // IE11
            slideAreaRef.current.msRequestFullscreen();
        }
    };

    const handleExitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    return (
        <>
            <header>
                <h2>MarkdownPPT</h2>
            </header>
            <main>
                <nav>
                    <ol>
                        {nav.map((title, index) => (
                            <li key={index} onClick={() => setCurrentSlide(index)}>
                                <MarkdownRenderer markdown={title} className={(currentSlide === index) ? ('current-slide title') : 'title'} key={index} />
                            </li>
                        ))}
                    </ol>
                    <div className="button-container">
                    </div>
                </nav>
                <div className="slideshow-container" ref={slideAreaRef}>
                    <SlideControls
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        createSlide={createSlide}
                        saveSlide={handleSave}
                        enterFullScreen={handleFullScreen}
                        exitFullScreen={handleExitFullScreen}
                        fullScreenMode={fullScreenMode} />
                    <div className='content-area'>
                        <MarkdownRenderer markdown={currentSlides[currentSlide]} />
                        <div className='navigation'>
                            <ProgressBar currentSlide={currentSlide} slides={slides} />
                            <ProgressText currentSlide={currentSlide} slides={slides} />
                        </div>
                    </div>
                </div>
                <div className="md-editor">
                    <textarea
                        ref={mdEditor}
                        id="md-content"
                        value={mdText}
                        onChange={(e) => handleEditorChange(e.target.value)}
                        minLength={20}
                        required
                    />
                </div>
            </main>
        </>
    );
};

export default Home;
