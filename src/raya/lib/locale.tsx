import { useLocale as useSiteLocale } from '../../lib/locale'
import { messages } from './i18n'

export function useLocale() {
  const { locale, setLocale, dir } = useSiteLocale()
  const t = messages[locale]
  return { locale, setLocale, dir, t }
}
