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
  return (
    <div className="flex items-end gap-x-2">
      <div className="flex items-center">
        {postbox ? (
          <>
            <Archive className="h-8 w-8" strokeWidth={2} />
            <p className="text-4xl font-bold">Postbox</p>
          </>
        ) : transient ? (
          <>
            <Hourglass className="h-8 w-8" strokeWidth={2} />
            <p className="text-4xl font-bold">Transient</p>
          </>
        ) : feedback ? (
          <>
            <MessageCircleQuestion className="h-8 w-8" strokeWidth={2} />
            <p className="text-4xl font-bold">Feedback</p>
          </>
        ) : (
          <>
            <LibraryBig className="h-8 w-8" strokeWidth={2} />
            <p className="text-4xl font-bold">Library</p>
          </>
        )}
      </div>

      <FilesDashboardBreadcrumb />
    </div>
  )
}
