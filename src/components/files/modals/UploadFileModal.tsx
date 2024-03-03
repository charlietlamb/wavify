import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/state/user/useUser'
import { useModal } from '../../../../hooks/use-modal-store'
import { uploadFileToS3 } from '@/components/modals/modal-actions/uploadFile'
import UploadDropZone from '@/components/util/uploads/UploadDropZone'
import ButtonLoader from '@/components/me/ButtonLoader'

export const UploadFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const { parent, files: currentFiles, space } = data
  const isModalOpen = isOpen && type === 'upload'
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
        for (const file of files) {
          let fileNum = 1
          let fileName = file.name
          if (
            currentFiles?.some(
              (file1: FileAndSender) => file1.name === file.name
            )
          ) {
            while (
              currentFiles?.some(
                (file1: FileAndSender) => file1.name === file.name
              )
            ) {
              fileName = `${file.name.split('.')[0]}(${fileNum}).${file.name.split('.')[1]}`
              fileNum++
            }
          }
          var fileId = uuidv4()
          var ext = file.name.split('.').pop()
          var url = `${user.id}/${fileId}.${ext ? ext : ''}`
          const base64File = await fileToBase64(file)
          const error = await uploadFileToS3(
            base64File,
            file.type,
            url,
            file.name
          )
          if (error) {
            throw new Error('Error uploading file to S3')
          } else {
            const fileToAdd = {
              id: fileId,
              user: user.id,
              name: fileName,
              size: file.size / 1024 / 1024,
              folder: parent,
              system: true,
              url,
            }
            const { error: fileError } = await supabase
              .from('files')
              .insert(fileToAdd)
            if (fileError) throw fileError
          }
        }

        handleClose()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        setFiles([])
      }
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            Add files
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Upload a file to store on Wavify
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
