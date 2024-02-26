'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
import ButtonLoader from '../me/ButtonLoader'
import { useCollective } from '@/state/collective/useCollective'

export const DeleteCollectiveModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  const isModalOpen = isOpen && type === 'deleteCollective'
  const { collective } = useCollective()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (collective && collective.id) {
        await supabase.from('collectives').delete().eq('id', collective.id)
      }

      onClose()
      router.refresh()
      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(String(error.message))
      } else {
        throw new Error('An unknown error occurred.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="w-full px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Delete Collective
          </DialogTitle>
          <DialogDescription className="w-full text-left text-zinc-400">
            Are you sure you want to do this?{' '}
            <span className="font-semibold text-primary">
              {collective?.unique}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <ButtonLoader
              disabled={isLoading}
              onClick={onClick}
              text="Confirm"
              isLoading={isLoading}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
