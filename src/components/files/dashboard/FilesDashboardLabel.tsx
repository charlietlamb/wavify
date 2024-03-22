'use client'

import {
  Archive,
  Hourglass,
  LibraryBig,
  MessageCircleQuestion,
} from 'lucide-react'
import FilesDashboardBreadcrumb from './FilesDashboardBreadcrumb'
import { useFilesContext } from '../state/context'

export default function FilesDashboardLabel() {
  const { postbox, transient, feedback } = useFilesContext()
  const iconClass = 'min-h-4 min-w-4'
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center">
        {postbox ? (
          <Archive className={iconClass} strokeWidth={2} />
        ) : transient ? (
          <Hourglass className={iconClass} strokeWidth={2} />
        ) : feedback ? (
          <MessageCircleQuestion className={iconClass} strokeWidth={2} />
        ) : (
          <LibraryBig className={iconClass} strokeWidth={2} />
        )}
      </div>

      <FilesDashboardBreadcrumb />
    </div>
  )
}
