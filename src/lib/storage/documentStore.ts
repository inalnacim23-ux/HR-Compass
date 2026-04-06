import fs from 'fs/promises';
import path from 'path';
import type { DocumentRecord } from '@/types/document';

const METADATA_PATH = path.join(process.cwd(), 'data', 'documents-metadata.json');

async function readMetadata(): Promise<DocumentRecord[]> {
  try {
    const raw = await fs.readFile(METADATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeMetadata(records: DocumentRecord[]): Promise<void> {
  const tmp = METADATA_PATH + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(records, null, 2));
  await fs.rename(tmp, METADATA_PATH);
}

export async function getAllDocuments(): Promise<DocumentRecord[]> {
  return readMetadata();
}

export async function addDocument(record: DocumentRecord): Promise<void> {
  const records = await readMetadata();
  records.push(record);
  await writeMetadata(records);
}

export async function removeDocument(id: string): Promise<DocumentRecord | null> {
  const records = await readMetadata();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  const [removed] = records.splice(idx, 1);
  await writeMetadata(records);
  return removed;
}

export async function getDocument(id: string): Promise<DocumentRecord | null> {
  const records = await readMetadata();
  return records.find((r) => r.id === id) ?? null;
}
