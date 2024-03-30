import { useUser } from '@/state/user/useUser'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import CollectionsCreateImage from './CollectionsCreateImage'
import CollectionsCreateTags from './CollectionsCreateTags'
import CollectionsCreateCollaborators from './CollectionsCreateCollaborators'
import CollectionsCreateOptions from './CollectionsCreateOptions'
import CollectionsCreateMore from './CollectionsCreateMore'
import CollectionsCreateError from './CollectionsCreateError'
import CollectionsCreateSubmit from './CollectionsCreateSubmit'

export default function CollectionsCreateForm() {
  const user = useUser()
  const { name, setName, description, setDescription } =
    useCollectionsCreateContext()

  return (
    <div className="flex max-h-full flex-grow flex-col gap-2 p-4 lg:w-[80%] lg:overflow-y-auto">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-grow flex-col gap-2">
          <Label className="text-zinc-200">Name</Label>
          <Input
            className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
            placeholder={`${user.username}'s collection`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label className="text-zinc-200">Description</Label>
          <Textarea
            className="max-h-[200px] flex-grow border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A description about your collection..."
          />
        </div>
        <CollectionsCreateImage />
      </div>
      <Label className="pt-2 text-zinc-200 sm:pt-0">Tags</Label>
      <CollectionsCreateTags />
      <div className="flex gap-4 sm:pt-2">
        <div className="flex flex-grow flex-col gap-2">
          <Label className="text-zinc-200">Collaborators</Label>
          <CollectionsCreateCollaborators />
          <Label className="text-zinc-200">Options</Label>
          <CollectionsCreateOptions />
        </div>
        <CollectionsCreateMore />
      </div>
      <CollectionsCreateSubmit className="hidden lg:flex" />
      <CollectionsCreateError />
    </div>
  )
}
