import ResourcesManageSorting from './ResourcesManageSorting'
import ResourcesManageVisibility from './ResourcesManageVisibility'

export default function ResourcesManageToolbar() {
  return (
    <div className="flex w-full gap-4 rounded-lg transition">
      <ResourcesManageVisibility />
      <ResourcesManageSorting />
    </div>
  )
}
