import Image from 'next/image'
import { useUserContext } from '../context/context'
import UserProfileFollowers from './UserProfileFollowers'
import UserProfileButtons from './UserProfileButtons'

export default function UserProfileTop() {
  const { otherUser } = useUserContext()
  return (
    <div className="flex items-center gap-4 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
      <div className="relative h-[150px] w-[150px] rounded-full border border-zinc-700 transition hover:border-zinc-200">
        <Image
          alt={`${otherUser.username}'s profile image`}
          src={'https://github.com/shadcn.png'} //otherUser.profile_pic_url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-full "
        ></Image>
      </div>
      <div className="flex flex-col items-center gap-4">
        <UserProfileFollowers />
        <UserProfileButtons />
      </div>
    </div>
  )
}
