import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useResourceUploadContext } from './context/context'
import { Label } from '@/components/ui/label'
import { useUser } from '@/state/user/useUser'
import { Textarea } from '@/components/ui/textarea'
import ResourceUploadCollaborators from './ResourceUploadCollaborators'
import ResourceUploadOptions from './ResourceUploadOptions'

export default function ResourcesUploadInputs() {
  const user = useUser()
  const { name, setName, description, setDescription } =
    useResourceUploadContext()
  return (
    <div className="flex flex-col gap-y-2">
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
        className="max-h-[200px] border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="A description about your resource..."
      />
      <Label className="text-zinc-200">Collaborators</Label>
      <ResourceUploadCollaborators />
      <Label className="text-zinc-200">Options</Label>
      <ResourceUploadOptions />
    </div>
  )
}
