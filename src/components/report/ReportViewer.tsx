'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReportSection from './ReportSection';
import StreamingIndicator from './StreamingIndicator';

interface Props {
  text: string;
  isDone: boolean;
  lang: 'fr' | 'en';
}

interface Section {
  title: string;
  content: string;
}

function parseSections(text: string): Section[] {
  const lines = text.split('\n');
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current);
      current = { title: line.replace('## ', '').trim(), content: '' };
    } else if (current) {
      current.content += line + '\n';
    }
  }
  if (current) sections.push(current);
  return sections;
}

export default function ReportViewer({ text, isDone, lang }: Props) {
  const sections = parseSections(text);
  const hasSections = sections.length > 0;

  return (
    <div>
      {!isDone && <StreamingIndicator lang={lang} />}

      {hasSections ? (
        <div>
          {sections.map((section, i) => {
            const isLastAndStreaming = !isDone && i === sections.length - 1;
            return (
              <ReportSection
                key={i}
                title={section.title}
                content={
                  isLastAndStreaming
                    ? section.content + '▌'
                    : section.content
                }
              />
            );
          })}
        </div>
      ) : (
        text && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5
            prose prose-slate prose-sm max-w-none
            prose-headings:text-slate-800 prose-p:text-slate-700 prose-p:leading-relaxed
            prose-li:text-slate-700 prose-strong:text-slate-900 prose-strong:font-semibold
            prose-table:text-slate-700 prose-th:bg-slate-50 prose-td:border-slate-200
            prose-blockquote:border-blue-300 prose-blockquote:text-slate-600
            prose-hr:border-slate-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text + (!isDone ? '▌' : '')}</ReactMarkdown>
          </div>
        )
      )}
    </div>
  );
}
