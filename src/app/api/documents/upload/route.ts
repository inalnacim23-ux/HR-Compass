import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { parsePdf } from '@/lib/parsers/pdfParser';
import { parseDocx } from '@/lib/parsers/docxParser';
import { chunkText } from '@/lib/parsers/textChunker';
import { saveFile, saveChunks } from '@/lib/storage/fileStore';
import { addDocument } from '@/lib/storage/documentStore';
import type { DocumentRecord, DocumentExtension } from '@/types/document';

const MAX_SIZE_MB = Number(process.env.MAX_DOCUMENT_SIZE_MB ?? 20);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const label = (formData.get('label') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const sizeBytes = file.size;
    if (sizeBytes > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_SIZE_MB}MB)` },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const ext = originalName.split('.').pop()?.toLowerCase();

    if (ext !== 'pdf' && ext !== 'docx') {
      return NextResponse.json(
        { error: 'Only PDF and DOCX files are supported' },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const buffer = Buffer.from(await file.arrayBuffer());

    let parsedText = '';
    let pageCount: number | undefined;

    try {
      if (ext === 'pdf') {
        const result = await parsePdf(buffer);
        parsedText = result.text;
        pageCount = result.pageCount;
      } else {
        const result = await parseDocx(buffer);
        parsedText = result.text;
      }
    } catch (parseErr) {
      console.warn('[upload] Parse warning (file saved anyway):', parseErr);
      parsedText = '';
    }

    await saveFile(buffer, `${id}.${ext}`);

    const chunks = chunkText(parsedText, id, label || originalName);
    await saveChunks(id, chunks);

    const record: DocumentRecord = {
      id,
      filename: originalName,
      label: label || originalName,
      extension: ext as DocumentExtension,
      sizeBytes,
      pageCount,
      chunkCount: chunks.length,
      uploadedAt: new Date().toISOString(),
      language: 'mixed',
    };

    await addDocument(record);

    return NextResponse.json(record);
  } catch (err) {
    console.error('[upload] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
