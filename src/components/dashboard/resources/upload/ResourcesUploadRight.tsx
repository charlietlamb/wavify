import ResourcesUploadError from './ResourcesUploadError'
import ResourcesUploadInputs from './ResourcesUploadInputs'
import ResourcesUploadSubmit from './ResourcesUploadSubmit'
import ResourcesUploadTitle from './ResourcesUploadTitle'

export default function ResourcesUploadRight() {
  return (
    <div className="flex h-full max-h-full w-full flex-grow flex-col gap-y-4">
      <ResourcesUploadTitle />
      <ResourcesUploadInputs />
      <ResourcesUploadSubmit />
      <ResourcesUploadError />
    </div>
  )
}
