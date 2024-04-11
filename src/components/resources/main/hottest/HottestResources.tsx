import HottestResourcesMap from './HottestResourcesMap'

export default function HottestResources() {
  return (
    // <div className="flex w-full flex-col gap-2 rounded-lg border border-amber-950 bg-gradient-to-br from-zinc-950 to-zinc-900 p-2 transition hover:border-amber-700">
    <div className="relative flex w-full flex-col gap-2 bg-gradient-to-br from-zinc-950 to-lime-700 px-4 py-16">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/50 via-transparent via-50% to-black/50" />
      <div className="relative z-10 flex w-full flex-col lg:flex-row lg:items-end">
        <h2 className="inline-flex whitespace-nowrap bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text pr-2 text-3xl font-black uppercase italic text-transparent">
          Hottest Resources
        </h2>
        <p className="text-zinc-400">
          The most downloaded resources on the site right now.
        </p>
      </div>
      <HottestResourcesMap />
    </div>
  )
}
