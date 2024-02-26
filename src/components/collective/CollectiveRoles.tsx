'use client'

import RoleButtons from './RoleButtons'
import RolesMap from './RolesMap'

export default function CollectiveRoles() {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-2 py-4">
      <div className="flex w-full ">
        <h2 className="px-[4%] text-6xl font-semibold">Manage Roles</h2>
      </div>
      <div className="w-[92%] overflow-y-auto">
        <RolesMap />
        <RoleButtons />
      </div>
    </div>
  )
}
