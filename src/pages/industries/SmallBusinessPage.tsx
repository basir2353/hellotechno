import { useEffect } from 'react'

import '../../raya/raya.css'
import { SmbPage as RayaSmbPage } from '../../raya/components/SmbPage'

export function SmallBusinessPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="raya-page raya-page-pad">
      <RayaSmbPage />
    </div>
  )
}
