import DashboardTop from '@/components/dashboard/top/DashboardTop'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow flex-col divide-y divide-zinc-700 overflow-hidden">
      <DashboardTop />
      {children}
    </div>
  )
}
