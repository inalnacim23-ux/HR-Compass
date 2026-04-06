export type DocumentExtension = 'pdf' | 'docx';

export interface DocumentRecord {
  id: string;
  filename: string;
  label: string;
  extension: DocumentExtension;
  sizeBytes: number;
  pageCount?: number;
  chunkCount: number;
  uploadedAt: string;
  language: 'fr' | 'en' | 'mixed';
}

export interface TextChunk {
  id: string;
  documentId: string;
  documentName: string;
  index: number;
  text: string;
  charStart: number;
  charEnd: number;
}
