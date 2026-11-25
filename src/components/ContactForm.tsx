import { ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { SITE } from '../data'
import { postJson } from '../lib/api'
import { cx } from '../lib/cx'
import { validateContact, type FieldErrors } from '../shared/validation'

const initial = { name: '', company: '', email: '', phone: '', message: '' }

const fields = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Layla Haddad', required: true, half: true },
  { name: 'company', label: 'Business', type: 'text', placeholder: 'Al Bandar Collection', required: false, half: true },
  { name: 'email', label: 'Work email', type: 'email', placeholder: 'you@company.com', required: true, half: true },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+974 ...', required: false, half: true },
] as const

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>(initial)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [reference, setReference] = useState('')
  const [failure, setFailure] = useState('')

  const set = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: '' }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFailure('')
    const local = validateContact(values)
    setErrors(local)
    if (Object.keys(local).length) return

    setStatus('sending')
    const result = await postJson<{ reference?: string; ok?: boolean }>('/api/contact', values)
    if (result.ok && typeof result.data.reference === 'string' && result.data.reference) {
      setReference(result.data.reference)
      setStatus('sent')
      setValues(initial)
      return
    }
    if (result.ok) {
      setStatus('idle')
      setFailure('Something went wrong. Please try again or email us directly.')
      return
    }
    setStatus('idle')
    setFailure(result.error)
    if (result.fieldErrors) setErrors(result.fieldErrors)
  }

  if (status === 'sent') {
    const waText = encodeURIComponent(
      `Hi Hello Techno — I'd like to book a free demo. Reference ${reference}.`,
    )
    return (
      <div className="flex h-full flex-col justify-center rounded-[26px] border border-white/15 bg-white/[0.06] p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-teal/20 text-teal">
          <Check className="size-6" aria-hidden />
        </span>
        <h3 className="display mt-5 text-[1.6rem] text-white">Demo request booked.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[14.5px] text-night-muted">
          Thanks — your request is in. A person from Hello Techno will reply within one working day. Reference{' '}
          <span className="font-medium text-white">{reference}</span>.
        </p>
        <div className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <a
            href={`${SITE.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-[#25D366] px-4 text-[13.5px] font-medium text-white"
          >
            Confirm on WhatsApp
          </a>
          <a
            href={SITE.phoneHref}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-white/20 px-4 text-[13.5px] font-medium text-white"
          >
            Call {SITE.phone}
          </a>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[26px] border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="flex flex-col gap-1.5">
            <span className="text-[12.5px] font-medium text-white/70">
              {f.label}
              {!f.required && <span className="text-white/35"> (optional)</span>}
            </span>
            <input
              name={f.name}
              type={f.type}
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              aria-invalid={Boolean(errors[f.name]) || undefined}
              aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
              className={cx(
                'h-11 rounded-[12px] border bg-white/[0.06] px-3 text-[14.5px] text-white placeholder:text-white/30 transition-colors duration-[var(--duration-fast)] focus:outline-none',
                errors[f.name] ? 'border-red-400/70' : 'border-white/15 focus:border-white/45',
              )}
            />
            {errors[f.name] && (
              <span id={`${f.name}-error`} className="text-[12px] text-red-300">
                {errors[f.name]}
              </span>
            )}
          </label>
        ))}

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[12.5px] font-medium text-white/70">What do you want to run on it?</span>
          <textarea
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="Three hotels in Doha, WhatsApp and phone, English and Arabic, bookings into OPERA…"
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={cx(
              'resize-none rounded-[12px] border bg-white/[0.06] px-3 py-2.5 text-[14.5px] text-white placeholder:text-white/30 transition-colors duration-[var(--duration-fast)] focus:outline-none',
              errors.message ? 'border-red-400/70' : 'border-white/15 focus:border-white/45',
            )}
          />
          {errors.message && (
            <span id="message-error" className="text-[12px] text-red-300">
              {errors.message}
            </span>
          )}
        </label>
      </div>

      {failure && <p className="mt-3 rounded-[10px] bg-red-400/10 px-3 py-2 text-[12.5px] text-red-200">{failure}</p>}

      <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="max-w-[16rem] text-[11.5px] leading-snug text-white/40">
          We reply within one working day. No sequences, no spam.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink transition-[background-color,transform] duration-[var(--duration-fast)] hover:bg-white/90 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
        >
          {status === 'sending' ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
          {status === 'sending' ? 'Sending' : 'Request a demo'}
          {status !== 'sending' && <ArrowRight className="size-4" aria-hidden />}
        </button>
      </div>
    </form>
  )
}
