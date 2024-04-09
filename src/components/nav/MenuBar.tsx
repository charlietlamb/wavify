'use client'

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useModal } from '../../../hooks/use-modal-store'
import { useRouter } from 'next/navigation'
import { useUser } from '@/state/user/useUser'
import {
  Bookmark,
  Gauge,
  LibraryBig,
  MessagesSquare,
  UserRoundX,
} from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface MenuBarProps {
  collectives: Collective[]
}
export const iconClassName = 'ml-auto text-zinc-400 text-sm w-5 h-5'

export default function NavMenu({ collectives }: MenuBarProps) {
  const user = useUser()
  const { onOpen } = useModal()
  const router = useRouter()
  const supabase = createClientComponentClient()
  return (
    <Menubar className="rounded-0 flex cursor-pointer items-center border-0 p-0 px-[0.5rem] text-lg">
      <MenubarMenu>
        <MenubarTrigger>{user.username}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => router.push('/dashboard/overview/general')}
          >
            Dashboard <Gauge className={iconClassName} />
          </MenubarItem>
          <MenubarItem onClick={() => router.push('/library')}>
            Library <LibraryBig className={iconClassName} />
          </MenubarItem>
          <MenubarItem onClick={() => router.push('/saved')}>
            Saved <Bookmark className={iconClassName} />
          </MenubarItem>
          <MenubarItem onClick={() => router.push('/messages')}>
            Messages <MessagesSquare className={iconClassName} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              supabase.auth.signOut()
            }}
          >
            Sign Out <UserRoundX className={iconClassName} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Collective</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => onOpen('createCollective')}>
            Create Collective <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Your Collectives <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Quick...</MenubarSubTrigger>
            <MenubarSubContent>
              {collectives.map((collective) => (
                <MenubarItem
                  key={collective.id}
                  onClick={() =>
                    router.push(`/collective/${collective.unique}`)
                  }
                >
                  {collective.unique}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Market</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Create Product <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Resources</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => router.push('/resources')}>
            Resources
          </MenubarItem>
          <MenubarItem onClick={() => router.push('/resources/all')}>
            All Resources
          </MenubarItem>
          <MenubarItem
            onClick={() => router.push('/dashboard/resources/upload')}
          >
            Upload Resource
          </MenubarItem>
          <MenubarRadioGroup value="closed">
            <MenubarRadioItem value="closed">Closed</MenubarRadioItem>
            <MenubarRadioItem value="users">Users</MenubarRadioItem>
            <MenubarRadioItem value="collectives">Collectives</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Preferences</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Icon Menu</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Audio Player
          </MenubarCheckboxItem>
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset onClick={() => onOpen('theme', { user })}>
            Theme...
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Sidebar Options</MenubarItem>
          <MenubarRadioGroup value="closed">
            <MenubarRadioItem value="closed">Closed</MenubarRadioItem>
            <MenubarRadioItem value="users">Users</MenubarRadioItem>
            <MenubarRadioItem value="collectives">Collectives</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
