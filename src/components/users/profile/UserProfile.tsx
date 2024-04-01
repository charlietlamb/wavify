import UserProfileTop from './UserProfileTop'
import UserProfileActivity from './UserProfileActivity'

export default function UserProfile() {
  return (
    <div className="flex flex-col divide-y divide-zinc-700">
      <UserProfileTop />
      <UserProfileActivity />
    </div>
  )
}
