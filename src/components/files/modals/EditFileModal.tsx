import { useEffect, useState } from 'react'
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
import ButtonLoader from '@/components/utils/ButtonLoader'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const EditFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const [error, setError] = useState<string | null>(null)
  const { file, files, parent } = data
  const [fileName, setFileName] = useState(file ? file.name : '')
  const isModalOpen = isOpen && type === 'editFile'
  const user = useUser()

  useEffect(() => {
    setFileName(file ? file.name : '')
  }, [file])

  const handleClose = () => {
    onClose()
  }

  const onSubmit = async () => {
    setLoading(true)
    if (
      files?.some((file1: FileAndSender) => file1.name === fileName) &&
      file &&
      file.name !== fileName
    ) {
      setError('File already exists')
      setLoading(false)
      return
    }
    setError(null)
    try {
      if (!file) throw new Error('File not found')
      const { error } = await supabase
        .from('files')
        .update({ name: fileName })
        .eq('id', file.id)
      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      handleClose()
      setLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            Edit File
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Edit your file name sand click save to update
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 px-6">
          <Label>File Name</Label>
          <Input
            placeholder="file"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="ring-0 focus-visible:ring-0"
          ></Input>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <DialogFooter className="px-6 py-4 ">
          <ButtonLoader
            disabled={loading}
            onClick={onSubmit}
            isLoading={loading}
            text="Edit"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
