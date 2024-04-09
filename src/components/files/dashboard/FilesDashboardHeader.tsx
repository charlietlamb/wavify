'use client'

import TransientHeader from '@/components/collective/transient/TransientHeader'
import { useFilesContext } from '../state/context'
import FilesDashboardButtons from './FilesDashboardButtons'
import FilesDashboardLabel from './FilesDashboardLabel'

export default function FilesDashboardHeader() {
  const { postbox, transient, feedback } = useFilesContext()
  return (
    <div className="flex w-full items-center justify-between divide-x divide-zinc-700 border-b border-zinc-700 pl-4">
      <FilesDashboardLabel />
      {!postbox && !transient && !feedback && <FilesDashboardButtons />}
      {transient && <TransientHeader />}
    </div>
  )
}
