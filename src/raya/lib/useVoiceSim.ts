import { useEffect, useRef, useState } from 'react'

export type CallSimStatus = 'idle' | 'error' | 'ringing' | 'connected'

export function useVoiceSim() {
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(true)
  const [status, setStatus] = useState<CallSimStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const triggerCall = (opts: {
    locale: 'en' | 'ar'
    accent: string
    voice: string
    greetingEn: string
    greetingAr: string
  }) => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 6) {
      setStatus('error')
      setErrorMsg(
        opts.locale === 'ar'
          ? 'يرجى إدخال رقم هاتف صحيح أولاً (مثال: 31637274 974+).'
          : 'Please enter a valid phone number first (e.g. +974 3163 7274).',
      )
      return
    }
    if (!agreed) {
      setStatus('error')
      setErrorMsg(
        opts.locale === 'ar'
          ? 'يرجى الموافقة على استلام المكالمة التجريبية.'
          : 'Please agree to receive the demo call first.',
      )
      return
    }

    setErrorMsg('')
    setStatus('ringing')
    if (timerRef.current) window.clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(() => {
      setStatus('connected')
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel()
          const text = opts.locale === 'ar' ? opts.greetingAr : opts.greetingEn
          const utter = new SpeechSynthesisUtterance(text)
          utter.lang = opts.locale === 'ar' ? 'ar-SA' : 'en-US'
          utter.rate = 0.98
          utter.onend = () => setStatus('idle')
          window.speechSynthesis.speak(utter)
        } catch {
          /* ignore speech errors */
        }
      }
    }, 1400)
  }

  const stopCall = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setStatus('idle')
  }

  const openWidget = () => {
    if (typeof window !== 'undefined' && window.HeyServoWidget?.open) {
      window.HeyServoWidget.open()
    }
  }

  return {
    phone,
    setPhone,
    agreed,
    setAgreed,
    status,
    errorMsg,
    triggerCall,
    stopCall,
    openWidget,
  }
}
