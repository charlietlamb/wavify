import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { ResourceUploadOptions } from '../data/data'
import { FileUploadData } from '../files/ResourcesUploadFiles'

export interface ResourceUploadContext {
  name: string
  setName: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  collaborators: User[]
  setCollaborators: Dispatch<SetStateAction<User[]>>
  options: ResourceUploadOptions
  setOptions: Dispatch<SetStateAction<ResourceUploadOptions>>
  error: string
  setError: Dispatch<SetStateAction<string>>
  imageUrl: string
  setImageUrl: Dispatch<SetStateAction<string>>
  files: FileUploadData[]
  setFiles: Dispatch<SetStateAction<FileUploadData[]>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  hasPreview: boolean
  setHasPreview: Dispatch<SetStateAction<boolean>>
}

export const ResourceUploadContext = createContext<
  ResourceUploadContext | undefined
>(undefined)

export function useResourceUploadContext() {
  const context = useContext(ResourceUploadContext)
  if (!context) {
    throw new Error(
      'useResourceUploadContext must be used within a ResourceUploadProvider'
    )
  }
  return context
}
