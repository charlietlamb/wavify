import SeparatorH1 from '@/components/util/SeparatorH1'
import FeaturedResources from './featured/FeaturedResources'
import HottestResources from './hottest/HottestResources'
import ResourcesOptions from './options/ResourcesOptions'

export default function Resources() {
  return (
    <div className="flex w-full flex-col items-center gap-4 overflow-y-auto p-4">
      <SeparatorH1
        text="Resources"
        className="bg-gradient-to-br from-zinc-100 to-zinc-200 bg-clip-text pr-2 text-6xl font-black uppercase italic text-transparent"
      />
      <FeaturedResources />
      <HottestResources />
      <ResourcesOptions />
    </div>
  )
}
