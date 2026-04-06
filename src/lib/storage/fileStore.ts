import fs from 'fs/promises';
import path from 'path';

const DOCUMENTS_DIR = path.join(process.cwd(), 'data', 'documents');

export async function saveFile(buffer: Buffer, filename: string): Promise<void> {
  await fs.mkdir(DOCUMENTS_DIR, { recursive: true });
  await fs.writeFile(path.join(DOCUMENTS_DIR, filename), buffer);
}

export async function deleteFile(filename: string): Promise<void> {
  const filePath = path.join(DOCUMENTS_DIR, filename);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may not exist
  }
}

export async function readChunks(documentId: string) {
  const chunksPath = path.join(DOCUMENTS_DIR, `${documentId}.chunks.json`);
  const raw = await fs.readFile(chunksPath, 'utf-8');
  return JSON.parse(raw);
}

export async function saveChunks(documentId: string, chunks: unknown[]): Promise<void> {
  const chunksPath = path.join(DOCUMENTS_DIR, `${documentId}.chunks.json`);
  await fs.writeFile(chunksPath, JSON.stringify(chunks, null, 2));
}

export async function deleteChunks(documentId: string): Promise<void> {
  const chunksPath = path.join(DOCUMENTS_DIR, `${documentId}.chunks.json`);
  try {
    await fs.unlink(chunksPath);
  } catch {
    // File may not exist
  }
}
