import { unified } from 'unified';
import remarkParse from 'remark-parse';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or any style you prefer

function renderNode(node, index) {
  switch (node.type) {
    case 'text':
      return node.value;
    case 'paragraph':
      return <p key={index}>{node.children.map(renderNode)}</p>;
    case 'heading':
      const HeadingTag = `h${node.depth}`;
      return <HeadingTag key={index}>{node.children.map(renderNode)}</HeadingTag>;
    case 'emphasis':
      return <em key={index}>{node.children.map(renderNode)}</em>;
    case 'strong':
      return <strong key={index}>{node.children.map(renderNode)}</strong>;
    case 'list':
      const ListTag = node.ordered ? 'ol' : 'ul';
      return (
        <ListTag key={index}>
          {node.children.map(renderNode)}
        </ListTag>
      );
    case 'listItem':
      return <li key={index}>{node.children.map(renderNode)}</li>;
    case 'inlineCode':
      return <code key={index}>{node.value}</code>;
    case 'code':
      const highlighted = hljs.highlight(node.lang || 'plaintext', node.value).value;
      return (
        <pre key={index}>
          <code
            className={`hljs ${node.lang}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      );
    case 'blockquote':
      return <blockquote key={index}>{node.children.map(renderNode)}</blockquote>;
    case 'thematicBreak':
      return <hr key={index} />;
    case 'link':
      return (
        <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
          {node.children.map(renderNode)}
        </a>
      );
    default:
      return null;
  }
}

export default function MarkdownRenderer({ markdown, className }) {
  const tree = unified().use(remarkParse).parse(markdown);

  return <div className={className}>{tree.children.map(renderNode)}</div>;
}
