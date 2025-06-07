// import { Link } from "react-router-dom";
import './slideheader.css';

export const SlideHeader = () => (
    <div className='slideshow-header'>
        <h1 className="slideshow-title">MarkdownPPT</h1>
        <a href="/create">New Slide</a>
    </div>
);

SlideHeader.propTypes = {};
