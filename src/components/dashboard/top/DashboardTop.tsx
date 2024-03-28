'use client'

import DashboardTopBottom from './DashboardTopBottom'
import DashboardTopTop from './DashboardTopTop'

export default function DashboardTop() {
  return (
    <div className="flex flex-col gap-4 p-4 py-2 sm:flex-row sm:items-center sm:justify-between">
      <DashboardTopTop />
      <DashboardTopBottom />
    </div>
  )
}
