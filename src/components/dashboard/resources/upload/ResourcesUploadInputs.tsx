import { Input } from '@/components/ui/input'
import { useUploadContext } from './context/context'
import { Label } from '@/components/ui/label'
import { useUser } from '@/state/user/useUser'
import { Textarea } from '@/components/ui/textarea'
import ResourceUploadCollaborators from './ResourceUploadCollaborators'
import ResourceUploadOptions from './ResourceUploadOptions'
import { ResourcesUploadType } from './ResourcesUploadType'
import ResourcesUploadTags from './ResourcesUploadTags'
import ResourcesUploadImage from './ResourcesUploadImage'
import ResourcesUploadMore from './ResourcesUploadMore'

export default function ResourcesUploadInputs() {
  const user = useUser()
  const { name, setName, description, setDescription } = useUploadContext()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-grow flex-col gap-2">
          <Label className="text-zinc-200">Name</Label>
          <Input
            className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
            placeholder={`${user.username}'s resource`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label className="text-zinc-200">Description</Label>
          <Textarea
            className="max-h-[200px] flex-grow border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A description about your resource..."
          />
          <Label className="text-zinc-200">Type</Label>
          <ResourcesUploadType />
        </div>
        <ResourcesUploadImage />
      </div>
      <Label className="pt-2 text-zinc-200 sm:pt-0">Tags</Label>
      <ResourcesUploadTags />
      <div className="flex gap-4 sm:pt-2">
        <div className="flex flex-grow flex-col gap-2">
          <Label className="text-zinc-200">Collaborators</Label>
          <ResourceUploadCollaborators />
          <Label className="text-zinc-200">Options</Label>
          <ResourceUploadOptions />
        </div>
        <ResourcesUploadMore />
      </div>
    </div>
  )
}
