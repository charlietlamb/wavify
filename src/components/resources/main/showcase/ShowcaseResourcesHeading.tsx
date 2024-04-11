import { UserAvatar } from '@/components/utils/UserAvatar'
import { useShowcaseResourceContext } from './context/showcaseResourceContext'

export default function ShowcaseResourcesHeading() {
  const { file } = useShowcaseResourceContext()
  return (
    <div className="relative z-10 flex w-full items-center justify-between p-4 pb-2">
      <h2 className="inline-flex whitespace-nowrap bg-gradient-to-br from-zinc-100 to-zinc-200 bg-clip-text pr-2 text-6xl font-black uppercase italic text-transparent">
        Resource Name
      </h2>
      <UserAvatar user={file.users} className="h-16 w-16" />
    </div>
  )
}
