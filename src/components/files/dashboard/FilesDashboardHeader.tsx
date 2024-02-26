import FilesDashboardButtons from './FilesDashboardButtons'
import FilesDashboardLabel from './FilesDashboardLabel'

export default function FilesDashboardHeader() {
  return (
    <div className="flex w-full items-center justify-between border-b-2 border-zinc-200 p-4">
      <FilesDashboardLabel />
      <FilesDashboardButtons />
    </div>
  )
}
