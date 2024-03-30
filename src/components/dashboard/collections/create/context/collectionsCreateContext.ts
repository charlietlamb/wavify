import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { CollectionsCreateOptions } from '../data/collectionsCreateData'

export interface CollectionsCreateContext {
  name: string
  setName: Dispatch<SetStateAction<string>>
  description: string
  setDescription: Dispatch<SetStateAction<string>>
  collaborators: User[]
  setCollaborators: Dispatch<SetStateAction<User[]>>
  error: string
  setError: Dispatch<SetStateAction<string>>
  imageUrl: string
  setImageUrl: Dispatch<SetStateAction<string>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  hasPreview: boolean
  setHasPreview: Dispatch<SetStateAction<boolean>>
  tagCurrent: string
  setTagCurrent: Dispatch<SetStateAction<string>>
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  image: File | null
  setImage: Dispatch<SetStateAction<File | null>>
  options: CollectionsCreateOptions
  setOptions: Dispatch<SetStateAction<CollectionsCreateOptions>>
  items: ItemAndUser[]
  setItems: Dispatch<SetStateAction<ItemAndUser[]>>
  selected: ItemAndUser[]
  setSelected: Dispatch<SetStateAction<ItemAndUser[]>>
  manage: boolean | null
  setManage: Dispatch<SetStateAction<boolean>> | null
  id: string | null
  setId: Dispatch<SetStateAction<string>> | null
  collections: Collection[] | null
  setCollections: Dispatch<SetStateAction<Collection[]>> | null
  isFetchingItems: boolean
  setIsFetchingItems: Dispatch<SetStateAction<boolean>>
}

export const CollectionsCreateContext = createContext<
  CollectionsCreateContext | undefined
>(undefined)

export function useCollectionsCreateContext() {
  const context = useContext(CollectionsCreateContext)
  if (!context) {
    throw new Error(
      'useCollectionsCreateContext must be used within a CollectionsCreateProvider'
    )
  }
  return context
}
