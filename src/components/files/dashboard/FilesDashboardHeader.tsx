'use client'

import { useFilesContext } from '../state/context'
import FilesDashboardButtons from './FilesDashboardButtons'
import FilesDashboardLabel from './FilesDashboardLabel'

export default function FilesDashboardHeader() {
  const { postbox } = useFilesContext()
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-zinc-200 p-4">
      <FilesDashboardLabel />
      {!postbox && <FilesDashboardButtons />}
    </div>
  )
}
