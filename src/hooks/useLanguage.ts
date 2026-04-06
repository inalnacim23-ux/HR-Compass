'use client';

import { useState, useEffect, useCallback } from 'react';
import fr from '@/i18n/fr';
import en from '@/i18n/en';
import type { Translations } from '@/i18n/fr';

type Lang = 'fr' | 'en';

function getCookieLang(): Lang {
  if (typeof document === 'undefined') return 'fr';
  const match = document.cookie.match(/(?:^|;)\s*lang=([^;]+)/);
  return (match?.[1] as Lang) ?? 'fr';
}

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    setLangState(getCookieLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    document.cookie = `lang=${l};path=/;max-age=31536000`;
    setLangState(l);
  }, []);

  const t: Translations = lang === 'fr' ? fr : en;

  return { lang, setLang, t };
}
