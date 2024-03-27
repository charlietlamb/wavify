import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { ResourceUploadOptions } from '../data/data'
import { FileUploadData } from '../files/ResourcesUploadFiles'

export interface UploadContext {
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
  tagCurrent: string
  setTagCurrent: Dispatch<SetStateAction<string>>
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
  manage: boolean | null
  setManage: Dispatch<SetStateAction<boolean>> | null
  id: string | null
  setId: Dispatch<SetStateAction<string>> | null
  resources: Resource[] | null
  setResources: Dispatch<SetStateAction<Resource[]>> | null
  type: string
  setType: Dispatch<SetStateAction<string>>
}

export const UploadContext = createContext<UploadContext | undefined>(undefined)

export function useUploadContext() {
  const context = useContext(UploadContext)
  if (!context) {
    throw new Error(
      'useUploadContext must be used within a ResourceUploadProvider'
    )
  }
  return context
}
