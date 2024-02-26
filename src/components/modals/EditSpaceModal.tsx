'use client'

import { useEffect, useState } from 'react'
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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useModal } from '../../../hooks/use-modal-store'
import { AnimatedCheckIcon } from '../icons/check'
import { AnimatedXIcon } from '../icons/x'
import { Label } from '../ui/label'
import isObject from '@/lib/isObject'
import ButtonLoader from '../me/ButtonLoader'
import { spaceTypes } from '../collective/space/data'
import SpaceRoles from '../collective/space/SpaceRoles'
import { updateRolesAndAllowed } from './functions/updateRolesAndAllowed'
import { useCollective } from '@/state/collective/useCollective'

const iconProps = {
  height: '40',
  width: '40',
  color: 'white',
}

export const EditSpaceModal = () => {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [spaceName, setSpaceName] = useState<string>('')
  const [spaceType, setSpaceType] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { isOpen, onClose, type, data } = useModal()
  const { space } = data as {
    space: Space
  }
  const { collective, spaces, roles } = useCollective()

  const [spaceOpen, setSpaceOpen] = useState(space?.open)
  const [isClosing, setIsClosing] = useState(false)

  const [rolesAndAllowed, setRolesAndAllowed] = useState<RoleAndAllowed[]>([])

  useEffect(() => {
    if (space) {
      setSpaceName(space.name)
      setSpaceType(space.type)
      setUsername(space.slug)
      setSpaceOpen(space.open)
      setRolesAndAllowed(
        roles
          .map((role) => ({
            ...role,
            allowed: space?.allowed.includes(role.id),
          }))
          .sort((a, b) => a.authority - b.authority)
      )
    }
  }, [isOpen, roles])

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === '' || usernameToCheck === 'roles') {
      setUsernameAvailable(false)
      return
    }
    if (usernameToCheck === space.slug) {
      setUsernameAvailable(true)
      return
    }
    if (Array.isArray(spaces)) {
      setUsernameAvailable(
        spaces.every((space: Space) => space.slug !== usernameToCheck)
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

  if (!isObject(space) || !isObject(collective)) return null
  const isModalOpen = isOpen && type === 'editSpace'
  async function submitSpaceDetails() {
    setLoading(true)
    if (spaceName !== '') {
      const { data, error } = await supabase
        .from('spaces')
        .update({
          id: space.id,
          name: spaceName,
          type: spaceType,
          slug: username,
          allowed: rolesAndAllowed
            .filter((role) => role.allowed)
            .map((role) => role.id),
          open: spaceOpen,
          order:
            space.type === spaceType
              ? space.order
              : spaces.filter((space) => space.type === spaceType).length,
        })
        .eq('id', isObject(space) && space.id ? space.id : '')
      if (error) {
        setErrorMessage('There was an error editing your space.')
      } else {
        setErrorMessage('')
        setSpaceName('')
        setUsername('')
        onClose()
        //router.refresh();
        //router.push(`/collective/${collective.unique}/${username}`);
      }
    } else {
      setErrorMessage('Please enter a valid spaceName.')
    }
    setLoading(false)
  }

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
    setSpaceType('text')
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0 ">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Edit Space
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          <div>
            <Label>Space Name</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className="border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
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
              onValueChange={(e) => setSpaceType(e)}
              value={spaceType}
            >
              <SelectTrigger className=" border-0 bg-zinc-700 capitalize outline-none ring-offset-0 focus:ring-0 focus:ring-offset-0">
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
          <div className="flex flex-col gap-y-2">
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
                  variant="white"
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
                variant="white"
              ></ButtonLoader>
            )}
          </div>
        </div>
        <DialogFooter className="flex flex-col px-6 py-4">
          <ButtonLoader
            onClick={submitSpaceDetails}
            text="Edit"
            isLoading={loading}
          ></ButtonLoader>
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
