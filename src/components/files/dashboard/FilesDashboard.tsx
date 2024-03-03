'use client'

import TransientPost from '@/components/collective/transient/functions/transientPost'
import PostboxSend from '../postbox/PostboxSend'
import FilesToggle from '../sidebar/FilesToggle'
import { useFilesContext } from '../state/context'
import FilesFiles from './FilesFiles'
import FilesFilters from './FilesFilters'

export default function FilesDashboard() {
  const { space, postboxSend, transientPost } = useFilesContext()
  return (
    <div className="relative flex w-full flex-col gap-y-4 p-4">
      {!space && <FilesToggle />}
      {postboxSend && <PostboxSend />}
      {transientPost && <TransientPost />}
      <FilesFilters />
      <FilesFiles />
    </div>
  )
}
