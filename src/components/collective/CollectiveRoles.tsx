'use client'

import { Award } from 'lucide-react'
import RoleButtons from './RoleButtons'
import RolesMap from './RolesMap'

export default function CollectiveRoles() {
  return (
    <div className="flex h-full w-full flex-col items-center divide-y divide-zinc-700">
      <div className="flex w-full items-center gap-1 p-2">
        <Award />
        <h2 className="text-3xl font-semibold">Manage Roles</h2>
      </div>
      <div className=" w-full overflow-y-auto">
        <RolesMap />
        <RoleButtons />
      </div>
    </div>
  )
}
