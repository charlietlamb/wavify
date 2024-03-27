import ResourcesUploadImage from './ResourcesUploadImage'
import ResourcesUploadMore from './ResourcesUploadMore'

export default function ResourcesUploadLeft() {
  return (
    <div className="flex flex-col gap-y-4">
      <ResourcesUploadImage />
      <ResourcesUploadMore />
    </div>
  )
}
