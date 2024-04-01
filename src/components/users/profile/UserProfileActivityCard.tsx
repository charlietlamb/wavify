import Image from 'next/image'

export default function UserProfileActivityCard({
  action,
}: {
  action: ActionAndUser
}) {
  return (
    <div className="flex gap-4">
      <div className="relative h-12 min-h-12 w-12 min-w-12">
        <Image
          alt={`${action.users.username}'s profile image`}
          src={'https://github.com/shadcn.png'} //otherUser.imageUrl}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold">{action.users.username}</div>
        <div className="text-xs text-zinc-600">
          {new Date(action.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
