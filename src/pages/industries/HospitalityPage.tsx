import { useEffect } from 'react'

import '../../raya/raya.css'
import { HospitalityPage as RayaHospitalityPage } from '../../raya/components/HospitalityPage'

export function HospitalityPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="raya-page raya-page-pad">
      <RayaHospitalityPage />
    </div>
  )
}
