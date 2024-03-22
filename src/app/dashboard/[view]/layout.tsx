import DashboardTop from '@/components/dashboard/top/DashboardTop'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-full w-full flex-grow flex-col gap-y-4 overflow-y-hidden p-4">
      <DashboardTop />
      {children}
    </div>
  )
}
