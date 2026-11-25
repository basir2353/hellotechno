import { useEffect } from 'react'

import '../../raya/raya.css'
import { RestaurantsPage as RayaRestaurantsPage } from '../../raya/components/RestaurantsPage'

export function RestaurantsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="raya-page raya-page-pad">
      <RayaRestaurantsPage />
    </div>
  )
}
