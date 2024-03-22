'use client'

import DashboardHeaderLeft from './DashboardHeaderLeft'
import DashboardHeaderRight from './DashboardHeaderRight'

export default function DashboardHeader() {
  return (
    <div className="flex w-full justify-between border-b border-zinc-700 px-4 py-2">
      <DashboardHeaderLeft />
      <DashboardHeaderRight />
    </div>
  )
}
