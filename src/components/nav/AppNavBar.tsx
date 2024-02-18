import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUserCollectives } from './functions/getUserCollectives'
import NavMenu from './MenuBar'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import AppNavBarToggle from './AppNavBarToggle'

interface appNavBarProps {
  user: User
}

export default async function AppNavBar({ user }: appNavBarProps) {
  const supabase = createServerComponentClient({ cookies })
  const collectives: Collective[] = await getUserCollectives(supabase, user)

  return (
    <div className="flex items-center justify-between rounded-md border-b-1 border-zinc-300 px-[1rem]">
      <div className="flex items-center gap-x-2">
        <Link href="/">
          <Image
            src="/w-logo.png"
            alt="Wavify"
            width={1024}
            height={1024}
            className="height-auto w-[1.5rem]"
          />
        </Link>
        <NavMenu user={user} collectives={collectives} />
      </div>
      <Separator
        className="mx-4 h-full w-2 bg-zinc-300"
        orientation="vertical"
      />
      <AppNavBarToggle />
    </div>
  )
}
