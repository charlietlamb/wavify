import ResourcesHeroContentHeading from './ResourcesHeroContentHeading'
import ResourcesHeroContentItems from './ResourcesHeroContentItems'
import ResourcesHeroContentSearch from './ResourcesHeroContentSearch'

export default function ResourcesHeroContent() {
  return (
    <div className="relative z-10 flex h-full flex-col justify-between p-8">
      <ResourcesHeroContentHeading />
      <ResourcesHeroContentItems />
      <ResourcesHeroContentSearch />
    </div>
  )
}
