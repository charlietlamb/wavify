'use client'

import { useState } from 'react'
import ResourcesAllToolbar from './ResourcesAllToolbar'
import { ResourcesContext } from './context/resourcesContext'
import ResourcesAllContent from './ResourcesAllContent'
import { ResourceType } from '../dashboard/resources/upload/data/data'
import { Sorting } from '../dashboard/resources/manage/data/data'

export default function ResourcesAll() {
  const [resources, setResources] = useState<ResourceAndUser[]>([])
  const [type, setType] = useState<ResourceType | null>(null)
  const [sorting, setSorting] = useState<Sorting>('newest')
  const [query, setQuery] = useState<string>('')
  return (
    <ResourcesContext.Provider
      value={{
        resources,
        setResources,
        type,
        setType,
        sorting,
        setSorting,
        query,
        setQuery,
      }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <ResourcesAllToolbar />
        <ResourcesAllContent />
      </div>
    </ResourcesContext.Provider>
  )
}
