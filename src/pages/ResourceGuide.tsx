import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router'

import { CreditsPage } from './resources/CreditsPage'
import { GoLivePage } from './resources/GoLivePage'
import { IndustriesPage } from './resources/IndustriesPage'
import { RESOURCE_SLUGS, type ResourceSlug } from './resources/shared'
import { WalkthroughPage } from './resources/WalkthroughPage'

export type { ResourceSlug }

function isSlug(v: string | undefined): v is ResourceSlug {
  return !!v && (RESOURCE_SLUGS as string[]).includes(v)
}

export function ResourceGuide() {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!isSlug(slug)) return <Navigate to="/#resources" replace />

  switch (slug) {
    case 'go-live':
      return <GoLivePage />
    case 'credits':
      return <CreditsPage />
    case 'industries':
      return <IndustriesPage />
    case 'walkthrough':
      return <WalkthroughPage />
  }
}
