import { useUserContext } from '../context/context'

export default function UserProfileFollowers() {
  const { followers, following } = useUserContext()
  return (
    <div className="flex gap-x-4">
      <div className="flex flex-col items-center gap-1">
        <span className="text-lg font-bold">{following}</span>
        <span>Following</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-lg font-bold">{followers}</span>
        <span>Followers</span>
      </div>
    </div>
  )
}
