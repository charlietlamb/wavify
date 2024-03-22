import UserProfileTop from './UserProfileTop'
import UserProfileBottom from './UserProfileBottom'

export default function UserProfile() {
  return (
    <div className="flex flex-col gap-4">
      <UserProfileTop />
      <UserProfileBottom />
    </div>
  )
}
