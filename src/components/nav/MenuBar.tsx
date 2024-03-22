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

interface MenuBarProps {
  collectives: Collective[]
}

export default function NavMenu({ collectives }: MenuBarProps) {
  const user = useUser()
  const { onOpen } = useModal()
  const router = useRouter()
  return (
    <Menubar className="rounded-0 flex cursor-pointer items-center border-0 p-0 px-[0.5rem] text-lg">
      <MenubarMenu>
        <MenubarTrigger>{user.username}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Create Collective <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Your Collectives <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Friends</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Favorites</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
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
