'use client';

import { STEPS } from '@/lib/questionnaire/steps';

interface Props {
  currentStep: number;
  lang: 'fr' | 'en';
}

export default function StepNavigator({ currentStep, lang }: Props) {
  const pct = Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
            {currentStep + 1}
          </span>
          <span className="text-sm font-semibold text-slate-800">
            {lang === 'fr' ? STEPS[currentStep].titleFr : STEPS[currentStep].titleEn}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {pct}% {lang === 'fr' ? 'complété' : 'completed'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="flex justify-between mt-3">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            title={lang === 'fr' ? s.titleFr : s.titleEn}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < currentStep
                ? 'bg-blue-500'
                : i === currentStep
                ? 'bg-indigo-600 ring-2 ring-indigo-200 scale-125'
                : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
