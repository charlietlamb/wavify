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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useModal } from '../../../../hooks/use-modal-store'
import ButtonLoader from '@/components/me/ButtonLoader'

export const DeleteFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const supabase = createClientComponentClient()
  const { file } = data as { file: FileAndSender }
  const isModalOpen = isOpen && type === 'deleteFile'
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      await supabase.from('files').delete().eq('id', file.id)
      onClose()
    } catch (error) {
      throw new Error(String(error))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            Delete File
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Are you sure you want to do this? You cannot undo this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="px-6 py-4">
          <div className="flex w-full items-center justify-between gap-x-4">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
              className="focus-visible:ring-0"
            >
              Cancel
            </Button>
            <ButtonLoader
              disabled={isLoading}
              onClick={onClick}
              isLoading={isLoading}
              text="Confirm"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
