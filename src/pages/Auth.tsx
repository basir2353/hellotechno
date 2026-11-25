import { ArrowRight, LoaderCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

import { Brand } from '../components/Logo'
import { SITE } from '../data'
import { postJson } from '../lib/api'
import { login, signup } from '../lib/auth'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'

type Mode = 'login' | 'signup'

export function Auth() {
  const { copy } = useLocale()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const mode: Mode = params.get('mode') === 'login' ? 'login' : 'signup'
  const selectedPlan = params.get('plan')
  const selectedCurrency = params.get('currency')
  const selectedDate = params.get('date')
  const selectedTime = params.get('time')
  const selectedIndustry = params.get('industry')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [confirmedRef, setConfirmedRef] = useState('')
  const [busy, setBusy] = useState(false)

  const title = mode === 'login' ? copy.auth.loginTitle : copy.auth.signupTitle
  const body = mode === 'login' ? copy.auth.loginBody : copy.auth.signupBody
  const submit = mode === 'login' ? copy.auth.loginSubmit : copy.auth.signupSubmit

  const setMode = (next: Mode) => {
    setError('')
    setParams(next === 'signup' ? {} : { mode: 'login' }, { replace: true })
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)

    const result =
      mode === 'login'
        ? login({ email, password })
        : signup({ name, email, password })

    if (!result.ok) {
      setBusy(false)
      setError(result.error)
      return
    }

    if (mode === 'signup') {
      try {
        const noteParts = [
          selectedPlan ? `Plan: ${selectedPlan}${selectedCurrency ? ` (${selectedCurrency})` : ''}` : '',
          selectedDate ? `Preferred slot: ${selectedDate}${selectedTime ? ` at ${selectedTime}` : ''}` : '',
        ].filter(Boolean)
        const res = await postJson<{ ok: boolean; reference?: string }>('/api/contact', {
          name: name.trim(),
          email: email.trim(),
          company: selectedPlan ? `Plan: ${selectedPlan}` : 'Demo Request',
          phone: '',
          channel: 'Web Demo',
          message: noteParts.length ? noteParts.join(' · ') : 'Demo & free trial signup',
        })
        if (res.ok && res.data.reference) {
          setBusy(false)
          setConfirmedRef(res.data.reference)
          return
        }
      } catch {
        /* fallback to home navigation */
      }
    }

    setBusy(false)
    navigate('/')
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="absolute -top-24 left-1/4 size-[420px] rounded-full bg-[radial-gradient(circle,#cfe2ff,transparent_65%)] blur-2xl" />
        <div className="absolute right-0 bottom-0 size-[380px] rounded-full bg-[radial-gradient(circle,#e3dbff,transparent_65%)] blur-2xl" />
      </div>

      <div className="w-full max-w-md rounded-[28px] border border-line bg-white/90 p-6 shadow-[var(--shadow-float)] backdrop-blur-xl sm:p-8">
        <Link to="/" className="inline-flex" aria-label={`${SITE.name} home`}>
          <Brand size="sm" />
        </Link>

        <div
          className="mt-6 grid grid-cols-2 rounded-full border border-line bg-soft/70 p-1"
          role="tablist"
          aria-label="Account options"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signup'}
            onClick={() => setMode('signup')}
            className={cx(
              'rounded-full py-2.5 text-[13.5px] font-medium transition-colors',
              mode === 'signup' ? 'bg-white text-ink shadow-[0_8px_18px_-14px_rgb(9_30_74/0.45)]' : 'text-muted hover:text-ink',
            )}
          >
            {copy.auth.signupTab}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            onClick={() => setMode('login')}
            className={cx(
              'rounded-full py-2.5 text-[13.5px] font-medium transition-colors',
              mode === 'login' ? 'bg-white text-ink shadow-[0_8px_18px_-14px_rgb(9_30_74/0.45)]' : 'text-muted hover:text-ink',
            )}
          >
            {copy.auth.loginTab}
          </button>
        </div>

        <h1 className="display mt-6 text-[clamp(1.7rem,1.35rem+1.4vw,2.25rem)] text-ink">{title}</h1>
        <p className="mt-2 text-[14.5px] text-muted">{body}</p>

        {(selectedPlan || selectedDate || selectedIndustry) && mode === 'signup' && (
          <div className="mt-4 flex flex-wrap gap-2 rounded-[14px] border border-brand/20 bg-brand-soft/60 px-3.5 py-2.5 text-[12.5px] font-medium text-brand-deep">
            {selectedIndustry && (
              <span>
                Industry: <strong>{selectedIndustry}</strong>
              </span>
            )}
            {selectedPlan && (
              <span>
                Plan: <strong>{selectedPlan}</strong>
                {selectedCurrency ? ` (${selectedCurrency})` : ''}
              </span>
            )}
            {selectedDate && (
              <span>
                Slot: <strong>{selectedDate}</strong>
                {selectedTime ? ` · ${selectedTime}` : ''}
              </span>
            )}
          </div>
        )}

        {confirmedRef ? (
          <div className="mt-6 rounded-[18px] border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="text-[15px] font-semibold text-emerald-900">Your demo & trial request is confirmed!</p>
            <p className="mt-1 text-[13px] text-emerald-700">
              Reference: <strong>{confirmedRef}</strong> — our team will reach out shortly.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-5 text-[13.5px] font-medium text-white hover:bg-emerald-700"
            >
              Back to home
            </button>
          </div>
        ) : (
        <form onSubmit={onSubmit} className="mt-7 space-y-3" noValidate>
          {mode === 'signup' && (
            <label className="block">
              <span className="text-[12.5px] font-medium text-ink-2">{copy.auth.name}</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 h-12 w-full rounded-[14px] border border-line-strong bg-soft/50 px-3.5 text-[14.5px] text-ink focus:border-brand focus:outline-none"
                placeholder={copy.auth.namePh}
              />
            </label>
          )}

          <label className="block">
            <span className="text-[12.5px] font-medium text-ink-2">{copy.auth.email}</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-[14px] border border-line-strong bg-soft/50 px-3.5 text-[14.5px] text-ink focus:border-brand focus:outline-none"
              placeholder={copy.auth.emailPh}
            />
          </label>

          <label className="block">
            <span className="text-[12.5px] font-medium text-ink-2">{copy.auth.password}</span>
            <input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-[14px] border border-line-strong bg-soft/50 px-3.5 text-[14.5px] text-ink focus:border-brand focus:outline-none"
              placeholder={mode === 'login' ? copy.auth.passwordPhLogin : copy.auth.passwordPhSignup}
            />
          </label>

          {error && <p className="rounded-[12px] bg-red-50 px-3 py-2 text-[13px] text-danger">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-[15px] font-medium text-white transition-[filter,transform] hover:brightness-105 active:scale-[0.98] disabled:opacity-60"
          >
            {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
            {submit}
            {!busy && <ArrowRight className="size-4" aria-hidden />}
          </button>
        </form>
        )}

        <p className="mt-5 text-center text-[13px] text-muted">
          {mode === 'login' ? (
            <>
              {copy.auth.newHere}{' '}
              <button type="button" onClick={() => setMode('signup')} className="font-medium text-brand hover:text-brand-deep">
                {copy.auth.createLink}
              </button>
            </>
          ) : (
            <>
              {copy.auth.haveAccount}{' '}
              <button type="button" onClick={() => setMode('login')} className="font-medium text-brand hover:text-brand-deep">
                {copy.auth.logInLink}
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
