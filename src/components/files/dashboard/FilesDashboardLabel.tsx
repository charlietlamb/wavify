'use client'

import FilesDashboardBreadcrumb from './FilesDashboardBreadcrumb'

export default function FilesDashboardLabel() {
  return (
    <div className="flex items-end gap-x-2">
      <p className="text-4xl font-bold">Files</p>
      <FilesDashboardBreadcrumb />
    </div>
  )
}
