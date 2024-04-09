import { ActionTooltip } from '@/components/util/ActionTooltip'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

export function hexToRGB(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

export default function SpaceRole({
  roleAndAllowed,
  setRolesAndAllowed,
}: {
  roleAndAllowed: RoleAndAllowed
  setRolesAndAllowed: Dispatch<SetStateAction<RoleAndAllowed[]>>
}) {
  function onClick() {
    setRolesAndAllowed((prev) =>
      prev
        .map((role) =>
          role.id === roleAndAllowed.id
            ? { ...role, allowed: !role.allowed }
            : role
        )
        .sort((a, b) => a.authority - b.authority)
    )
  }

  return (
    <ActionTooltip label={roleAndAllowed.name}>
      <button
        className={cn(
          'text-md cursor-pointer rounded-md p-2 transition duration-200'
        )}
        onClick={onClick}
        style={
          roleAndAllowed.allowed
            ? {
                backgroundColor: hexToRGB(roleAndAllowed.color, 0.25),
                border: `2px solid ${roleAndAllowed.color}`,
              }
            : { border: `2px solid rgba(0, 0, 0, 0)` }
        }
      >
        {roleAndAllowed.emoji}
      </button>
    </ActionTooltip>
  )
}
