import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { getCopy, type Copy, type Locale } from '../i18n/copy'
import { cx } from './cx'

const STORAGE_KEY = 'hello-techno-locale'

type LocaleCtx = {
  locale: Locale
  setLocale: (next: Locale) => void
  dir: 'ltr' | 'rtl'
  copy: Copy
}

const LocaleContext = createContext<LocaleCtx | null>(null)

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'ar' || raw === 'en') return raw
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === 'undefined' ? 'en' : readStoredLocale(),
  )

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      setLocale,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      copy: getCopy(locale),
    }),
    [locale, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}

/** EN | العربية pill toggle for the navbar */
export function LangToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale()

  return (
    <div
      className={cx(
        'inline-flex items-center rounded-full border border-line-strong bg-white p-0.5 shadow-[0_6px_16px_-12px_rgb(9_30_74/0.35)]',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={cx(
          'rounded-full px-2.5 py-1.5 text-[12px] font-semibold tracking-wide transition-colors',
          locale === 'en' ? 'bg-soft text-ink shadow-[0_4px_10px_-6px_rgb(9_30_74/0.35)]' : 'text-muted hover:text-ink',
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('ar')}
        aria-pressed={locale === 'ar'}
        className={cx(
          'rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition-colors',
          locale === 'ar' ? 'bg-soft text-ink shadow-[0_4px_10px_-6px_rgb(9_30_74/0.35)]' : 'text-muted hover:text-ink',
        )}
      >
        العربية
      </button>
    </div>
  )
}
