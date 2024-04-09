import { Dispatch, SetStateAction } from 'react'
import PackageRole from './PackageRole'
import { useStoreContext } from './context/storeContext'

export default function PackageRoles({
  roleId,
  setRoleId,
}: {
  roleId: string
  setRoleId: Dispatch<SetStateAction<string>>
}) {
  const { roles } = useStoreContext()
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2">
      {roles?.map((role) => (
        <PackageRole
          roleId={roleId}
          setRoleId={setRoleId}
          role={role}
          key={role.id}
        />
      ))}
    </div>
  )
}
