import ResourcesHeroContentItemsMain from './ResourcesHeroContentItemsMain'
import ResourcesHeroContentItemsMap from './ResourcesHeroContentItemsMap'

export default function ResourcesHeroContentItems() {
  return (
    <div className="flex items-end gap-4">
      <ResourcesHeroContentItemsMain />
      <ResourcesHeroContentItemsMap />
    </div>
  )
}
