import UserProfileActivityContent from './UserProfileActivityContent'

export default function UserProfileActivity() {
  return (
    <div className="flex flex-grow flex-col gap-4 divide-y divide-zinc-700">
      <div className="flex p-4">
        <div className="text-2xl font-semibold">Activity</div>
        <UserProfileActivityContent />
      </div>
    </div>
  )
}
