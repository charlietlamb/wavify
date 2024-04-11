import { useResourcesMainContext } from '../context/resourcesMainContext'
import { getFileSizeString } from '@/components/files/functions/getFileSizeString'
import { useRouter } from 'next/navigation'
import WavifyCard from '@/components/wavify/WavifyCard'

export default function ResourcesHeroContentItemsMain() {
  const { showcaseResources, showcaseIndex } = useResourcesMainContext()
  const resource = showcaseResources[showcaseIndex]
  const router = useRouter()
  return (
    <WavifyCard
      key={resource.id}
      user={resource.users}
      name={resource.name}
      text={getFileSizeString(resource.size)}
      imageUrl={resource.imageUrl}
      onClick={() => router.push(`/resource/${resource.id}`)}
      preview={resource.previewId}
      ellipsisComponent={<></>}
      className="wavify-card w-96 min-w-96 transition-opacity duration-500 ease-in-out"
    />
  )
}
