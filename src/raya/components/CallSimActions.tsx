import type { CallSimStatus } from '../lib/useVoiceSim'
import { IconPhone } from './Icons'

export function CallSimActions({
  en,
  status,
  errorMsg,
  voiceName,
  accent,
  phone,
  onCall,
  onStop,
  onBrowserTalk,
  browserLabel,
  withDivider = false,
}: {
  en: boolean
  status: CallSimStatus
  errorMsg: string
  voiceName: string
  accent: string
  phone: string
  onCall: () => void
  onStop: () => void
  onBrowserTalk?: () => void
  browserLabel?: string
  withDivider?: boolean
}) {
  return (
    <div className="hp-agent-actions">
      {status === 'ringing' || status === 'connected' ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[13px] font-semibold text-emerald-700">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            {status === 'ringing'
              ? en
                ? `Ringing ${phone}…`
                : `جارٍ الاتصال بـ ${phone}…`
              : en
                ? `Connected · ${voiceName} (${accent})`
                : `متصل · ${voiceName} (${accent})`}
          </span>
          <button
            type="button"
            onClick={onStop}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-[13px] font-semibold text-rose-600 transition-colors hover:bg-rose-100"
          >
            {en ? 'End call' : 'إنهاء المكالمة'}
          </button>
        </div>
      ) : (
        <button type="button" className="btn-primary" onClick={onCall}>
          <IconPhone className="h-4 w-4" />
          {en ? 'Call me now →' : 'اتصل بي الآن ←'}
        </button>
      )}

      {status === 'error' && errorMsg ? (
        <p className="text-[12.5px] font-medium text-rose-600">{errorMsg}</p>
      ) : (
        <p className="hp-agent-note">
          {en ? 'Rings in ~10s · one call only · EN / العربية' : 'يرن خلال ~10 ث · مكالمة واحدة · EN / العربية'}
        </p>
      )}

      {onBrowserTalk && browserLabel ? (
        withDivider ? (
          <div className="rcb-or-sep">
            <span />
            <button type="button" className="ad-browser-link" onClick={onBrowserTalk}>
              {browserLabel}
            </button>
            <span />
          </div>
        ) : (
          <button type="button" className="ad-browser-link" onClick={onBrowserTalk}>
            {browserLabel}
          </button>
        )
      ) : null}
    </div>
  )
}
