import { useEffect } from 'react'

import '../../raya/raya.css'
import { AestheticsPage as RayaAestheticsPage } from '../../raya/components/AestheticsPage'

export function AestheticsDentalPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="raya-page raya-page-pad">
      <RayaAestheticsPage />
    </div>
  )
}
