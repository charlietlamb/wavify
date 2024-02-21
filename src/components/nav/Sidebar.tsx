'use server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import NavigationAction from './NavAction'
import { Separator } from '../ui/separator'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import AppNavBarTopCollectives from './AppNavBarTopCollectives'
import { getUserCollectives } from './functions/getUserCollectives'

interface appNavBarTopProps {
  user: User
}

export default async function Sidebar({ user }: appNavBarTopProps) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const collectives = (await getUserCollectives(
    supabase,
    user
  )) as unknown as Collective[]
  return (
    <div className="flex h-full flex-col items-center space-y-4 bg-background_content text-primary">
      <NavigationAction></NavigationAction>
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-primary_light dark:bg-primary_dark"></Separator>
      <ScrollArea className="flex-1 ">
        <div className="flex flex-col justify-start">
          {!!collectives.length ? (
            <AppNavBarTopCollectives
              collectives={collectives}
              className="mx-1"
            />
          ) : (
            <div>no collectives</div>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
