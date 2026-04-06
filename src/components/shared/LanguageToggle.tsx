'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      className="text-xs font-semibold text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-md px-2.5 py-1.5 transition-all"
    >
      {lang === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
