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
import isObject from '@/lib/isObject'
import ButtonLoader from '../utils/ButtonLoader'
import { deleteMessageFiles } from './functions/deleteMessageFiles'

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const supabase = createClientComponentClient()

  const isModalOpen = isOpen && type === 'deleteMessage'
  const { message } = data as { message: MessageData }
  const [isLoading, setIsLoading] = useState(false)
  if (!isObject(message)) return null

  const onClick = async () => {
    try {
      setIsLoading(true)
      await supabase
        .from('messages')
        .update({ deleted: true })
        .eq('id', message.id)
      if (message.files) {
        deleteMessageFiles(supabase, message)
      }
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
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-left text-2xl font-bold">
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Are you sure you want to do this? The message will be permanently
            deleted.
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
              isLoading={isLoading}
              text="Confirm"
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
