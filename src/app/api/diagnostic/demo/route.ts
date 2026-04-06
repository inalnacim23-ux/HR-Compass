import { NextRequest, NextResponse } from 'next/server';
import { generateDemoReport } from '@/lib/ai/demoReportGenerator';

export async function POST(request: NextRequest) {
  try {
    const { answers, language } = await request.json();

    if (!answers || !language) {
      return NextResponse.json({ error: 'Missing answers or language' }, { status: 400 });
    }

    const report = generateDemoReport(answers, language as 'fr' | 'en');

    return NextResponse.json({ report });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
