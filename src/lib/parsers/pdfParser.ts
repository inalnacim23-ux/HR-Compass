// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require('pdf-parse');

export interface ParsedDocument {
  text: string;
  pageCount: number;
}

export async function parsePdf(buffer: Buffer): Promise<ParsedDocument> {
  const data = await pdfParse(buffer);
  const text = data.text
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return { text, pageCount: data.numpages };
}
