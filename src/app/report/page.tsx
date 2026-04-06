'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useStreamingReport } from '@/hooks/useStreamingReport';
import { useLanguage } from '@/hooks/useLanguage';
import ReportViewer from '@/components/report/ReportViewer';
import PDFExportButton from '@/components/report/PDFExportButton';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

function DemoBanner({ lang }: { lang: 'fr' | 'en' }) {
  const router = useRouter();
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-xs font-semibold">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {lang === 'fr' ? 'Mode Démo' : 'Demo Mode'}
          </span>
        </div>
        <p className="text-sm text-amber-800">
          {lang === 'fr'
            ? 'Ce rapport est généré gratuitement à partir de la Boîte à outils RH OBNL. La version Premium offre un diagnostic complet, ancré dans la recherche scientifique et personnalisé par l\'IA.'
            : 'This report is generated for free from the NPO HR Toolkit. The Premium version offers a complete diagnostic grounded in scientific research and personalized by AI.'}
        </p>
      </div>
      <button
        onClick={() => router.push('/diagnostic')}
        className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {lang === 'fr' ? 'Obtenir la version complète' : 'Get the full version'}
      </button>
    </div>
  );
}

function ReportContent() {
  const { lang } = useLanguage();
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get('session');
  const { text, isDone, error, mode } = useStreamingReport(sessionId);

  const rawPayload =
    typeof window !== 'undefined' && sessionId
      ? sessionStorage.getItem(`report_${sessionId}`)
      : null;
  const payload = rawPayload ? JSON.parse(rawPayload) : null;
  const orgName = payload?.answers?.orgName ?? (lang === 'fr' ? 'Organisation' : 'Organization');

  if (!sessionId) {
    return (
      <div className="text-center py-20 text-gray-500">
        {lang === 'fr' ? 'Session invalide.' : 'Invalid session.'}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/diagnostic')}
          className="text-blue-600 hover:underline text-sm"
        >
          {lang === 'fr' ? 'Recommencer le diagnostic' : 'Restart diagnostic'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
    <div className="max-w-3xl mx-auto px-4 py-8">
      {mode === 'demo' && isDone && <DemoBanner lang={lang} />}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {lang === 'fr' ? 'Diagnostic RH' : 'HR Diagnostic'}
            </h1>
            {mode === 'demo' && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-xs font-medium">
                Démo
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{orgName}</p>
        </div>
        <div className="flex items-center gap-3">
          {isDone && text && (
            <PDFExportButton reportText={text} orgName={orgName} lang={lang} />
          )}
          <button
            onClick={() => router.push('/diagnostic')}
            className="text-sm text-gray-500 hover:text-gray-800 border border-gray-300 rounded-lg px-3 py-2 transition-colors"
          >
            {lang === 'fr' ? 'Nouveau diagnostic' : 'New diagnostic'}
          </button>
        </div>
      </div>

      <ReportViewer text={text} isDone={isDone} lang={lang} />
    </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>}>
      <ReportContent />
    </Suspense>
  );
}
