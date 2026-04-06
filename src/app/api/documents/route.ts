import { NextRequest, NextResponse } from 'next/server';
import { getAllDocuments, removeDocument } from '@/lib/storage/documentStore';
import { deleteFile, deleteChunks } from '@/lib/storage/fileStore';

export async function GET() {
  const documents = await getAllDocuments();
  return NextResponse.json(documents);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const removed = await removeDocument(id);
  if (!removed) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  await Promise.all([
    deleteFile(`${id}.${removed.extension}`),
    deleteChunks(id),
  ]);

  return NextResponse.json({ success: true });
}
