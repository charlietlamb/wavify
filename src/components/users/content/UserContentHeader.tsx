import { useUserContext } from '../context/context'
import UserContentMode from './UserContentMode'

export default function UserContentHeader() {
  const { otherUser } = useUserContext()
  return (
    <div className="flex w-full items-center justify-between border-b border-zinc-700 p-4">
      <h1 className="text-4xl font-bold">{otherUser.username}</h1>
      <UserContentMode />
    </div>
  )
}
