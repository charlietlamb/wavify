'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

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
import { useUser } from '@/state/user/useUser'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Check } from 'lucide-react'

export const LeaveCommentModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const supabase = createClientComponentClient()
  const { folder, space, file, heading, description, setComments } = data as {
    folder?: FolderAndSender
    file?: FileAndSender
    space: Space | undefined
    heading?: string
    description?: string
    setComments?: Dispatch<SetStateAction<CommentAndUser[]>>
  }
  const isModalOpen = isOpen && type === 'leaveComment'
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const user = useUser()
  const onClick = async () => {
    if (!space) return
    setIsLoading(true)
    let toInsert = {
      user: user.id,
      space: space.id,
      message: message,
      folder: null,
      file: null,
    } as CommentType
    if (folder) {
      toInsert = { ...toInsert, folder: folder.id }
    } else if (file) {
      toInsert = { ...toInsert, file: file.id }
    }
    const { error } = await supabase.from('comments').insert(toInsert)
    if (error) throw error
    if (setComments) setComments([{ ...toInsert, users: user }])
    onClose()
    const descMessage = `${file ? file.users.username : folder ? folder.users.username : 'The recipient'} has been notified.`
    toast('Comment added', {
      icon: <Check className="mr-2" />,
      description: descMessage,
    })
    setIsLoading(false)
  }

  useEffect(() => {
    setMessage('')
  }, [isModalOpen])

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            {heading ? heading : 'Leave a comment'}
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            {description
              ? description
              : 'Leave a comment. Let this producer know what you think about their work.'}
          </DialogDescription>
        </DialogHeader>
        <div className="px-4">
          <Textarea
            placeholder="Type your feedback here."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
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
