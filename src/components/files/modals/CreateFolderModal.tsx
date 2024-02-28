import { useState } from 'react'
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

export const CreateFolderModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const [error, setError] = useState<string | null>(null)
  const [folderName, setFolderName] = useState('')
  const isModalOpen = isOpen && type === 'createFolder'
  const { folders, parent, space } = data
  const user = useUser()

  const handleClose = () => {
    onClose()
  }

  const onSubmit = async () => {
    setLoading(true)
    if (folders?.some((folder) => folder.name === folderName)) {
      setError('Folder already exists')
      setLoading(false)
      return
    }
    setError(null)
    try {
      const folderToUpload = {
        user: user.id,
        name: folderName,
        parent,
      }

      const { error } = await supabase.from('folders').insert(folderToUpload)
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
            Create Folder
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-400">
            Create a folder to store more folders and files.
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
            text="Create"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
