import ResourcesUploadImage from './ResourcesUploadImage'
import ResourcesUploadMore from './ResourcesUploadMore'

export default function ResourcesUploadLeft() {
  return (
    <div className="lg:divide flex flex-col gap-4 lg:h-full lg:max-h-full lg:gap-0 lg:divide-y lg:divide-zinc-700">
      <ResourcesUploadImage />
      <ResourcesUploadMore />
    </div>
  )
}
