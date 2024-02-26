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
import ButtonLoader from '@/components/me/ButtonLoader'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const EditFolderModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const [error, setError] = useState<string | null>(null)
  const { folder, folders, parent } = data
  const [folderName, setFolderName] = useState(folder ? folder.name : '')
  const isModalOpen = isOpen && type === 'editFolder'
  const user = useUser()

  useEffect(() => {
    setFolderName(folder ? folder.name : '')
  }, [folder])

  const handleClose = () => {
    onClose()
  }

  const onSubmit = async () => {
    setLoading(true)
    if (
      folders?.some(
        (folder1: FolderAndSender) => folder1.name === folderName
      ) &&
      folder &&
      folder.name !== folderName
    ) {
      setError('Folder already exists')
      setLoading(false)
      return
    }
    setError(null)
    try {
      if (!folder) throw new Error('Folder not found')
      const { error } = await supabase
        .from('folders')
        .update({ name: folderName })
        .eq('id', folder.id)
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
            Edit Folder
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Edit your folder name sand click save to update
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 px-6">
          <Label>Folder Name</Label>
          <Input
            placeholder="folder"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
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
