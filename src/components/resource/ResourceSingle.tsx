'use client'

import ResourcesSingleDetails from './ResourcesSingleDetails'
import ResourcesSingleImage from './ResourcesSingleImage'
import { ResourceContext } from './context/resourceContext'

export default function ResourceSingle({ resource }: { resource: Resource }) {
  return (
    <ResourceContext.Provider value={{ resource }}>
      <div className="max-h-screen w-full">
        <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto sm:max-h-full sm:flex-row sm:divide-x sm:divide-zinc-700 sm:overflow-hidden">
          <ResourcesSingleImage />
          <ResourcesSingleDetails />
        </div>
      </div>
    </ResourceContext.Provider>
  )
}
