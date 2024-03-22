import { useUserContext } from '../context/context'
import UserContentHeader from './UserContentHeader'

export default function UserContent() {
  const { otherUser } = useUserContext()
  return (
    <div className="flex h-full flex-grow flex-col gap-4 rounded-lg border border-zinc-700 transition hover:border-zinc-200">
      <UserContentHeader />
    </div>
  )
}
