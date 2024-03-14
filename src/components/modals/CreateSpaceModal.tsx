'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useModal } from '../../../hooks/use-modal-store'
import { AnimatedCheckIcon } from '../icons/check'
import { AnimatedXIcon } from '../icons/x'
import { Label } from '../ui/label'
import ButtonLoader from '../utils/ButtonLoader'
import { spaceTypes } from '../collective/space/data'
import SpaceRoles from '../collective/space/SpaceRoles'
import { useCollective } from '@/state/collective/useCollective'
const iconProps = {
  height: '40',
  width: '40',
  color: 'hsl(var(--primary))',
}

export const CreateSpaceModal = () => {
  const [loading, setLoading] = useState(false)
  const [spaceName, setSpaceName] = useState('')
  const { isOpen, onClose, type, data } = useModal()
  const { spaceType: theSpaceType } = data as {
    spaceType: SpaceType
  }
  const { collective, roles, spaces: spacesState } = useCollective()
  const [spaceType, setSpaceType] = useState<SpaceType>('text')
  const [username, setUsername] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const [spaces, setSpaces] = useState<Space[]>([])
  const [spaceOpen, setSpaceOpen] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const andAllowed = roles
    ?.map((role) => ({ ...role, allowed: false }))
    ?.sort((a, b) => a.authority - b.authority)
  const [rolesAndAllowed, setRolesAndAllowed] =
    useState<RoleAndAllowed[]>(andAllowed)
  const [rolesAndSend, setRolesAndSend] = useState<RoleAndAllowed[]>(andAllowed)
  const [rolesAndReceive, setRolesAndReceive] =
    useState<RoleAndAllowed[]>(andAllowed)
  const [rolesAndPost, setRolesAndPost] = useState<RoleAndAllowed[]>(andAllowed)
  const [rolesAndAccess, setRolesAndAccess] =
    useState<RoleAndAllowed[]>(andAllowed)
  const [rolesAndGet, setRolesAndGet] = useState<RoleAndAllowed[]>(andAllowed)
  const [rolesAndGive, setRolesAndGive] = useState<RoleAndAllowed[]>(andAllowed)

  useEffect(() => {
    if (type === 'createSpace' && collective) {
      setSpaceOpen(true)
      const andAllowed = roles
        ?.map((role) => ({ ...role, allowed: false }))
        ?.sort((a, b) => a.authority - b.authority)
      const andAllowedTrue = roles
        ?.map((role) => ({ ...role, allowed: true }))
        ?.sort((a, b) => a.authority - b.authority)
      setRolesAndAllowed(andAllowed)
      setRolesAndSend(andAllowedTrue)
      setRolesAndReceive(andAllowed)
      setRolesAndPost(andAllowed)
      setRolesAndAccess(andAllowedTrue)
      setRolesAndGet(andAllowedTrue)
      setRolesAndGive(andAllowed)
      setSpaces(spacesState)
    }
  }, [isOpen, spacesState, roles, collective])

  const isModalOpen = isOpen && type === 'createSpace'
  useEffect(() => {
    if (theSpaceType && spaceTypes.includes(theSpaceType)) {
      setSpaceType(theSpaceType)
    }
  }, [theSpaceType])

  async function submitSpaceDetails() {
    setLoading(true)
    if (spaceName !== '' && spaceName !== 'roles' && usernameAvailable) {
      const folder = ['library', 'postbox'].includes(spaceType)
        ? uuidv4()
        : null
      if (folder) {
        const folderData = {
          id: folder,
          name: spaceName,
          parent: null,
        }
        const { error } = await supabase.from('folders').insert(folderData)
        if (error) throw error
      }
      const id = uuidv4()
      const space = {
        id,
        name: spaceName,
        type: spaceType,
        slug: username,
        allowed: rolesAndAllowed
          .filter((role) => role.allowed)
          .map((role) => role.id),
        open: spaceOpen,
        order: spaces.filter((space) => space.type === spaceType).length,
        collective: collective.id,
        folder,
        pbSend: rolesAndSend
          .filter((role) => role.allowed)
          .map((role) => role.id),
        pbReceive: rolesAndReceive
          .filter((role) => role.allowed)
          .map((role) => role.id),
        tPost: rolesAndPost
          .filter((role) => role.allowed)
          .map((role) => role.id),
        tAccess: rolesAndAccess
          .filter((role) => role.allowed)
          .map((role) => role.id),
        fGet: rolesAndGet.filter((role) => role.allowed).map((role) => role.id),
        fGive: rolesAndGive
          .filter((role) => role.allowed)
          .map((role) => role.id),
      }
      const { error } = await supabase.from('spaces').insert(space)
      if (error) {
        setErrorMessage('There was an error creating space.')
        throw error
      } else {
        setErrorMessage('')
        setSpaceName('')
        setUsername('')
        onClose()
        router.refresh()
      }
    } else {
      setErrorMessage('Please enter a valid spaceName.')
    }
    setLoading(false)
  }

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === '' || usernameToCheck === 'roles') {
      setUsernameAvailable(false)
      return
    }
    //just finished here so try get create Space working again then do styles for create collective and any other modals
    if (spaces?.length > 0) {
      setUsernameAvailable(
        spaces?.every((space: Space) => space.slug !== usernameToCheck)
      )
    } else {
      setUsernameAvailable(true)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      isUsernameAvailable(username)
    }, 1000)

    return () => clearInterval(interval)
  }, [username])

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout
    return function (this: any, ...args: any[]) {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(this, args), delay)
    }
  }

  const debouncedCheckUsername = debounce(isUsernameAvailable, 100)

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedChars = /^[a-z0-9._-]*$/
    let inputValue = e.target.value
    if (!allowedChars.test(inputValue)) {
      inputValue = inputValue.replace(/[^a-z0-9._-]/g, '')
    }
    setUsername(inputValue)
    debouncedCheckUsername(inputValue)
  }

  const handleClose = () => {
    setErrorMessage('')
    setSpaceName('')
    setUsername('')
    //setSpaceType("text");
    onClose()
  }

  function isSpaceType(str: string): str is SpaceType {
    return spaceTypes.includes(str as SpaceType)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Create Space
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          <div>
            <Label>Space Name</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className=" border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter space name"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Space Slug</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className=" border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={`wavify.io/${
                  collective ? collective.unique : 'your-collective'
                }/`}
                value={username}
                onChange={usernameHandler}
              />
              {usernameAvailable ? (
                <AnimatedCheckIcon {...iconProps} />
              ) : (
                <AnimatedXIcon {...iconProps} />
              )}
            </div>
          </div>
          <div>
            <Label>Space Type</Label>
            <Select
              disabled={loading}
              onValueChange={(e) => setSpaceType(isSpaceType(e) ? e : 'text')}
              value={spaceType}
              defaultValue={spaceType}
            >
              <SelectTrigger className="border-0 bg-zinc-700 capitalize outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select a channel type" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypes.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Allowed Roles</Label>
            {!spaceOpen ? (
              <>
                <SpaceRoles
                  rolesAndAllowed={rolesAndAllowed}
                  setRolesAndAllowed={setRolesAndAllowed}
                ></SpaceRoles>
                <ButtonLoader
                  onClick={() => {
                    setIsClosing(true)
                    setSpaceOpen(true)
                    setIsClosing(false)
                  }}
                  text="Make Space Public"
                  isLoading={isClosing}
                  variant="zinc"
                ></ButtonLoader>
              </>
            ) : (
              <ButtonLoader
                onClick={() => {
                  setIsClosing(true)
                  setSpaceOpen(false)
                  setIsClosing(false)
                }}
                text="Restrict Roles"
                isLoading={isClosing}
                variant="zinc"
              ></ButtonLoader>
            )}
          </div>
          {spaceType === 'postbox' && (
            <>
              <div className="flex flex-col space-y-2">
                <Label>Can Send Post</Label>
                <SpaceRoles
                  rolesAndAllowed={rolesAndSend}
                  setRolesAndAllowed={setRolesAndSend}
                ></SpaceRoles>
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Can Receive Post</Label>
                <SpaceRoles
                  rolesAndAllowed={rolesAndReceive}
                  setRolesAndAllowed={setRolesAndReceive}
                ></SpaceRoles>
              </div>
            </>
          )}
          {spaceType === 'transient' && (
            <>
              <div className="flex flex-col space-y-2">
                <Label>Can Post Content</Label>
                <SpaceRoles
                  rolesAndAllowed={rolesAndPost}
                  setRolesAndAllowed={setRolesAndPost}
                ></SpaceRoles>
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Can Access Content</Label>
                <SpaceRoles
                  rolesAndAllowed={rolesAndAccess}
                  setRolesAndAllowed={setRolesAndAccess}
                ></SpaceRoles>
              </div>
            </>
          )}
          {spaceType === 'feedback' && (
            <>
              <div className="flex flex-col space-y-2">
                <Label>Can Get Feedback</Label>
                <SpaceRoles
                  rolesAndAllowed={rolesAndGet}
                  setRolesAndAllowed={setRolesAndGet}
                ></SpaceRoles>
              </div>
              <div className="flex flex-col space-y-2">
                <Label>Can Give Feedback</Label>
                <SpaceRoles
                  rolesAndAllowed={rolesAndGive}
                  setRolesAndAllowed={setRolesAndGive}
                ></SpaceRoles>
              </div>
            </>
          )}
        </div>
        <DialogFooter className="flex flex-col px-6 py-4">
          <ButtonLoader
            onClick={submitSpaceDetails}
            isLoading={loading}
            disabled={loading}
            text="Create"
          />
          {!!errorMessage && (
            <p className="mt-2 w-full text-center text-sm text-muted-foreground text-red-500">
              {errorMessage}
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
