import ResourcesAllMap from './ResourcesAllMap'
import ResourcesAllSearch from './ResourcesAllSearch'
import ResourcesAllToggle from './ResourcesAllToggle'

export default function ResourcesAllContent() {
  return (
    <div className="flex w-full flex-col divide-y divide-zinc-700 lg:w-[80%]">
      <div className="flex gap-4 p-4">
        <ResourcesAllToggle />
        <ResourcesAllSearch />
      </div>
      <ResourcesAllMap />
    </div>
  )
}
