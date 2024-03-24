import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { ResourceUploadOptions } from '../../upload/data/data'
import { FileUploadData } from '../../upload/files/ResourcesUploadFiles'

export interface ResourceManageContext {
  manage: boolean
  setManage: Dispatch<SetStateAction<boolean>>
  id: string
  setId: Dispatch<SetStateAction<string>>
  resources: Resource[]
  setResources: Dispatch<SetStateAction<Resource[]>>
}

export const ResourceManageContext = createContext<
  ResourceManageContext | undefined
>(undefined)

export function useResourceManageContext() {
  const context = useContext(ResourceManageContext)
  if (!context) {
    throw new Error(
      'useResourceManageContext must be used within a ResourceManageProvider'
    )
  }
  return context
}
