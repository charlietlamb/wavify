import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import isObject from '@/lib/isObject'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '../../../hooks/use-modal-store'
import UploadDropZone from '../util/uploads/UploadDropZone'
import { uploadFileToS3 } from './modal-actions/uploadFile'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ButtonLoader from '../me/ButtonLoader'
import { useUser } from '@/state/user/useUser'

export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [messageId, setMessageId] = useState(uuidv4())
  const supabase = createClientComponentClient()

  const isModalOpen = isOpen && type === 'messageFile'
  const { chat: chatData, messageFileType } = data
  const user = useUser()
  function addFile(upload: File | File[] | null) {
    if (Array.isArray(upload)) {
      setFiles((prevFiles) => [...prevFiles, ...upload])
    } else {
      if (upload) {
        setFiles((prevFiles) => [...prevFiles, upload])
      }
    }
  }

  const handleClose = () => {
    onClose()
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('FileReader did not return a string.'))
        }
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const onSubmit = async () => {
    if (files.length > 0) {
      setLoading(true)
      try {
        var newMessage: Json = {
          id: messageId,
          author: user ? user.id : 'undefined',
          files: true,
          chat: chatData?.id,
        }

        const { error } = await supabase.from('messages').insert(newMessage)
        for (const file of files) {
          var fileId = uuidv4()
          var ext = file.name.split('.').pop()
          var url = `${isObject(chatData) ? chatData.id : ''}/${fileId}.${
            ext ? ext : ''
          }`
          const base64File = await fileToBase64(file)
          uploadFileToS3(base64File, file.type, url, file.name)

          const fileToAdd = {
            id: fileId,
            user: user.id,
            message: messageId,
            chat: chatData ? chatData.id : null,
            space: chatData ? chatData.space : null,
            name: file.name,
            size: file.size / 1024 / 1024,
            url,
          }
          const { error } = await supabase.from('files').insert(fileToAdd)
          if (error) throw error
        }

        if (error) throw error
        setLoading(false)
        router.refresh()
        handleClose()
      } catch (error) {
        console.error(error)
        setLoading(false)
      } finally {
        setMessageId(uuidv4())
        setFiles([])
      }
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <div className="items-left flex w-full flex-row justify-center">
          <div className="w-[80%]">
            <UploadDropZone
              uploadFunction={addFile}
              maxUpload={500}
              multipleFiles={true}
              displayText={'Upload Files'}
              fileAccept="*"
              color="#FFFFFF"
            />
          </div>
        </div>
        <DialogFooter className="px-6 py-4 ">
          <ButtonLoader
            disabled={loading}
            onClick={onSubmit}
            isLoading={loading}
            text="Sent"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
