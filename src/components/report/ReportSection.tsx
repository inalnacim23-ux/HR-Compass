'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  title: string;
  content: string;
}

export default function ReportSection({ title, content }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-slate-50 transition-colors text-left border-b border-slate-100"
      >
        <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
        <span className="text-slate-400 text-sm ml-4 flex-shrink-0">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-white prose prose-slate prose-sm max-w-none
          prose-headings:text-slate-800 prose-headings:font-semibold
          prose-p:text-slate-700 prose-p:leading-relaxed
          prose-li:text-slate-700
          prose-strong:text-slate-900 prose-strong:font-semibold
          prose-table:text-slate-700 prose-th:text-slate-800 prose-th:bg-slate-50
          prose-td:text-slate-700 prose-td:border-slate-200
          prose-blockquote:text-slate-600 prose-blockquote:border-blue-300
          prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
          prose-hr:border-slate-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
