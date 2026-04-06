import { NextRequest } from 'next/server';
import { anthropic } from '@/lib/ai/claude';
import { getRelevantChunks } from '@/lib/ai/contextRetriever';
import { buildPrompt } from '@/lib/ai/promptBuilder';

export async function POST(request: NextRequest) {
  const { answers, language, accessCode } = await request.json();

  if (!answers || !language) {
    return new Response(JSON.stringify({ error: 'Missing answers or language' }), { status: 400 });
  }

  const validCode = process.env.PREMIUM_ACCESS_CODE;
  if (!validCode || accessCode !== validCode) {
    return new Response(JSON.stringify({ error: 'Invalid access code' }), { status: 401 });
  }

  const chunks = await getRelevantChunks(answers);
  const { system, userMessage } = buildPrompt(answers, chunks, language);

  const stream = anthropic.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 16000,
    system,
    messages: [{ role: 'user', content: userMessage }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.enqueue(encoder.encode('\n[DONE]'));
      } catch (err) {
        controller.enqueue(
          encoder.encode(`\n[ERROR] ${err instanceof Error ? err.message : 'Unknown error'}`)
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}
