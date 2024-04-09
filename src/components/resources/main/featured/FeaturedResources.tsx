import FeaturedResourcesMap from './FeaturedResourcesMap'

export default function FeaturedResources() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-lime-950 bg-gradient-to-br from-zinc-950 to-zinc-900 p-2 transition hover:border-lime-700">
      <div className="flex w-full flex-col lg:flex-row lg:items-end">
        <h2 className="inline-flex whitespace-nowrap bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text pr-2 text-3xl font-black uppercase italic text-transparent">
          Featured Resources
        </h2>
        <p className="text-zinc-400">Resources selected by our team.</p>
      </div>
      <FeaturedResourcesMap />
    </div>
  )
}
