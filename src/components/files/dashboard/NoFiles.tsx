import { FileStack } from 'lucide-react'
import FilesDashboardButtons from './FilesDashboardButtons'

export default function NoFiles() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
      <FileStack className="h-10 w-10" />
      <p className="text-3xl font-semibold">
        Looks like there's nothing here...
      </p>
      <FilesDashboardButtons />
    </div>
  )
}
