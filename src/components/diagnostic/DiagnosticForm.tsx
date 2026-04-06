'use client';

import { useRouter } from 'next/navigation';
import { useFormState } from '@/hooks/useFormState';
import { useLanguage } from '@/hooks/useLanguage';
import { STEPS } from '@/lib/questionnaire/steps';
import StepNavigator from './StepNavigator';
import FormField from './FormField';

export default function DiagnosticForm() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const {
    sessionId,
    currentStep,
    answers,
    setFieldValue,
    nextStep,
    prevStep,
    isLastStep,
    validateStep,
    clearStorage,
  } = useFormState(lang);

  const step = STEPS[currentStep];
  const isValid = validateStep(currentStep);

  function handleSubmit(mode: 'demo' | 'premium') {
    const payload = { sessionId, answers, language: lang, mode };
    sessionStorage.setItem(`report_${sessionId}`, JSON.stringify(payload));
    clearStorage();
    router.push(`/report?session=${sessionId}`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 py-6 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-white font-semibold text-lg mb-1">
            {lang === 'fr' ? 'Diagnostic RH — OBNL' : 'HR Diagnostic — NPO'}
          </h1>
          <StepNavigator currentStep={currentStep} lang={lang} />
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Card header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              {lang === 'fr' ? step.titleFr : step.titleEn}
            </h2>
            {(step.descriptionFr || step.descriptionEn) && (
              <p className="text-sm text-slate-500 mt-1">
                {lang === 'fr' ? step.descriptionFr : step.descriptionEn}
              </p>
            )}
          </div>

          {/* Fields */}
          <div className="px-6 py-6 space-y-6">
            {step.fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={answers[field.id]}
                onChange={(val) => setFieldValue(field.id, val)}
                lang={lang}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg disabled:opacity-30 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              {t.form.previous}
            </button>

            {isLastStep ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => handleSubmit('demo')}
                  disabled={!isValid}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg disabled:opacity-40 hover:bg-slate-50 transition-all"
                >
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {lang === 'fr' ? 'Essai gratuit (Démo)' : 'Free trial (Demo)'}
                </button>
                <button
                  onClick={() => handleSubmit('premium')}
                  disabled={!isValid}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg disabled:opacity-40 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-sm shadow-blue-500/20"
                >
                  {t.form.submit}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={nextStep}
                disabled={!isValid}
                className="inline-flex items-center gap-1.5 px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg disabled:opacity-40 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-sm shadow-blue-500/20"
              >
                {t.form.next}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
