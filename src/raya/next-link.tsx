import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
  children?: ReactNode
  prefetch?: boolean
}

export default function Link({ href, children, prefetch: _prefetch, ...rest }: NextLinkProps) {
  const isExternal =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')

  if (isExternal) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <RouterLink to={href} {...rest}>
      {children}
    </RouterLink>
  )
}
