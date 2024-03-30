'use client'

import { useState } from 'react'
import CollectionsCreateAdd from './CollectionsCreateAdd'
import { CollectionsCreateContext } from './context/collectionsCreateContext'
import { useUser } from '@/state/user/useUser'
import CollectionsCreateForm from './CollectionsCreateForm'
import { CollectionsCreateOptions } from './data/collectionsCreateData'

export default function CollectionsCreate() {
  const user = useUser()
  const [name, setName] = useState<string>(`${user.username}'s collection`)
  const [description, setDescription] = useState<string>('')
  const [collaborators, setCollaborators] = useState<User[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPreview, setHasPreview] = useState<boolean>(false)
  const [tagCurrent, setTagCurrent] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [options, setOptions] = useState<CollectionsCreateOptions>({
    friendsOnly: false,
    mustFollow: false,
    allowSave: true,
    allowDownload: true,
  })
  const [items, setItems] = useState<ItemAndUser[]>([])
  const [selected, setSelected] = useState<ItemAndUser[]>([])
  const [isFetchingItems, setIsFetchingItems] = useState<boolean>(false)
  return (
    <CollectionsCreateContext.Provider
      value={{
        name,
        setName,
        description,
        setDescription,
        collaborators,
        setCollaborators,
        error,
        setError,
        imageUrl,
        setImageUrl,
        loading,
        setLoading,
        hasPreview,
        setHasPreview,
        tagCurrent,
        setTagCurrent,
        tags,
        setTags,
        query,
        setQuery,
        image,
        setImage,
        options,
        setOptions,
        items,
        setItems,
        selected,
        setSelected,
        isFetchingItems,
        setIsFetchingItems,
        manage: null,
        setManage: null,
        id: null,
        setId: null,
        collections: null,
        setCollections: null,
      }}
    >
      <div className="flex max-h-full divide-x divide-zinc-700">
        <CollectionsCreateAdd />
        <CollectionsCreateForm />
      </div>
    </CollectionsCreateContext.Provider>
  )
}
