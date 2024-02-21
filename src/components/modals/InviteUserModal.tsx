'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '../../../hooks/use-modal-store'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, Copy } from 'lucide-react'
import { useOrigin } from '../../../hooks/use-origin'
import { useState } from 'react'
import { useUser } from '@/state/user/useUser'

export const InviteUserModal = () => {
  const user = useUser()
  const origin = useOrigin()
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'invite'
  const { collective } = data
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const inviteUrl: string = collective
    ? `${origin}/collective/${collective.unique}`
    : ''

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden px-6 py-8 ">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-bold ">
            Invite a friend
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <Label className="text-xs font-bold uppercase text-primary">
            Server invite link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className=" border-0 bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0"
              defaultValue={inviteUrl}
            />
            <Button disabled={loading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
