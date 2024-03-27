import Image from 'next/image'
import { useResourceContext } from './context/resourceContext'
import ResourcesSingleDownload from './ResourcesSingleDownload'

export default function ResourcesSingleImage() {
  const { resource } = useResourceContext()

  return (
    <div className="flex max-h-full flex-col gap-4 sm:w-[30%] lg:w-[25%]">
      <div className="relative aspect-square w-full rounded-lg border border-zinc-700 transition hover:border-zinc-200 sm:flex-shrink-0 ">
        <Image
          src="https://github.com/shadcn.png" //resource.imageUrl
          alt="collective preview image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-xl"
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4 overflow-y-auto rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200">
        <ResourcesSingleDownload />
      </div>
    </div>
  )
}
