import Image from 'next/image'
import { UserAvatar } from '../utils/UserAvatar'

export default function WavifyCard({
  onClick,
  imageUrl,
  user,
  name,
  text,
}: {
  onClick: () => void
  imageUrl: string
  user: User
  name: string
  text: string
}) {
  return (
    <div
      className="flex h-fit cursor-pointer flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200"
      onClick={onClick}
    >
      <div className="relative aspect-square w-full">
        <Image
          src="https://github.com/shadcn.png"
          alt={`${name} image`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-xl"
        />
      </div>
      <div className="flex max-w-full items-center gap-2 overflow-hidden">
        <UserAvatar user={user} />
        <div className="flex max-w-full flex-col overflow-hidden overflow-ellipsis">
          <h2 className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold leading-none text-zinc-200">
            {name}
          </h2>
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-zinc-400">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
