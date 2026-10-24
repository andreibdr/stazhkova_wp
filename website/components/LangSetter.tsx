'use client';

import { useEffect } from 'react';

export default function LangSetter({ lang }: { lang: 'ru' | 'en' | 'es' }) {
  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
