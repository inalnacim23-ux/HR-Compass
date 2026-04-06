'use client';

import type { DocumentRecord } from '@/types/document';
import DocumentCard from './DocumentCard';

interface Props {
  documents: DocumentRecord[];
  onDelete: (id: string) => void;
}

export default function DocumentList({ documents, onDelete }: Props) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">Aucun document uploadé</p>
        <p className="text-sm mt-1">Ajoutez vos documents de recherche pour alimenter le diagnostic IA.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} doc={doc} onDelete={onDelete} />
      ))}
    </div>
  );
}
