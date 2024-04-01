'use client'

import { useEffect, useState } from 'react'
import { GeneralContext } from './context/context'
import ResourcesGeneralBentoTop from './ResourcesGeneralBentoTop'
import { useDashboardContext } from '../../context/context'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getResourcesDownloadData } from './functions/getResourcesDownloadData'
import { useUser } from '@/state/user/useUser'

export default function ResourcesGeneral() {
  const supabase = createClientComponentClient()
  const user = useUser()
  const [downloads, setDownloads] = useState(0)
  const [uploads, setUploads] = useState(0)
  const [views, setViews] = useState(0)
  const [saves, setSaves] = useState(0)
  const { startDate, endDate } = useDashboardContext()
  useEffect(() => {
    getResourcesDownloadData(supabase, user, setDownloads, startDate, endDate)
  }, [])
  return (
    <GeneralContext.Provider
      value={{
        downloads,
        setDownloads,
        uploads,
        setUploads,
        views,
        setViews,
        saves,
        setSaves,
      }}
    >
      <div className="flex h-full flex-grow flex-col gap-y-4 p-4">
        <ResourcesGeneralBentoTop />
        {/* <GeneralBentoBottom /> */}
      </div>
    </GeneralContext.Provider>
  )
}
