'use client'

import DashboardTopBottom from './DashboardTopBottom'
import DashboardTopTop from './DashboardTopTop'

export default function DashboardTop() {
  return (
    <div className="flex items-center justify-between gap-4">
      <DashboardTopTop />
      <DashboardTopBottom />
    </div>
  )
}
