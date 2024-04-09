import { iconMap, iconMapSidebar } from '../space/data'

export default function StorePackageSpace({ space }: { space: Space }) {
  return (
    <div className="text-md flex gap-1 rounded-md border-2 border-white bg-white/20 p-2 transition duration-200">
      {iconMapSidebar[space?.type as keyof typeof iconMap]}
      <span className="font-semibold">{space.name}</span>
    </div>
  )
}
