'use client'

import CreateResourceOption from './CreateResourceOption'
import ManageResourcesOption from './ManageResourcesOption'
import SearchAllResources from './SearchAllResources'

export default function ResourcesOptions() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-3">
      <CreateResourceOption />
      <ManageResourcesOption />
      <SearchAllResources />
    </div>
  )
}
