import { ArrowRight, RotateCcw, SendHorizontal, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link } from 'react-router'

import { SITE } from '../data'
import { cx } from '../lib/cx'
import { useLocale } from '../lib/locale'
import { EASE } from '../lib/motion'
import { localChatReply, type ChatTurn } from '../shared/chatKnowledge'
import { Mark } from './Logo'
import { PulseDot } from './Ui'

type Message = ChatTurn & {
  id: string
}

function renderFormattedText(text: string) {
  // Split into lines to cleanly format bullet points and bold spans
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => {
    const trimmed = line.trim()
    const isBullet = /^[-*•]\s+/.test(trimmed)
    const content = isBullet ? trimmed.replace(/^[-*•]\s+/, '') : line

    const parts = content.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return <span key={i}>{part}</span>
    })

    if (isBullet) {
      return (
        <div key={lineIdx} className="mt-1 flex items-start gap-2 ps-1">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          <span className="min-w-0 flex-1">{parts}</span>
        </div>
      )
    }

    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />
    }

    return (
      <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : undefined}>
        {parts}
      </p>
    )
  })
}

export function ChatWidget() {
  const { copy, locale } = useLocale()
  const reduce = useReducedMotion()
  const c = copy.chat

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: c.welcome },
  ])

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Keep welcome message synced if user switches EN <-> AR before chatting
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0]?.id === 'welcome') {
        return [{ id: 'welcome', role: 'assistant', content: c.welcome }]
      }
      return prev
    })
  }, [c.welcome])

  // Auto-scroll to newest message
  useEffect(() => {
    if (!open) return
    const el = listRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [messages, loading, open, reduce])

  // Focus input when opened
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 140)
    return () => window.clearTimeout(t)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim()
    if (!text || loading) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 12000)

    try {
      const apiHistory: ChatTurn[] = nextMessages
        .filter((m) => m.id !== 'welcome')
        .map(({ role, content }) => ({ role, content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiHistory, locale }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { ok?: boolean; reply?: string }
      const replyText = data.reply?.trim()
      if (!replyText) throw new Error('Empty reply')

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: replyText },
      ])
    } catch {
      // Seamless local knowledge fallback so the user always gets a helpful answer
      const fallback = localChatReply(text, locale)
      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: 'assistant', content: fallback },
      ])
    } finally {
      window.clearTimeout(timer)
      setLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    void sendMessage(input)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  const resetChat = () => {
    setMessages([{ id: 'welcome', role: 'assistant', content: c.welcome }])
    setInput('')
  }

  const showSuggestions = messages.length <= 1 && !loading

  return (
    <>
      {/* --------------------------------------------------- Floating Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? c.closeChat : c.openChat}
        aria-expanded={open}
        className={cx(
          'fixed end-3 bottom-4 z-[55] grid size-14 place-items-center rounded-full sm:end-6 sm:bottom-6',
          'bg-[linear-gradient(135deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-white',
          'shadow-[0_18px_38px_-12px_rgb(26_99_216/0.62),0_4px_12px_rgb(15_23_42/0.16)]',
          'ring-2 ring-white/80 transition-[transform,filter,box-shadow] duration-[var(--duration-fast)] hover:scale-105 hover:brightness-105 active:scale-95',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduce ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="grid place-items-center"
            >
              <X className="size-6" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={reduce ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="grid size-9 place-items-center rounded-full bg-white p-1 shadow-sm"
            >
              <Mark className="size-full" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* --------------------------------------------------------- Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={c.title}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.26, ease: EASE }}
            className={cx(
              'fixed end-3 bottom-[5.25rem] z-[65] flex w-[min(calc(100vw-1.5rem),25.5rem)] flex-col overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_34px_80px_-24px_rgb(4_13_28/0.48)]',
              'h-[min(calc(100svh-7rem),36rem)] sm:end-6 sm:bottom-[5.75rem]',
            )}
          >
            {/* Header */}
            <header className="on-dark relative flex items-center justify-between gap-3 bg-[linear-gradient(145deg,#040d1c,#0b2a63_58%,#0a4a63)] px-4 py-3.5 text-white">
              <span
                className="pointer-events-none absolute -top-12 -end-8 size-36 rounded-full bg-[radial-gradient(circle,rgb(125_232_226/0.28),transparent_70%)] blur-2xl"
                aria-hidden
              />
              <div className="relative flex min-w-0 items-center gap-2.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white p-1.5 shadow-sm">
                  <Mark className="size-full" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-[14.5px] font-semibold tracking-[-0.02em] text-white">{c.title}</h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#25D366]/20 px-2 py-0.5 text-[10px] font-semibold text-[#86ffae]">
                      <PulseDot className="size-1.5" />
                      {c.live}
                    </span>
                  </div>
                  <p className="truncate text-[11.5px] text-white/70">{c.subtitle}</p>
                </div>
              </div>

              <div className="relative flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  title={locale === 'ar' ? 'محادثة جديدة' : 'New chat'}
                  aria-label={locale === 'ar' ? 'محادثة جديدة' : 'New chat'}
                  className="grid size-8 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <RotateCcw className="size-3.5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={c.close}
                  className="grid size-8 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            </header>

            {/* Transcript */}
            <div
              ref={listRef}
              role="log"
              aria-live="polite"
              aria-label="Conversation"
              className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#f6f9ff,#ffffff)] p-4"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user'
                return (
                  <motion.div
                    key={msg.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className={cx('flex flex-col', isUser ? 'items-end' : 'items-start')}
                  >
                    <div
                      className={cx(
                        'max-w-[88%] rounded-[18px] px-3.5 py-2.5 text-[13.5px] leading-relaxed break-words',
                        isUser
                          ? 'rounded-ee-md bg-[linear-gradient(125deg,#1a63d8,#4b53e8)] text-white shadow-[0_10px_24px_-14px_rgb(26_99_216/0.8)]'
                          : 'rounded-es-md border border-line bg-white text-ink-2 shadow-[0_8px_20px_-16px_rgb(9_30_74/0.28)]',
                      )}
                    >
                      {isUser ? msg.content : renderFormattedText(msg.content)}
                    </div>
                  </motion.div>
                )
              })}

              {loading && (
                <div className="flex items-start">
                  <div className="inline-flex items-center gap-1.5 rounded-[18px] rounded-es-md border border-line bg-white px-3.5 py-3 shadow-sm">
                    <span className="size-1.5 animate-typing rounded-full bg-brand [animation-delay:0ms]" />
                    <span className="size-1.5 animate-typing rounded-full bg-iris [animation-delay:180ms]" />
                    <span className="size-1.5 animate-typing rounded-full bg-teal [animation-delay:360ms]" />
                    <span className="sr-only">{c.thinking}</span>
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="pt-1">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-faint uppercase">
                    <Sparkles className="size-3 text-brand" aria-hidden />
                    {locale === 'ar' ? 'أسئلة سريعة' : 'Quick questions'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.suggestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => void sendMessage(q)}
                        className="rounded-full border border-brand/20 bg-white px-3 py-1.5 text-start text-[12px] font-medium text-brand shadow-[0_6px_14px_-12px_rgb(26_99_216/0.5)] transition-all hover:border-brand hover:bg-brand-soft/60"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Input + Quick Demo CTA */}
            <div className="border-t border-line bg-white p-3">
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={c.placeholder}
                  aria-label={c.placeholder}
                  className="max-h-24 min-h-10 flex-1 resize-none rounded-2xl border border-line bg-canvas/70 px-3.5 py-2.5 text-[13.5px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint focus:border-brand focus:bg-white focus:shadow-[var(--shadow-focus)]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label={c.send}
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(125deg,#1a63d8,#4b53e8)] text-white shadow-[0_10px_20px_-10px_rgb(26_99_216/0.8)] transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <SendHorizontal className="size-4 rtl:rotate-180" aria-hidden />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-faint">
                <Link
                  to="/demo"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                >
                  {copy.navUi.bookDemo}
                  <ArrowRight className="size-3 rtl:rotate-180" aria-hidden />
                </Link>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-muted hover:text-[#128C7E]"
                >
                  WhatsApp · {SITE.phone}
                </a>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
