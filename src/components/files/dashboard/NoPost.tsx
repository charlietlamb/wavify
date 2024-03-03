import { FileStack } from 'lucide-react'

export default function NoPost() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
      <FileStack className="h-10 w-10" />
      <p className="text-center text-3xl font-semibold">
        Looks like there's no post for you here...
      </p>
    </div>
  )
}
