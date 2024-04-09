import { ActionTooltip } from '@/components/util/ActionTooltip'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'
import { useStoreContext } from './context/storeContext'

export default function PackageRole({
  roleId,
  setRoleId,
  role,
}: {
  roleId: string
  setRoleId: Dispatch<SetStateAction<string>>
  role: Role
}) {
  if (!role) return null
  const isSelected = roleId === role.id
  function hexToRGB(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    } else {
      return `rgb(${r}, ${g}, ${b})`
    }
  }
  return (
    <ActionTooltip label={role.name}>
      <button
        className={cn(
          'text-md cursor-pointer rounded-md p-2 transition duration-200'
        )}
        onClick={() => setRoleId(role.id)}
        style={
          isSelected
            ? {
                backgroundColor: hexToRGB(role.color, 0.25),
                border: `2px solid ${role.color}`,
              }
            : { border: `2px solid rgba(0, 0, 0, 0)` }
        }
      >
        {role.emoji}
      </button>
    </ActionTooltip>
  )
}
