import Image from 'next/image'
import { useResourceManageContext } from './context/context'
import { getFileSizeString } from '@/components/files/functions/getFileSizeString'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export default function ResourcesManageMap() {
  const { resources } = useResourceManageContext()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
      {resources.map((resource: Resource) => (
        <div
          className="flex flex-col rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200"
          key={resource.id}
        >
          <div className="relative rounded-sm border-zinc-700 transition hover:border-zinc-200">
            <Image
              // src={resource.imageUrl}
              src="https://github.com/shadcn.png"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={`Resource image for ${resource.name}`}
            />
          </div>
          <h2 className="text-lg font-bold text-zinc-200">{resource.name}</h2>
          <p className="text-md text-zinc-400">
            {getFileSizeString(resource.size)}
          </p>
          <div className="flex gap-4">
            <Button variant="zinc_outline">
              <Pencil />
            </Button>
            <Button variant="zinc_outline">
              <Pencil />
            </Button>
            <Button variant="zinc_outline">
              <Pencil />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
