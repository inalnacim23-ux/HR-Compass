'use client';

import { useState, useEffect } from 'react';

interface StreamingState {
  text: string;
  isDone: boolean;
  error: string | null;
  mode: 'demo' | 'premium' | null;
}

export function useStreamingReport(sessionId: string | null) {
  const [state, setState] = useState<StreamingState>({
    text: '',
    isDone: false,
    error: null,
    mode: null,
  });

  useEffect(() => {
    if (!sessionId) return;

    const raw = sessionStorage.getItem(`report_${sessionId}`);
    if (!raw) {
      setState((s) => ({ ...s, error: 'Session not found', isDone: true }));
      return;
    }

    const payload = JSON.parse(raw);
    const mode: 'demo' | 'premium' = payload.mode ?? 'premium';
    setState((s) => ({ ...s, mode }));

    let cancelled = false;

    async function fetchDemo() {
      try {
        const res = await fetch('/api/diagnostic/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: payload.answers, language: payload.language }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!cancelled) {
          setState({ text: data.report, isDone: true, error: null, mode: 'demo' });
        }
      } catch (err) {
        if (!cancelled) {
          setState((s) => ({
            ...s,
            error: err instanceof Error ? err.message : 'Unknown error',
            isDone: true,
          }));
        }
      }
    }

    async function fetchStream() {
      try {
        const res = await fetch('/api/diagnostic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: payload.answers, language: payload.language }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (!cancelled) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          if (accumulated.includes('[DONE]')) {
            const cleaned = accumulated.replace('[DONE]', '');
            setState({ text: cleaned, isDone: true, error: null, mode: 'premium' });
            break;
          }

          if (accumulated.includes('[ERROR]')) {
            const errMsg = accumulated.split('[ERROR]')[1]?.trim() ?? 'Unknown error';
            setState((s) => ({ ...s, error: errMsg, isDone: true }));
            break;
          }

          setState((s) => ({ ...s, text: accumulated }));
        }
      } catch (err) {
        if (!cancelled) {
          setState((s) => ({
            ...s,
            error: err instanceof Error ? err.message : 'Unknown error',
            isDone: true,
          }));
        }
      }
    }

    if (mode === 'demo') {
      fetchDemo();
    } else {
      fetchStream();
    }

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  return state;
}
