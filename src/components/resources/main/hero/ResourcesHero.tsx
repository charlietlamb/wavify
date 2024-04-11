import Image from 'next/image'
import ResourcesHeroContent from './ResourcesHeroContent'
import { useResourcesMainContext } from '../context/resourcesMainContext'

export default function ResourcesHero() {
  const { showcaseResources, showcaseIndex } = useResourcesMainContext()
  if (!showcaseResources.length) return null
  const mainShowcaseResource = showcaseResources[showcaseIndex]
  return (
    <div className="relative flex min-h-[75vh] w-full flex-col">
      <div className="wavify-card absolute inset-0">
        <Image
          alt={`Wavify resources image`}
          src={mainShowcaseResource.showcaseImageUrl}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-black/50 via-black via-90% to-black"></div>
      <ResourcesHeroContent />
    </div>
  )
}
