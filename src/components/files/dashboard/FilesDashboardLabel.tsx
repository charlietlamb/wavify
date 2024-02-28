'use client'

import { LibraryBig } from 'lucide-react'
import FilesDashboardBreadcrumb from './FilesDashboardBreadcrumb'

export default function FilesDashboardLabel() {
  return (
    <div className="flex items-end gap-x-2">
      <div className="flex items-center">
        <LibraryBig className="h-8 w-8" strokeWidth={2} />
        <p className="text-4xl font-bold">Library</p>
      </div>

      <FilesDashboardBreadcrumb />
    </div>
  )
}
