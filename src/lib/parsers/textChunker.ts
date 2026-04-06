import { v4 as uuidv4 } from 'uuid';
import type { TextChunk } from '@/types/document';

const TARGET_CHUNK_CHARS = 3200;

export function chunkText(
  text: string,
  documentId: string,
  documentName: string
): TextChunk[] {
  const paragraphs = text.split(/\n\n+/);
  const chunks: TextChunk[] = [];

  let currentChunk = '';
  let currentStart = 0;
  let charPos = 0;
  let chunkIndex = 0;

  for (const para of paragraphs) {
    const paraWithBreak = para + '\n\n';

    if (
      currentChunk.length > 0 &&
      currentChunk.length + paraWithBreak.length > TARGET_CHUNK_CHARS
    ) {
      chunks.push({
        id: uuidv4(),
        documentId,
        documentName,
        index: chunkIndex++,
        text: currentChunk.trim(),
        charStart: currentStart,
        charEnd: currentStart + currentChunk.length,
      });
      currentStart = charPos;
      currentChunk = '';
    }

    currentChunk += paraWithBreak;
    charPos += paraWithBreak.length;
  }

  if (currentChunk.trim().length > 0) {
    chunks.push({
      id: uuidv4(),
      documentId,
      documentName,
      index: chunkIndex,
      text: currentChunk.trim(),
      charStart: currentStart,
      charEnd: currentStart + currentChunk.length,
    });
  }

  return chunks;
}
