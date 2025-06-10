import matter from "gray-matter";
import TitleSlide from "./TitleLayout";
import DefaultSlide from "./DefaultLayout";
import MarkdownRenderer from "./MarkdownRenderer";
import TitleOnlyLayout from "./TitleOnlyLayout";
import BlankSlide from "./BlankLayout";

function preprocessForGrayMatter(text) {
    // Find the first YAML block
    const yamlRegex = /^---\s*\n([\s\S]*?)\n---\s*$/m;
    const match = text.match(yamlRegex);

    if (!match) {
        return { data: {}, content: text };
    }

    // Extract the YAML block and remove it from content
    const yamlBlock = match[0];
    const contentWithoutYaml = text.replace(yamlBlock, '').trim();

    // Create new text with YAML at the beginning
    const processedText = yamlBlock + '\n\n' + contentWithoutYaml;

    // Now use gray-matter normally
    return processedText;
}

export const SlideRenderer = ({ slide }) => {
    if (slide) {
        const mdParsed = matter(preprocessForGrayMatter(slide));
        switch (mdParsed.data.layout) {
            case 'blank':
                return <BlankSlide><MarkdownRenderer markdown={mdParsed.content} /></BlankSlide>;
            case 'title':
                return <TitleSlide><MarkdownRenderer markdown={mdParsed.content} /></TitleSlide>;
            case 'title-only':
                return <TitleOnlyLayout><MarkdownRenderer markdown={mdParsed.content} /></TitleOnlyLayout>;
            default:
                return <DefaultSlide><MarkdownRenderer markdown={mdParsed.content} /></DefaultSlide>;
        }
    } else {
        return <></>;
    }
};

