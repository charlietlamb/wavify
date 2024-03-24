'use client'

import { useUser } from '@/state/user/useUser'
import ResourcesUploadLeft from './ResourcesUploadLeft'
import ResourcesUploadRight from './ResourcesUploadRight'
import { ResourceUploadContext } from './context/context'
import { useState } from 'react'
import ResourcesUploadTitle from './ResourcesUploadTitle'
import ResourcesUploadFiles, {
  FileUploadData,
} from './files/ResourcesUploadFiles'
import { ResourceUploadOptions } from './data/data'
import ResourcesUploadSubmit from './ResourcesUploadSubmit'

export default function ResourcesUpload() {
  const user = useUser()
  const [name, setName] = useState<string>(`${user.username}'s resource`)
  const [description, setDescription] = useState<string>('')
  const [collaborators, setCollaborators] = useState<User[]>([])
  const [options, setOptions] = useState<ResourceUploadOptions>({
    friendsOnly: false,
    mustFollow: false,
    allowSave: true,
    allowDownload: true,
  })
  const [imageUrl, setImageUrl] = useState<string>('')
  const [files, setFiles] = useState<FileUploadData[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPreview, setHasPreview] = useState<boolean>(false)
  return (
    <ResourceUploadContext.Provider
      value={{
        name,
        setName,
        description,
        setDescription,
        collaborators,
        setCollaborators,
        options,
        setOptions,
        error,
        setError,
        imageUrl,
        setImageUrl,
        files,
        setFiles,
        loading,
        setLoading,
        hasPreview,
        setHasPreview,
      }}
    >
      <div className="flex h-full w-full flex-col gap-4 overflow-y-auto lg:flex-row lg:overflow-y-hidden">
        <ResourcesUploadFiles />
        <ResourcesUploadLeft />
        <ResourcesUploadRight />
        <ResourcesUploadSubmit className="flex lg:hidden" />
      </div>
    </ResourceUploadContext.Provider>
  )
}
