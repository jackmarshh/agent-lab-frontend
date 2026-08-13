import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** 助手消息的 Markdown 渲染，独立成 chunk 按需加载。 */
export function MarkdownContent({ content }: { content: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
}
