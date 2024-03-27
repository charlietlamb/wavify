'use client'

import ResourcesSingleDetails from './ResourcesSingleDetails'
import ResourcesSingleImage from './ResourcesSingleImage'
import { ResourceContext } from './context/resourceContext'

export default function ResourceSingle({ resource }: { resource: Resource }) {
  return (
    <ResourceContext.Provider value={{ resource }}>
      <div className="max-h-screen w-full p-4">
        <div className="flex h-full w-full flex-col gap-4 overflow-hidden overflow-y-auto p-4 sm:max-h-full sm:flex-row sm:overflow-hidden">
          <ResourcesSingleImage />
          <ResourcesSingleDetails />
        </div>
      </div>
    </ResourceContext.Provider>
  )
}
