'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import UploadDropZone from '../util/uploads/UploadDropZone'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AnimatedCheckIcon } from '../icons/check'
import { AnimatedXIcon } from '../icons/x'
import { uploadCollectiveImageToS3 } from './modal-actions/createCollectiveActions'
import { useModal } from '../../../hooks/use-modal-store'
import { createCollective } from './functions/createCollective'
import ButtonLoader from '../utils/ButtonLoader'
import { useCheckUsernameEffect } from './hooks/useCheckUsernameEffect'
import { fileToBase64 } from './functions/fileToBase64'
import { usernameHandler } from './functions/usernameHandler'
import { useUser } from '@/state/user/useUser'

const iconProps = {
  height: '40',
  width: '40',
  //color: "hsl(var(--background-content))",
  color: '#FFFFFF',
}

export const CreateCollectiveModal = () => {
  const user = useUser()
  const [image, setImage] = useState<File[] | File | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const supabase = createClientComponentClient()
  const { isOpen, onClose, type } = useModal()
  const router = useRouter()
  const isModalOpen = isOpen && type === 'createCollective'
  useCheckUsernameEffect(username, setUsernameAvailable, supabase)
  async function submitCollectiveDetails() {
    setLoading(true)
    if (usernameAvailable) {
      if (!!image) {
        const id = uuidv4()
        const base64Image = await fileToBase64(
          !Array.isArray(image) ? image : null
        )
        await uploadCollectiveImageToS3(base64Image ? base64Image : null, id)
        const error = await createCollective(user, id, supabase, username)

        if (error) {
          setErrorMessage('There was an error creating your collective.')
        } else {
          setErrorMessage('')
          setUsername('')
          setImage(undefined)
          onClose()
          router.push(`/collective/${username}`)
        }
      } else {
        setErrorMessage('Please upload a collective image.')
      }
    } else {
      setErrorMessage('Please enter a valid username.')
    }
    setLoading(false)
  }

  const handleClose = () => {
    setErrorMessage('')
    setUsername('')
    setImage(undefined)
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0 ">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold ">
            Create your collective
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Give your collective a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 px-6">
          <UploadDropZone uploadFunction={setImage} color="#FFFFFF" />
          <div className="flex flex-row justify-between gap-x-4">
            <Input
              disabled={loading}
              className=" border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Enter collective unique"
              value={username}
              onChange={(e) => usernameHandler(e, setUsername)}
            />
            {usernameAvailable ? (
              <AnimatedCheckIcon {...iconProps} />
            ) : (
              <AnimatedXIcon {...iconProps} />
            )}
          </div>
        </div>
        <DialogFooter className="flex flex-col px-6 py-4 ">
          <ButtonLoader
            className="w-full"
            onClick={submitCollectiveDetails}
            isLoading={loading}
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
