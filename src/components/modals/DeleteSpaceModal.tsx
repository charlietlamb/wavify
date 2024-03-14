'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useModal } from '../../../hooks/use-modal-store'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ButtonLoader from '../utils/ButtonLoader'
import { useCollective } from '@/state/collective/useCollective'
import { deleteSpace } from '../collective/space/functions/deleteSpace'

export const DeleteSpaceModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const supabase = createClientComponentClient<Database>()
  const isModalOpen = isOpen && type === 'deleteSpace'
  const { space } = data
  const { collective, spaces } = useCollective()

  const [isLoading, setIsLoading] = useState(false)
  if (!spaces || !space || !collective) return null
  const onClick = async () => {
    setIsLoading(true)
    deleteSpace(spaces, space, supabase)
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 ">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Delete Space
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Are you sure you want to do this?{' '}
            <span className="font-semibold text-primary">{space?.slug}</span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4 ">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <ButtonLoader
              isLoading={isLoading}
              onClick={onClick}
              text="Confirm"
            ></ButtonLoader>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
