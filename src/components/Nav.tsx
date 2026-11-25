import { ArrowUpRight, Building2, ChevronDown, LogOut, Menu, Sparkles, Store, Utensils, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { SITE } from '../data'
import { clearSession, getSession, type AuthUser } from '../lib/auth'
import { cx } from '../lib/cx'
import { LangToggle, useLocale } from '../lib/locale'
import { Brand } from './Logo'
import { ChannelMark } from './Social'
import { PulseDot } from './Ui'

function NavItem({
  href,
  label,
  className,
  onNavigate,
}: {
  href: string
  label: string
  className?: string
  onNavigate?: () => void
}) {
  const location = useLocation()
  const isRoute = href.startsWith('/')
  const active = isRoute && !href.includes('#') && location.pathname === href

  if (isRoute) {
    return (
      <Link
        to={href}
        onClick={onNavigate}
        className={cx(className, active && 'bg-soft text-ink')}
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </Link>
    )
  }

  return (
    <a href={href} onClick={onNavigate} className={className}>
      {label}
    </a>
  )
}

const INDUSTRY_ITEMS = [
  {
    to: '/industries/hospitality',
    icon: Building2,
    en: { title: 'Hospitality', sub: 'Hotels, resorts and hospitality groups' },
    ar: { title: 'الضيافة', sub: 'الفنادق والمنتجعات ومجموعات الضيافة' },
  },
  {
    to: '/industries/aesthetics-dental',
    icon: Sparkles,
    en: { title: 'Aesthetics & Dental', sub: 'Aesthetics clinics, medspas and dental groups' },
    ar: { title: 'التجميل والأسنان', sub: 'عيادات التجميل والمراكز الطبية والأسنان' },
  },
  {
    to: '/industries/restaurants',
    icon: Utensils,
    en: { title: 'Restaurants, Cafes & Bakeries', sub: 'Restaurants, cafes, bakeries and groups' },
    ar: { title: 'المطاعم والمقاهي والمخابز', sub: 'المطاعم والمقاهي والمخابز والمجموعات' },
  },
  {
    to: '/industries/small-business',
    icon: Store,
    en: { title: 'Small Medium Businesses', sub: 'Salons, spas, gyms and online stores' },
    ar: { title: 'الأعمال الصغيرة والمتوسطة', sub: 'الصالونات والمنتجعات والنوادي والمتاجر' },
  },
] as const

export function Nav() {
  const { copy, locale } = useLocale()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIndustriesOpen(false)
    setMobileIndustriesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndustriesOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const openDropdown = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIndustriesOpen(true)
  }

  const scheduleCloseDropdown = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = window.setTimeout(() => setIndustriesOpen(false), 120)
  }

  useEffect(() => {
    setUser(getSession())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const logout = () => {
    clearSession()
    setUser(null)
    setOpen(false)
  }

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-[var(--duration-base)]',
          scrolled
            ? 'border-line/80 bg-white/95 shadow-[0_10px_30px_-22px_rgb(9_30_74/0.45)] backdrop-blur-xl'
            : 'border-line/40 bg-white/85 backdrop-blur-md',
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="shrink-0" aria-label={`${SITE.name} — home`}>
            <Brand size="md" className="max-sm:origin-left max-sm:scale-[0.92]" />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Sections">
            {copy.nav.map((item) => {
              if (item.href === '/#industries') {
                const isIndustryRoute = location.pathname.startsWith('/industries/')
                return (
                  <div
                    key={item.href}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <button
                      type="button"
                      onClick={() => setIndustriesOpen((v) => !v)}
                      aria-expanded={industriesOpen}
                      aria-haspopup="menu"
                      className={cx(
                        'inline-flex items-center gap-1 rounded-full border px-2.5 py-2 text-[13.5px] font-medium transition-all duration-[var(--duration-fast)] 2xl:px-3.5 2xl:text-[14px]',
                        industriesOpen
                          ? 'border-[#5457e6] bg-white text-ink shadow-[0_6px_18px_-10px_rgb(84_87_230/0.45)]'
                          : isIndustryRoute
                            ? 'border-transparent bg-soft text-ink'
                            : 'border-transparent text-muted hover:bg-soft hover:text-ink',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cx(
                          'size-3.5 transition-transform duration-200',
                          industriesOpen && 'rotate-180 text-[#5457e6]',
                        )}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence>
                      {industriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          role="menu"
                          className="absolute start-0 top-full z-50 mt-2.5 w-[23rem] rounded-[22px] border border-line bg-white p-2.5 shadow-[0_24px_60px_-18px_rgb(15_23_42/0.22)]"
                        >
                          <div className="flex flex-col gap-1">
                            {INDUSTRY_ITEMS.map((ind) => {
                              const Icon = ind.icon
                              const text = locale === 'ar' ? ind.ar : ind.en
                              const active = location.pathname === ind.to
                              return (
                                <Link
                                  key={ind.to}
                                  to={ind.to}
                                  role="menuitem"
                                  onClick={() => setIndustriesOpen(false)}
                                  className={cx(
                                    'group flex items-center gap-3.5 rounded-[14px] p-2.5 transition-colors',
                                    active ? 'bg-[#f1f2ff]' : 'hover:bg-[#f5f6ff]',
                                  )}
                                >
                                  <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f1f2ff] text-[#5457e6] transition-colors group-hover:bg-[#e6e8ff]">
                                    <Icon className="size-[18px]" aria-hidden />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[14px] font-semibold tracking-[-0.015em] text-ink">
                                      {text.title}
                                    </span>
                                    <span className="block text-[12px] leading-snug text-muted">
                                      {text.sub}
                                    </span>
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  className="rounded-full px-2.5 py-2 text-[13.5px] font-medium text-muted transition-colors duration-[var(--duration-fast)] hover:bg-soft hover:text-ink 2xl:px-3.5 2xl:text-[14px]"
                />
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle className="hidden sm:inline-flex" />
            <a
              href={SITE.phoneHref}
              className="hidden shrink-0 items-center gap-2 rounded-full border border-line-strong bg-white/70 px-3.5 py-2 text-[13.5px] font-medium whitespace-nowrap text-ink transition-colors hover:border-brand hover:text-brand md:inline-flex"
            >
              <ChannelMark kind="voice" className="size-6" glyphClassName="size-3" rounded="rounded-full" />
              {SITE.phone}
            </a>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="max-w-[9rem] truncate rounded-full bg-soft px-3 py-2 text-[13px] font-medium text-ink">
                  {user.name.split(' ')[0]}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-2 text-[13px] font-medium text-muted hover:border-brand hover:text-brand"
                >
                  <LogOut className="size-3.5" aria-hidden />
                  {copy.navUi.logOut}
                </button>
              </div>
            ) : (
              <Link
                to="/demo"
                className="hidden shrink-0 items-center gap-2 rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] px-4 py-2.5 text-[13.5px] font-medium whitespace-nowrap text-white shadow-[0_12px_26px_-16px_rgb(26_99_216/0.9)] transition-[filter,transform] duration-[var(--duration-fast)] hover:brightness-[1.07] active:scale-[0.98] sm:inline-flex"
              >
                <PulseDot className="size-1.5" />
                {copy.navUi.bookDemo}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={copy.navUi.openMenu}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-line-strong bg-white/80 text-ink transition-colors hover:border-brand hover:text-brand xl:hidden"
            >
              <Menu className="size-4.5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-night/40 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="m-3 rounded-[26px] bg-white p-5 shadow-[var(--shadow-float)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Brand size="sm" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={copy.navUi.closeMenu}
                  className="grid size-9 place-items-center rounded-full border border-line-strong text-ink"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <LangToggle />
              </div>
              <nav className="mt-5 flex flex-col" aria-label="Sections">
                {copy.nav.map((item) => {
                  if (item.href === '/#industries') {
                    return (
                      <div key={item.href} className="border-b border-line">
                        <button
                          type="button"
                          onClick={() => setMobileIndustriesOpen((v) => !v)}
                          aria-expanded={mobileIndustriesOpen}
                          className="flex w-full items-center justify-between py-3.5 text-[17px] font-medium tracking-[-0.02em] text-ink"
                        >
                          {item.label}
                          <ChevronDown
                            className={cx(
                              'size-4 text-faint transition-transform duration-200',
                              mobileIndustriesOpen && 'rotate-180 text-[#5457e6]',
                            )}
                            aria-hidden
                          />
                        </button>
                        {mobileIndustriesOpen && (
                          <div className="mb-3 flex flex-col gap-1 ps-1">
                            {INDUSTRY_ITEMS.map((ind) => {
                              const Icon = ind.icon
                              const text = locale === 'ar' ? ind.ar : ind.en
                              return (
                                <Link
                                  key={ind.to}
                                  to={ind.to}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-3 rounded-[14px] p-2 hover:bg-[#f5f6ff]"
                                >
                                  <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#f1f2ff] text-[#5457e6]">
                                    <Icon className="size-4" aria-hidden />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[14px] font-semibold text-ink">{text.title}</span>
                                    <span className="block text-[12px] text-muted">{text.sub}</span>
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  }

                  const isRoute = item.href.startsWith('/')
                  const className =
                    'flex items-center justify-between border-b border-line py-3.5 text-[17px] font-medium tracking-[-0.02em] text-ink'
                  const inner = (
                    <>
                      {item.label}
                      <ArrowUpRight className="size-4 text-faint" aria-hidden />
                    </>
                  )
                  return isRoute ? (
                    <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className={className}>
                      {inner}
                    </Link>
                  ) : (
                    <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={className}>
                      {inner}
                    </a>
                  )
                })}
              </nav>
              <div className="mt-5 flex flex-col gap-2">
                {user ? (
                  <>
                    <p className="rounded-[14px] bg-soft px-3 py-2 text-center text-[13.5px] font-medium text-ink">
                      {copy.navUi.signedIn} {user.name}
                    </p>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-[15px] font-medium text-ink"
                    >
                      <LogOut className="size-4" aria-hidden />
                      {copy.navUi.logOut}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/demo"
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center justify-center rounded-full bg-[linear-gradient(115deg,#1a63d8,#4b53e8_58%,#0e9a9e)] text-[15px] font-medium text-white"
                  >
                    {copy.navUi.bookDemo}
                  </Link>
                )}
                <a
                  href={SITE.phoneHref}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-[15px] font-medium text-ink"
                >
                  <ChannelMark kind="voice" className="size-6" glyphClassName="size-3.5" rounded="rounded-full" />
                  {SITE.phone}
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-[15px] font-medium text-ink"
                >
                  <ChannelMark kind="whatsapp" className="size-6" glyphClassName="size-3.5" rounded="rounded-full" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
