'use client';

import type { DocumentRecord } from '@/types/document';

interface Props {
  doc: DocumentRecord;
  onDelete: (id: string) => void;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentCard({ doc, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600 font-bold text-xs uppercase">
          {doc.extension}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{doc.label}</p>
          <p className="text-sm text-gray-500">
            {formatBytes(doc.sizeBytes)}
            {doc.pageCount ? ` · ${doc.pageCount} pages` : ''}
            {` · ${doc.chunkCount} chunks`}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(doc.id)}
        className="ml-4 flex-shrink-0 text-sm text-red-500 hover:text-red-700 transition-colors"
      >
        Supprimer
      </button>
    </div>
  );
}
