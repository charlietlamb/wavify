'use client'

import { useState } from 'react'
import { StoreContext } from './context/storeContext'
import StoreHeader from './StoreHeader'
import StoreButtons from './StoreButtons'
import StorePackages from './StorePackages'

export default function Store({
  space,
  roles: initRoles,
}: {
  space: Space
  roles: Role[]
}) {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [roles, setRoles] = useState<Role[]>(initRoles)
  return (
    <StoreContext.Provider
      value={{ space, packages, setPackages, roles, setRoles }}
    >
      <div className="flex w-full flex-col divide-y divide-zinc-700">
        <StoreHeader />
        <StoreButtons />
        <StorePackages />
      </div>
    </StoreContext.Provider>
  )
}
