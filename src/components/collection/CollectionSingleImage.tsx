import Image from 'next/image'
import { useCollectionContext } from './context/collectionContext'

export default function CollectionSingleImage() {
  const { collection } = useCollectionContext()
  return (
    <div className="relative h-[97px] min-h-[97px] w-[97px] min-w-[97px]">
      <Image
        src="https://github.com/shadcn.png"
        alt={`${collection} image`}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="rounded-lg"
      />
    </div>
  )
}
